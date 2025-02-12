import { useEffect, useState } from "react";

const Terminal = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFresneil, setIsFresneil] = useState<boolean>(false);
  const [isFresneilWithOptions, setIsFresneilWithOptions] =
    useState<boolean>(false);
  const [outputHistory, setOutputHistory] = useState<
    Array<{ command: string; output: string }>
  >([]);

  const [globalOutputHistory, setGlobalOutputHistory] = useState<string[]>([]);

  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [f1, setF1] = useState<string>();
  const [f2, setF2] = useState<string>();

  const [L0, setLO] = useState<string>();
  const [R0, setR0] = useState<string>();

  const [R1, setR1] = useState<string>("");
  const [R2, setR2] = useState<string>("");

  const [L1, setL1] = useState<string>("");
  const [L2, setL2] = useState<string>("");

  const [f_1_RO, setf_1_R0] = useState<string>("");
  const [f_2_R1, setf_2_R1] = useState<string>("");

  const [NOR_R1, setNOR_R1] = useState<string>("");

  const [image, setImage] = useState<string>("");

  const validateInput = (command: string) => {
    return /^(fresneil)\s+-f1\s+[01]{4}\s+-f2\s+[01]{4}\s+-L0\s+[01]{4}\s+-R0\s+[01]{4}\s*$/.test(
      command
    );
  };

  const validateBase64Input = (command: string) => {
    return /^base64 -[ed] "([^"]*)"$/.test(command);
  };

  const calculXOR = (a: string, b: string) => {
    let result: string = "";
    const arr1 = a.split("");
    const arr2 = b.split("");
    for (let i = 0; i < 4; i++) {
      if (arr1[i] === arr2[i]) {
        result += "0";
      } else {
        result += "1";
      }
    }

    console.log("result", result);
    return result;
  };

  const encodeOrDecodeBase64 = (command: string) => {
    const cleanedCommand = command.trim().replace(/\s+/g, " ");
    const arr = cleanedCommand.split(" ");
    /*  console.log("option", option);
    console.log("text", text); */
    let output = "ok";
    if (arr[1] === "-e") {
      console.log(
        "to encode",
        cleanedCommand.split("-e ")[1].replace(/["]/g, "")
      );
      const encodedText = btoa(
        cleanedCommand.split("-e ")[1].replace(/["]/g, "")
      );
      output = `Encoded text: ${encodedText}`;
    } else if (arr[1] === "-d") {
      //remplacer les guillemets
      //console.log("text", text.replace(/["]/g, ""));
      console.log("to decode", cleanedCommand.split("-d ")[1]);
      const decodedText = atob(
        cleanedCommand.split("-d ")[1].replace(/["]/g, "")
      );
      output = `Decoded text: ${decodedText}`;
    }
    // setOutputHistory((prevHistory) => [...prevHistory, { command, output }]);
    console.log("output", output);
    return output;
  };

  const calculR1AndR2 = (f1: string, f2: string, L0: string, R0: string) => {
    const localL1 = R0;
    const local_f_1_R0 = calculXOR(R0, f1);
    const localR1 = calculXOR(L0, local_f_1_R0);
    const localL2 = localR1;
    const local_NOR_R1 = localR1.split("").map((bit: string) => {
      return bit === "1" ? "0" : "1";
    });
    const local_f_2_R1 = calculXOR(f2, local_NOR_R1.join(""));
    const localR2 = calculXOR(localL1, local_f_2_R1);

    const localImage = localL2 + localR2;

    console.log("image", localImage);

    setF1(f1);
    setF2(f2);
    setLO(L0);
    setR0(R0);
    setL1(localL1);
    setR1(localR1);
    setf_1_R0(local_f_1_R0);
    setNOR_R1(local_NOR_R1.join(""));
    setf_2_R1(local_f_2_R1);
    setL2(localL2);
    setR2(localR2);
    setImage(localImage);
  };

  const handleCommand = (command: string) => {
    let output = "";
    const cleanedCommand = command.trim().replace(/\s+/g, " ");

    switch (cleanedCommand) {
      case "help":
        output = `Available commands: 
        \nhelp: to dispaly available commands,
        \nclear: to clear the output
        \nhistory: to display commands history
        \nfresneil: to display informations about fresneil program 
        \nbase64: to display informations about base64 program`;
        setIsFresneil(false);
        setIsFresneilWithOptions(false);
        setShowHistory(false);
        setOutputHistory([{ command, output }]);
        break;
      case "history":
        setIsFresneil(false);
        setIsFresneilWithOptions(false);
        setOutputHistory([]);
        setShowHistory(true);
        break;
      case "fresneil":
        setOutputHistory([]);
        setIsFresneil(true);
        setIsFresneilWithOptions(false);
        setShowHistory(false);
        setOutputHistory([{ command, output }]);
        break;
      case "base64":
        setOutputHistory([]);
        setIsFresneil(false);
        setIsFresneilWithOptions(false);
        setShowHistory(false);
        output = `Ce programme prend une chaine de caractères en entrée et retourne une version encodée ou décodée en base64
          \nExemple: 
          \nEncoder une chaine: base64 -e "hello world"
          \nDécoder une chaine encodée: base64 -d "aGVsbG8gd29ybGQ="
          \nNB: Rassurer vous de mettre la chaine à encoder ou à décoder entre double quotes`;
        setOutputHistory([{ command, output }]);
        break;
      case "clear":
        setOutputHistory([]);
        setIsFresneil(false);
        setIsFresneilWithOptions(false);
        setShowHistory(false);
        return;
      default:
        setIsFresneil(false);
        if (cleanedCommand.startsWith("fresneil")) {
          console.log("command", cleanedCommand);
          console.log("state", validateInput(cleanedCommand));
          if (!validateInput(cleanedCommand)) {
            setIsFresneilWithOptions(false);
            setShowHistory(false);
            output = "Error: Command incorrect";
            setOutputHistory([{ command, output }]);
          } else {
            setOutputHistory([]);
            setShowHistory(false);
            setIsFresneilWithOptions(true);
            const arr = cleanedCommand.split(" ");
            console.log("arr", arr);
            calculR1AndR2(arr[2], arr[4], arr[6], arr[8]);
          }
        } else if (cleanedCommand.startsWith("base64")) {
          console.log("command", cleanedCommand);
          if (!validateBase64Input(cleanedCommand)) {
            output = "Error: Command incorrect";
            setIsFresneilWithOptions(false);
            setShowHistory(false);
            setOutputHistory([{ command, output }]);
          } else {
            console.log("state", validateBase64Input(cleanedCommand));
            setOutputHistory([]);
            setIsFresneilWithOptions(false);
            setShowHistory(false);
            const output = encodeOrDecodeBase64(cleanedCommand);
            setOutputHistory([{ command, output }]);
            //console.log("arr", arr);
          }
        } else {
          setIsFresneilWithOptions(false);
          setShowHistory(false);
          output = `Error: Command not found: ${command}`;
          setOutputHistory([{ command, output }]);
        }
    }
    console.log("output", command, output);
    setGlobalOutputHistory((prev) => [...prev, command]);
  };

  useEffect(() => {
    // État pour suivre la position dans l'historique
    let currentIndex = globalOutputHistory.length;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (globalOutputHistory.length === 0) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        currentIndex = Math.max(currentIndex - 1, 0);
        setInputValue(globalOutputHistory[currentIndex]);
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        currentIndex = Math.min(currentIndex + 1, globalOutputHistory.length);
        setInputValue(globalOutputHistory[currentIndex] || "");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [globalOutputHistory]);

  return (
    <div className="mx-2 relative lg:w-[70rem] h-[32rem] border-4 border-gray-900 bg-gray-800 flex flex-col">
      <div className="w-full bg-gray-900 text-white font-bold p-2">Shell</div>

      <div className="flex-1 overflow-y-auto p-2 text-green-400 font-mono">
        {isFresneil ? (
          <div className="flex flex-col gap-y-2">
            <span className="text-white">#&gt;~ Fresneil</span>
            <span>Fresneil</span>
            <span>
              Ce programme est un diagramme de fresneil à deux rondes sur des
              chaines de 08 bits avec deux fonctions:
            </span>
            <span>
              F1: F1(a) = a⊕f1, f1 chaine binaires associées à F1 (sur 04 bits)
            </span>
            <span>
              F1: F2(a) = NON(a)⊕f2, f2 chaine binaires associées à F2 (sur 04
              bits)
            </span>
            <span>NB: a est une chaine de 04 bits</span>
            <div className="mt-1 flex flex-col gapy-3">
              <span>Exemple:</span>
              <span>fresneil -f1 1011 -f2 1001 -L0 1111 -R0 1011</span>
            </div>
          </div>
        ) : isFresneilWithOptions ? (
          <div className="flex flex-col gap-y-2">
            <span className="text-white">
              #&gt;~ fresneil -f1 {f1} -f2 {f2} -L0 {L0} -R0 {R0}
            </span>

            <span> **** completed ****</span>
            <div className="font-bold">
              Résultat = <span className="text-blue-500">{image}</span>
            </div>
            <div className="flex gap-x-2">
              <span className="font-bold">
                L2: R1 = <span className="text-blue-500">{L2}</span>
              </span>
              ,
              <span className="font-bold">
                R2: L1⊕F2(R1) = <span className="text-blue-500">{R2}</span>
              </span>
            </div>
            <div className="flex gap-x-3">
              Vos Entrées
              <div className="flex gap-x-2">
                <span>
                  L0 = <span>{L0}</span>
                </span>
                ,
                <span>
                  R0 = <span>{R0}</span>
                </span>{" "}
                //
                <span>
                  f1 = <span>{f1}</span>
                </span>
                ,
                <span>
                  f2 = <span>{f2}</span>
                </span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <span>
                L1: R0 = <span>{L1}</span>
              </span>
              ,
              <span>
                R1: {L0}⊕F1(R0) = <span>{R1}</span>
              </span>
            </div>
            <span>
              NOR(R1): <span>{NOR_R1}</span>
            </span>
            <span>
              F1(R0): {R0}⊕{f1} = <span>{f_1_RO}</span>
            </span>
            <span>
              F2(R1): {NOR_R1}⊕{f2} = <span>{f_2_R1}</span>
            </span>
          </div>
        ) : (
          <>
            {outputHistory.map((entry, index) => (
              <div key={index}>
                <span className="text-white">#&gt;~ {entry.command}</span>
                <div className="mt-1 mb-2 whitespace-pre-line">
                  {entry.output}
                </div>
              </div>
            ))}
          </>
        )}

        {showHistory && (
          <div className="flex flex-col gap-y-2">
            {globalOutputHistory.map((entry, index) => (
              <div key={index}>
                <span className="text-white">#&gt;~ {entry}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <span className="text-blue-500">Enter "help" for more informations</span>
      <div className="p-2 border-t border-gray-700 flex items-center">
        <span className="text-blue-800 mr-2">#&gt;~</span>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCommand(inputValue);
              setInputValue("");
            }
          }}
          className="flex-1 bg-transparent text-green-600 outline-none resize-none py-2"
          rows={1}
          placeholder="Type command..."
        />
      </div>
    </div>
  );
};

export default Terminal;
