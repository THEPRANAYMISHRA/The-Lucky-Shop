import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./corousels.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const sliderImageUrl = [
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117025/200/200/153337856-117025714-1678773680.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117329/200/200/153427775-117329417-1691750490.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117058/200/200/153346440-117058191-1680251838.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117307/200/200/153419141-117307961-1690962092.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117212/200/200/153394779-117212707-1687161422.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117332/200/200/153428696-117332344-1692261395.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117339/200/200/153430700-117339685-1692894907.jpg",
  },
  //First image url
  {
    url: "https://cdn.shopclues.com/images1/thumbnails/117343/200/200/153431939-117343990-1693305050.jpg",
  },
];
const Slider = () => {
  return (
    <div className="parent">
      <h2 className="text-center">Best Selling</h2>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <div className="imageContainer">
                <img src={imageUrl.url} alt="movie" />
              </div>
              <p className="text-center p-2">Get 20% off</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Slider;
