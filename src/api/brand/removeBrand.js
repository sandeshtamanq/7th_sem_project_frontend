import api from "../api";

export const deleteBrand = async (id, fetchBrand) => {
  try {
    const res = await api.delete(`/brand/${id}`);
    fetchBrand();
    return res;
  } catch (err) {
    return err.response;
  }
};
