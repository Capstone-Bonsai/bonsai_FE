import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Bonsai1 from "../../assets/bonsai1.jpg";
import Bonsai2 from "../../assets/bonsai2.jpg";
import Bonsai3 from "../../assets/bonsai3.jpg";

const bonsaiImages = [Bonsai1, Bonsai2, Bonsai3];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-[70%] m-auto flex justify-end">
      <Slider {...settings} className="w-[700px] h-[500px]">
        {bonsaiImages.map((image, index) => (
          <div key={index} className="w-full h-full ">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ objectFit: "contain", width: 700, height: 500}}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
