import React, { useState } from "react";
import NavbarHeader from "../components/NavbarHeader";

import CarouselBanner from "../components/CarouselBanner";
import CardItemList from "../components/CardItemList";
import CardtemDetail from "../components/CardtemDetail";
import Tdee from "../components/Tdee";
import Reason from "../components/Reason";
import SliderList from "../components/SliderList";
import Footer from "../components/Footer";
import PopupChat from "../components/PopupChat";
import { Food } from "../context";

function HealthyAndDiet() {
  const [show, setShow] = useState(false);
  const [ingredientActive, setIngredientActive] = useState();
  const [searchRecipe, setSearchRecipe] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (ingredient_id) => {
    setShow(true);
    setIngredientActive(ingredient_id);
  };
  return (
    <div>
      <Food.Provider
        value={{
          show,
          setShow,
          handleClose,
          handleShow,
          ingredientActive,
          searchRecipe,
          setSearchRecipe,
        }}
      >
        <NavbarHeader />
        <div className="banner-list py-3">
          <CarouselBanner />
          <CardItemList />
          <CardtemDetail />
        </div>
        {/* <Tdee /> */}
        <Reason />
        <SliderList />
        <Footer />
        {/* <PopupChat /> */}
      </Food.Provider>
    </div>
  );
}

export default HealthyAndDiet;
