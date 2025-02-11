
import Header from "./components/header";
import Navbar from "./components/footer";
import Terminal from "./components/Terminal";

function App() {
  return (
    <div className="bg-black h-screen flex flex-col w-full items-center">
    <Header />
    <main className="w-full h-full text-lg mt-20 flex flex-col items-center justify-center">
      <Terminal />  
    </main>
    <div className="fixed bottom-2 lg:bottom-20">
      <Navbar />
    </div>
  </div>
  );
}

export default App;
