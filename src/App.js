import { Route, Routes } from "react-router-dom";
import "./App.css";
import Bai1 from "./components/bai1";
import Bai2 from "./components/bai2";
import Bai3 from "./components/bai3";
import Bai4 from "./components/bai4";
import Bai5 from "./components/bai5";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Header />}>
          <Route path="*" element={<Bai1 />} />
          <Route path="bai1" element={<Bai1 />} />
          <Route path="bai2" element={<Bai2 />} />
          <Route path="bai3" element={<Bai3 />} />
          <Route path="bai4" element={<Bai4 />} />
          <Route path="bai5" element={<Bai5 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
