import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel className="my-2 my-carousel">
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100 slider-img"
          src="/images/slid1.png"
          alt="Slide 1"
        />
        <Carousel.Caption>
          <h3 className="fw-bold">Exclusive Offers</h3>
          <p className="fw-bold">Get up to 50% off on selected items!</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100 slider-img"
          src="/images/slid2.png"
          alt="Slide 2"
        />
        <Carousel.Caption>
          <h3 className="fw-bold">New Arrivals</h3>
          <p className="fw-bold">Explore our latest collection of products.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100 slider-img"
          src="/images/slid3.png"
          alt="Slide 3"
        />
        <Carousel.Caption>
          <h3 className="fw-bold">Best Sellers</h3>
          <p className="fw-bold">Check out our most popular products this month.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
