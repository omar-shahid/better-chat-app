import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import FindFriendsPage from "./pages/FindFriends";
import { UserRoute } from "./routes/UserRoute";
import { PublicRoute } from "./routes/PublicRoute";
import ProfilePage from "./pages/Profile";
import UserContextProvider from "./contexts/user";
const App: React.FC = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <PublicRoute path="/register" element={<RegisterPage />} />
            <PublicRoute path="/login" element={<LoginPage />} />
            <UserRoute path="/dashboard" element={<DashboardPage />} />
            <UserRoute path="/friends/find" element={<FindFriendsPage />} />
            <UserRoute path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;
