import axios from "axios";

const MovieAPI = {
  // get trending movie list api
  getTrendingMoviesApi(pageNo) {
    return axios.get(
      `${process.env.REACT_APP_URL}/trending/movie/day?language=en-US&page=${pageNo}`,
      {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      }
    );
  },

  // get trending movie list api
  getPopularMoviesApi(pageNo) {
    return axios.get(
      `${process.env.REACT_APP_URL}/movie/popular?language=en-US&page=${pageNo}`,
      {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      }
    );
  },

  // get movie details by id api
  getMovieDetailsByIdApi(id) {
    return axios.get(
      `${process.env.REACT_APP_URL}/movie/${id}?language=en-US`,
      {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      }
    );
  },

  // get movie credit details by id api
  getMovieCreditDetailsByIdApi(id) {
    return axios.get(
      `${process.env.REACT_APP_URL}/movie/${id}/credits?language=en-US`,
      {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      }
    );
  },
};

export default MovieAPI;
