import { useState } from "react";

const Terminal = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFresneil, setIsFresneil] = useState(false);
  const [outputHistory, setOutputHistory] = useState<
    Array<{ command: string; output: string }>
  >([]);

  const handleCommand = (command: string) => {
    let output = "";
    switch (command.trim().replace(/\s+/g, " ")) {
      case "help":
        output = `Available commands: 
        \nhelp: to dispaly available commands, 
        \nclear: to clear the output,
        \nfresneil: to display informations about fresneil program `;
        setIsFresneil(false);
        break;
      case "fresneil":
        setOutputHistory([]);
        setIsFresneil(true);
        break;
      case "clear":
        setOutputHistory([]);
        setIsFresneil(false);
        return;
      default:
        setIsFresneil(false);
        if (command.trim().startsWith("fresneil")) {
          console.log("command", command);
          output = "Good";
        } else {
          output = `Error: Command not found: ${command}`;
        }
    }

    if (command.trim() !== "fresneil") {
      setOutputHistory((prev) => [...prev, { command, output }]);
    }
  };

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
              F1: F2(a) = NON(a)⊕f2, f2 chaine binaires associées à F2 (sur 04 bits)
            </span>
            <span>NB: a est une chaine de 04 bits</span>
            <div className="mt-1 flex flex-col gapy-3">
                <span>Exemple:</span>
                <span>fresneil -f1 1011 -f2 1001 -L0 1111 -R0 1011</span>
            </div>
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
