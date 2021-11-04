import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const ReviewCarousel = ({ reviews }) => {
    // const [reviewTotal, setReviewTotal] = useState(0);
    // const [reviewAmount, setReviewAmount] = useState(0);
    
    let reviewTotal = 0
    let reviewCount = 0

    let reviewCarroussel = reviews.map((value) => {
        let user = value.val();
        reviewTotal = reviewTotal + parseFloat(user.review.rating)
        reviewCount++
        // setReviewTotal(reviewTotal + parseFloat(user.review.rating))
        // setReviewAmount(reviewAmount+1)
        return (
            <Carousel.Item>
                <h4 className="text-dark">{user.name}</h4>
                <br/>
                <h4 className="text-dark">{user.review.comment}</h4>
                <br/>
                <h5 className="text-dark">{user.review.rating}</h5>
            </Carousel.Item>
        );
    });

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="text-dark">Review Average {(reviewTotal/reviewCount)}</h4>
            </div>            
            <div className="card-body">
                <Carousel prevLabel={""} nextLabel={""} className="carousel-review">
                    {reviewCarroussel}
                </Carousel>
            </div>
        </div>
        
    );
};

export default ReviewCarousel;
