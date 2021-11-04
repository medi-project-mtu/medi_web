import React, { useState } from "react";
import logo from "../../Assets/Common/logo.png";
import ReviewCarousel from "./Review/reviewCarousel";
import { useList } from "react-firebase-hooks/database";
import { fetchReviews } from "../Firebase";

const Logo = () => {
    const [reviews, loading, error] = useList(fetchReviews());

    return (
        <div className="col-md-6 h-100 p-0 m-0 bg-logo">
            <div className="row align-items-end p-0 m-0 h-100">
                <div className="col-12 p-0 m-0 text-center">
                    <img src={logo} alt="logo" className="logo-medi p-0 m-0" />
                </div>
                <div className="col-12 px-5 carousel-review text-center text-white">
                    {!loading && reviews && (
                        <ReviewCarousel reviews={reviews} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Logo;
