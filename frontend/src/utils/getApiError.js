export const getApiError = (err, fallback = "Something went wrong") => {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.code === "ERR_NETWORK") {
    return "Backend API is not reachable. Start the backend server and MongoDB, then try again.";
  }
  return err.message || fallback;
};
