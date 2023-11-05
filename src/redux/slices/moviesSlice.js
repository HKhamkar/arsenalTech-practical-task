import { createSlice } from "@reduxjs/toolkit";
import {
  getMovieCreditDetailsById,
  getMovieDetailsById,
  getPopularMovieList,
  getTrendingMovieList,
} from "../actions/moviesAction";

const MoviesSlice = createSlice({
  name: "movies",
  initialState: {
    loading: false,
    trendingMovieList: [],
    totalTrendingMoviesPages: 0,
    trendingMoviePageNo: 1,
    popularMovieList: [],
    totalPopularMoviesPages: 0,
    popularMoviePageNo: 1,
    movieDetails: null,
    movieCreditDetails: null,
  },
  reducers: {
    setTrendingMoviePageNo: (state, action) => {
      state.trendingMoviePageNo = action.payload;
    },
    setTotalTrendingMoviesPages: (state, action) => {
      state.totalTrendingMoviesPages = action.payload;
    },
    setPopularMoviePageNo: (state, action) => {
      state.popularMoviePageNo = action.payload;
    },
    setTotalPopularMoviesPages: (state, action) => {
      state.totalPopularMoviesPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get trending movie list
    builder.addCase(getTrendingMovieList.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getTrendingMovieList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.trendingMovieList = payload?.results;
    });

    builder.addCase(getTrendingMovieList.rejected, (state, { payload }) => {
      state.loading = false;
    });

    // get popular movie list
    builder.addCase(getPopularMovieList.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getPopularMovieList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.popularMovieList = payload?.results;
    });

    builder.addCase(getPopularMovieList.rejected, (state, { payload }) => {
      state.loading = false;
    });

    // get movie details by id
    builder.addCase(getMovieDetailsById.pending, (state, { payload }) => {
      state.loading = true;
      state.movieDetails = null;
    });

    builder.addCase(getMovieDetailsById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.movieDetails = payload;
    });

    builder.addCase(getMovieDetailsById.rejected, (state, { payload }) => {
      state.loading = false;
      state.movieDetails = null;
    });

    // get movie credit details by id
    builder.addCase(getMovieCreditDetailsById.pending, (state, { payload }) => {
      state.loading = true;
      state.movieCreditDetails = null;
    });

    builder.addCase(
      getMovieCreditDetailsById.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.movieCreditDetails = payload;
      }
    );

    builder.addCase(
      getMovieCreditDetailsById.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.movieCreditDetails = null;
      }
    );
  },
});

export const {
  setTrendingMoviePageNo,
  setTotalTrendingMoviesPages,
  setPopularMoviePageNo,
  setTotalPopularMoviesPages,
} = MoviesSlice.actions;

export default MoviesSlice.reducer;
