import React, { useEffect, useState } from "react";
import { removeFromFavorite } from "../api/FavouriteService";
import { getRecipeById } from "../api/RecipeService";

function RealFavo({ ingredient_id , setTrigger, trigger, id}) {
  const [favor, setFavor] = useState();

  const getaaa = (id) => {
    getRecipeById(id)
      .then((res) => setFavor(res.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (ingredient_id) getaaa(ingredient_id);
  }, [ingredient_id]);

  const handleDelete = (sid) => {
    removeFromFavorite(sid)
      .then((res) => setTrigger(!trigger))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div class="card-favor d-flex">
        <img src={favor?.image} class="card-img-top" alt="Pho"></img>
        <div class="card-body-favor">
          <h5 class="card-title-favor">{favor?.title}</h5>
          <p class="card-text-favor">{favor?.material}</p>
          <button onClick={() => handleDelete(id)}>
            {" "}
            Bỏ thích{" "}
          </button>
        </div>
      </div>
      ;
    </div>
  );
}

export default RealFavo;
