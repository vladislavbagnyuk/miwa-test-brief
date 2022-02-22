import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Vehicles from "./routes/Vehicles";
import Characters from "./routes/Characters";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/vehicles" element={<Vehicles />}></Route>
          <Route path="/characters" element={<Characters />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
