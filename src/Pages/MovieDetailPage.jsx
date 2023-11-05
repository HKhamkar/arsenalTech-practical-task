import React, { useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovieCreditDetailsById,
  getMovieDetailsById,
} from "../redux/actions/moviesAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import PlaceholderImg from "../assets/png/img-placeholder.png";

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, loading, movieCreditDetails } = useSelector(
    (state) => state.movies
  );

  const getMovieCreditDetailsApi = useCallback((id) => {
    dispatch(getMovieCreditDetailsById(id))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const getMovieDetailsApi = useCallback((id) => {
    dispatch(getMovieDetailsById(id))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      getMovieDetailsApi(id);
      getMovieCreditDetailsApi(id);
    }
  }, [id]);

  return (
    <Box sx={{ display: "inline-block", width: "100%" }}>
      <Container>
        {loading ? (
          <Box sx={{ display: "inline-block", width: "100%" }}>Loading...</Box>
        ) : (
          <>
            {movieDetails ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", mb: 3 }}>
                  <CardMedia
                    component="img"
                    height="400"
                    width="100%"
                    image={
                      movieDetails?.backdrop_path
                        ? `${process.env.REACT_APP_API_IMG}${movieDetails?.backdrop_path}`
                        : PlaceholderImg
                    }
                    alt={movieDetails?.original_title}
                    sx={{ objectFit: "cover" }}
                  />
                </Box>

                <Typography
                  variant="h2"
                  sx={{ mb: 2, fontWeight: 600 }}
                  fontSize={{ xs: "28px", sm: "34px", md: "42px" }}
                >
                  {movieDetails?.original_title}
                </Typography>

                <Typography variant="body2" mb={1} fontSize={{ xs: "14px" }}>
                  {`Release year: ${new Date(
                    movieDetails?.release_date
                  ).getFullYear()}`}
                </Typography>

                <Typography variant="body2" mb={3} fontSize={{ xs: "14px" }}>
                  {`Runtime: ${Math.floor(movieDetails?.runtime / 60)}h ${
                    movieDetails?.runtime % 60
                  }min`}
                </Typography>

                <Typography
                  mb={3}
                  variant="body2"
                  sx={{
                    color: "#707583",
                  }}
                  fontSize={{ xs: "14px", sm: "16px" }}
                >
                  {movieDetails?.overview}
                </Typography>

                <Typography
                  variant="body2"
                  mb={1.5}
                  fontSize={{ xs: "16px" }}
                  sx={{ fontWeight: 600 }}
                >
                  Cast
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    gap: 1,
                    a: {
                      textDecoration: "none",
                    },
                  }}
                >
                  {movieCreditDetails &&
                    movieCreditDetails?.cast &&
                    movieCreditDetails?.cast?.map((item) => (
                      <Link to={`/person/${item?.id}`}>
                        <Box
                          key={item?.id}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            border: "1px solid #cdd7e1",
                            borderRadius: "50px",
                            cursor: "pointer",
                            fontSize: "14px",
                            background: "#fbfcfe",
                            color: "black",
                          }}
                        >
                          {item?.original_name}
                        </Box>
                      </Link>
                    ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "inline-block", width: "100%" }}>
                Data Not Found!
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetailPage;
