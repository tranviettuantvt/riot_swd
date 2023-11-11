import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import PopupChat from "../components/PopupChat";
import Tdee from "../components/Tdee";
import { CardImg } from "react-bootstrap";
import { getFavoriteByUid } from "../api/FavouriteService";
import { AuthContext } from "../context/AuthContext";
import { getRecipeById } from "../api/RecipeService";
import RealFavo from "./RealFavo";
import { Link } from "react-router-dom";

// import NavbarHeader from '../components/NavbarHeader';
function FavouriteRecipe() {
  const { currentUser } = useContext(AuthContext);
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [realFavorite, setRealFavorite] = useState([]);
  const [trigger, setTrigger]=useState(false)
  
  const getRecipeByUserId = (id) => {
    getFavoriteByUid(id)
      .then((res) => setFavoriteRecipe(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (currentUser.uid) {
      getRecipeByUserId(currentUser.uid);
    }
  }, [currentUser, trigger]);

  return (
    <div>
      <div className="container">
        <Link to="/">
        <button>HOme</button>
        </Link>
        <div className="itemList-title text-center mb-6">
          <h1 style={{ color: "#022559" }}>Favorite Recipes</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="container">
              {favoriteRecipe &&
                favoriteRecipe.map((real) => 
                 <RealFavo trigger={trigger} setTrigger={setTrigger} {...real}/>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FavouriteRecipe;
