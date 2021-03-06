import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
