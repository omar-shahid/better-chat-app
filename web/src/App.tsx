import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./contexts/user";
import DashboardPage from "./pages/Dashboard";
import FindFriendsPage from "./pages/FindFriends";
import FriendsPage from "./pages/Friends";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import RequestsPage from "./pages/Requests";
import { PublicRoute } from "./routes/PublicRoute";
import { UserRoute } from "./routes/UserRoute";
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
            <UserRoute path="/requests" element={<RequestsPage />} />
            <UserRoute path="/friends" element={<FriendsPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;
