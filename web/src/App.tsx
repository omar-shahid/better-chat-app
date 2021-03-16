import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
const App: React.FC = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
