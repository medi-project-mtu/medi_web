import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const reviewModal = ({ reviews }) => {
    console.log("test");

    let reviewCarroussel = reviews.map((value) => {
        let user = value.val();

        return (
            <Carousel.Item>
                <h4>{user.review.comment}</h4>
                <br />
                <h5>{user.review.rating}</h5>
            </Carousel.Item>
        );
    });

    return (
        <Carousel controls={false} className="carousel-review">
            {reviewCarroussel}
        </Carousel>
    );
};

export default reviewModal;
