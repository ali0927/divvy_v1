import { Col } from "antd"
import car1 from "../../img/carousel/Austria-vs-North-Macedonia.jpeg"
import car2 from "../../img/carousel/Belgium-vs-Russia.jpeg"
import car3 from "../../img/carousel/Denmark-vs-Finland.jpeg"
import car4 from "../../img/carousel/England-vs-Croatia.jpeg"
import car5 from "../../img/carousel/Netherlands-vs-Ukraine.jpeg"
import car6 from "../../img/carousel/Scotland-vs-Czech-Republic.jpeg"
import car7 from "../../img/carousel/Turkey-vs-Italy.jpeg"
import car8 from "../../img/carousel/Wales-vs-Switzerland.jpeg"
export const HomeCarousel = () => {
    return (
        <div className="carousel" style={{ display: "flex" }}>
            <img className="carousel-image" src={car1} alt="car1" />
            <img className="carousel-image" src={car2} alt="car2" />
            <img className="carousel-image" src={car3} alt="car3" />
            <img className="carousel-image" src={car4} alt="car4" />
            <img className="carousel-image" src={car5} alt="car5" />
            <img className="carousel-image" src={car6} alt="car6" />
            <img className="carousel-image" src={car7} alt="car7" />
            <img className="carousel-image" src={car8} alt="car8" />
        </div>
    );
};
