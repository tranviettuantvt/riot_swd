import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../api/RecipeService";
import { Food } from "../context";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import CardItem from "./CardItem";

function CardItemList() {
  const { searchRecipe } = useContext(Food);
  const [recipes, setRecipes] = useState([]);
  const { userAuthorization } = useContext(AuthContext);

  const retrieveRecipe = () => {
    getAllRecipes()
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveRecipe();
  }, []);

  // get currentuser athorization

  return (
    <div className="container my-5">
      <div className="itemList-title text-center mb-5">
        {parseInt(userAuthorization) > 1 ? (
          <Link to="/admin">
            <button className="manageItem">Admin Page Manage</button>
          </Link>
        ):<div style={{width:"148px"}}></div>}

        <div className="">
          <h4 className="text-success mb-1">Our Dishes</h4>
          <h2 style={{ color: "#022559" }}>Popular Dishes</h2>
        </div>

        {parseInt(userAuthorization) > 0 ? (
          <Link to="/manage">
            <button className="manageItem">Manage Your Recipes</button>
          </Link>
        ):<div style={{width:"140px"}}></div>}
      </div>
      <div className="row gy-4">
        {recipes &&
          recipes
            .filter((recipe) => {
              return recipe.title.toLowerCase().match(searchRecipe) || recipe.origin.toLowerCase().match(searchRecipe);
            })
            .map((recipe, index) => <CardItem key={index} {...recipe} />)}
      </div>
    </div>
  );
}

export default CardItemList;
