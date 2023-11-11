import React, { useContext, useState } from "react";
import NavbarHeader from '../components/NavbarHeader'

import CarouselBanner from '../components/CarouselBanner'
import CardItemList from '../components/CardItemList'
import CardtemDetail from '../components/CardtemDetail'
import Tdee from '../components/Tdee'
import Reason from '../components/Reason'
import SliderList from '../components/SliderList'
import Footer from '../components/Footer'
import PopupChat from '../components/PopupChat'
import { Food } from "../context";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";



function Home() {
  const navigate=useNavigate()
  const {currentUser}=useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [ingredientActive, setIngredientActive] = useState();
  const [searchRecipe, setSearchRecipe] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (ingredient_id) => {
    setShow(true);
    setIngredientActive(ingredient_id);
  };

  const [showPopUp, setshowPopUp] = useState(false);
  const handleOpen = () => {
    if (!currentUser) {
      navigate('/login')
      alert("Login first")
    }
    setshowPopUp(!showPopUp);
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
          showPopUp, setshowPopUp,
          handleOpen,
        
        }}
      >
        <NavbarHeader />
        <div className="banner-list py-3">
          <CarouselBanner />
          <CardItemList />
          <CardtemDetail />
        </div>
        <Tdee />
        <Reason />
        <SliderList />
        <Footer />
        <PopupChat />
      </Food.Provider>
    </div>
  );
}

export default Home;
