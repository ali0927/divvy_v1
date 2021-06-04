import React from 'react';
import { Carousel } from 'antd';
import logo from "../../logo.svg";
export const HomeCarousel = () => {
    const contentStyle = {
        height: 160,
        color: "#fff",
        background: "#364d79",
        width: "40%"
    };
    const CarouselSettings = {
        centerMode: true,
        infinite: true,
        centerPadding: "200px",
        // slidesToShow: 3,
        speed: 500,
        autoplay: true,
        dotsClass: "dots"
        
    };
    const items = [1, 2, 3, 4, 5];
    const CarouselItems = () => {
        let Items = new Array();
        items.map((value, index) => {
            Items.push(
                <div className="carousel-item">

                </div>
            )
        })
        return Items
    }
    return (
        <Carousel className="carousel" {...CarouselSettings}>
            <div className="carousel-item">
                <img className="carousel-image" src={"https://www.girardatlarge.com/wp-content/uploads/2017/09/laremy-tunsil-1280x640.jpg"} />
            </div>
            <div className="carousel-item">
                <img className="carousel-image" src={"https://www.girardatlarge.com/wp-content/uploads/2017/09/laremy-tunsil-1280x640.jpg"} />
            </div>
            <div className="carousel-item">
                <img className="carousel-image" src={"https://www.girardatlarge.com/wp-content/uploads/2017/09/laremy-tunsil-1280x640.jpg"} />
            </div>
            <div className="carousel-item">
                <img className="carousel-image" src={"https://www.girardatlarge.com/wp-content/uploads/2017/09/laremy-tunsil-1280x640.jpg"} />
            </div>
            <div className="carousel-item">
                <img className="carousel-image" src={"https://www.girardatlarge.com/wp-content/uploads/2017/09/laremy-tunsil-1280x640.jpg"} />
            </div>
        </Carousel>

    );
};
