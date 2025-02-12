import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Fresneil from "./pages/fresneil/Fresneil";
import RSA from "./pages/rsa/RSA";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index path="/Cryptography/" element={<Fresneil />} />
        <Route index path="/Cryptography/rsa" element={<RSA />} />
      </Route>
    </Routes>
  );
}

export default App;
