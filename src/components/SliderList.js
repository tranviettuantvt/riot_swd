import React, { useRef } from "react";
import SliderItem from "./SliderItem";
import Slider from "react-slick";

function SliderList() {
  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };
  
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true
  };

  return (
    <div className="container my-5">
      <div className="itemList-title text-center mb-4">
        <h4 className="text-success mb-1">Customer's Reviews</h4>
        <h2 style={{color: "#022559"}}>What They Say</h2>
      </div>
      <Slider  ref={ref} {...settings}>
        <SliderItem />
        <SliderItem />
        <SliderItem />
        <SliderItem />
        <SliderItem />
      </Slider>
    </div>
  );
}

export default SliderList;
