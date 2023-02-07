import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/ui/Header";
import Home from "./pages/home/Home";
import Cursos from "./pages/cursos/Cursos";
import Alunos from "./pages/alunos/Alunos";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/alunos" element={<Alunos />} />
      </Routes>
    </Router>
  );
}
