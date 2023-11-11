import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HealthyAndDiet from "./pages/HealthyAndDiet";
import Fitness from "./pages/Fitness";
import Forum from "./pages/Forum";
import ManageRecipe from "./pages/ManageRecipe";
import Admin from "./pages/Admin";
import AllAdRecipe from "./pages/AllAdRecipe";
import AllUser from "./pages/AllUser";
import ProfileUser from "./pages/ProfileUser";
import FavouriteRecipe from "./pages/FavouriteRecipe";

function App() {
  const { currentUser, userAuthorization } = useContext(AuthContext);
  // check if auth login
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const ProtectedManage = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const ProtectedAdmin = ({ children }) => {
    console.log(currentUser, userAuthorization);
    if (!currentUser || parseInt(userAuthorization) !== 2) {
      console.log("login");
      return <Navigate to="/login" />;
    }
    console.log(parseInt(userAuthorization));
    return children;
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="favorite" element={<FavouriteRecipe/>}/>
          <Route path="profileUser" element={<ProfileUser/>}/>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="HealthyAndDiet" element={<HealthyAndDiet />} />
          <Route path="forum" element={<Forum />} />
          <Route path="fitness" element={<Fitness />} />
          <Route
            path="manage"
            element={
              <ProtectedManage>
                <ManageRecipe />
              </ProtectedManage>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          >
            <Route index element={<AllAdRecipe/>}/>
            <Route path="allRecipe" element={<AllAdRecipe/>}/>
            <Route path="allUser" element={<AllUser/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
