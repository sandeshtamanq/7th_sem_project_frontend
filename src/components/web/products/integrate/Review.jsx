import React, { useState } from "react";
import { postReview } from "../../../../api/products/postReview";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useDispatch } from "react-redux";
import { addProductReview } from "../../../../redux/reducers/productDetailReducer";

const Review = ({ productDetail, id }) => {
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useAuthContext();
  const productReview = async (review, id) => {
    const response = await postReview(review, id);
    if (response.status === 201) {
      dispatch(
        addProductReview({
          review,
          user,
        })
      );
      setReview("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.length < 1) {
      return;
    }
    productReview(review, id);
  };
  return (
    <>
      <div className="m-auto w-[90%] mt-10 p-4 rounded-md bg-white">
        {isLoggedIn && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <input type="text" placeholder="Write a review" name="review" value={review} onChange={(e) => setReview(e.target.value)} />
            <button type="submit" className="w-40">
              Post Review
            </button>
          </form>
        )}
        <div className="mt-10">
          Reviews:
          <div className="space-y-5 mt-4">
            {productDetail?.map((review, index) => (
              <div key={index}>
                {user?.firstName === review?.user?.firstName ? <div>{"by You"}</div> : <div className="text-gray-600">by {review?.user?.firstName}</div>}
                <div>{review.review}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
