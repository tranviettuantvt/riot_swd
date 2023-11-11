import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function CarouselBanner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container  style={{marginTop: "4rem"}}>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      
        <Carousel.Item>
          <img
            className="d-block banner w-100"
            src="./img/banner1.jpg"
            alt="First slide"
          />
          <div className="carousel-caption-ban">
            <h3>Sức khỏe & Đời sống</h3>
            <p>Muốn ăn thì lăn vào bếp !!! Hãy tự nấu cho gia đình những món ăn tuyệt vời nhất. Đảm bảo sức khỏe và dinh dưỡng</p>
            <button type="button" className="btn btn-success">Scroll below</button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block banner w-100"
            src="./img/bannerfitness.jpg"
            alt="Second slide"
          />
          <div className="carousel-caption-ban">
            <h3>Thể dục & Thể hình</h3>
            <p>Luyện tập có thể mang lại một thân hình đẹp và sự tự tin giúp thành công trong công việc, cuộc sống</p>
            <button type="button" className="btn btn-success">Scroll below</button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block banner w-100"
            src="./img/banner2.png"
            alt="Third slide"
          />
          <div className="carousel-caption-ban">
            <h3>Chuyên gia ẩm thực</h3>
            <p>Nơi nhũng chia sẻ, kinh nghiệm của những đầu bếp hàng đầu. Những lời khuyên hữu ích sẽ giúp bao tử của gia đình các bạn hài lòng</p>
            <button type="button" className="btn btn-success">Scroll below</button>
          </div>
        </Carousel.Item>
    </Carousel>
    </Container>

  );
}

export default CarouselBanner;