import axios from "axios";

const PersonAPI = {
  // get person details by id api
  getPersonDetailsByIdApi(id) {
    return axios.get(
      `${process.env.REACT_APP_URL}/person/${id}?language=en-US`,
      {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      }
    );
  },

  // get person movies by id api
  getPersonMoviesByIdApi(id) {
    return axios.get(
      `${process.env.REACT_APP_URL}/person/${id}/movie_credits?language=en-US`,
      {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      }
    );
  },
};

export default PersonAPI;
