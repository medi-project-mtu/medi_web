import React from "react";
import Carousel from "react-bootstrap/Carousel";
import StarRatings from "react-star-ratings";

const ReviewCarousel = ({ reviews }) => {
    
    let reviewTotal = 0
    let reviewCount = 0
    
    const roundFloat = (input) => {
        return Math.round(input * 10) / 10;
    }

    let reviewCarroussel = reviews.map((value) => {
        let user = value.val();

        if (user.review === undefined)
            return;

        reviewTotal = reviewTotal + parseFloat(user.review.rating)
        reviewCount++
        return (
            <Carousel.Item>
                <div className="pb-1">
                    <span className="fw-bold">{user.name}</span> 
                    : <span className="fst-italic">"{user.review.comment}"</span>
                </div>

                <StarRatings
                    rating={parseFloat(user.review.rating)}
                    starDimension="1.5em"
                    starSpacing="0.5em"
                    starRatedColor="gold"
                />
            </Carousel.Item>
        );
    });

    return (
        
            <div className=" carousel-review card bg-carousel mx-auto mb-4">
                <div className="card-body px-0 pb-0">
                    <div className="">
                        Average rating:{" "}
                        <span className="fw-bold">
                            {roundFloat(reviewTotal / reviewCount)}
                        </span>
                        <span className="">/5</span>
                    </div>
                </div>
                <div className="card-body px-0">
                    <Carousel controls={false} className="carousel-review">
                        {reviewCarroussel}
                    </Carousel>
                </div>
            </div>
        
    );
};

export default ReviewCarousel;
