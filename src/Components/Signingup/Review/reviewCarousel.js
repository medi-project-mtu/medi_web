import React from "react";
import Carousel from "react-bootstrap/Carousel";

const ReviewCarousel = ({ reviews }) => {
    
    let reviewTotal = 0
    let reviewCount = 0
    
    const roundFloat = (input) => {
        return Math.round(input * 10) / 10;
    }

    let reviewCarroussel = reviews.map((value) => {
        let user = value.val();
        reviewTotal = reviewTotal + parseFloat(user.review.rating)
        reviewCount++
        return (
            <Carousel.Item>
                <h4 className="text-dark">{user.name}</h4>
                <br />
                <h4 className="text-dark">{user.review.comment}</h4>
                <br />
                <h5 className="text-dark">{roundFloat(user.review.rating)}</h5>
            </Carousel.Item>
        );
    });

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="text-dark">
                    Review Average {roundFloat(reviewTotal/reviewCount)}
                </h4>
            </div>
            <div className="card-body">
                <Carousel
                    prevLabel={""}
                    nextLabel={""}
                    className="carousel-review"
                >
                    {reviewCarroussel}
                </Carousel>
            </div>
        </div>
    );
};

export default ReviewCarousel;
