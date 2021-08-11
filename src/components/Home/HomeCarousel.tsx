import { Col } from "antd"
import car1 from "../../img/carousel/mlb1.jpeg"
import car3 from "../../img/carousel/mlb3.jpeg"
import car4 from "../../img/carousel/mlb4.jpeg"
import car5 from "../../img/carousel/mlb5.jpeg"
import car6 from "../../img/carousel/mlb6.jpeg"
import car7 from "../../img/carousel/mlb7.jpeg"
import car8 from "../../img/carousel/mlb8.jpeg"
export const HomeCarousel = () => {
    return (
        <div className="carousel" style={{ display: "flex" }}>
            <img className="carousel-image" src={car1} alt="car1" />
            <img className="carousel-image" src={car3} alt="car3" />
            <img className="carousel-image" src={car4} alt="car4" />
            <img className="carousel-image" src={car5} alt="car5" />
            <img className="carousel-image" src={car6} alt="car6" />
            <img className="carousel-image" src={car7} alt="car7" />
            <img className="carousel-image" src={car8} alt="car8" />
        </div>
    );
};
