import api from "../api";

export const postReview = async (review, postId) => {
  try {
    const response = api.post(`/product/review/${postId}`, { review });
    return response;
  } catch (err) {
    return err.response;
  }
};
