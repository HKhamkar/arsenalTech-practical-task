import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PlaceholderImg from "../assets/png/img-placeholder.png";

const MovieCard = ({ item }) => {
  return (
    <Link to={`/movie/${item?.id}`} className="movie_link_tag">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="230"
            width="100%"
            image={
              item?.poster_path
                ? `${process.env.REACT_APP_API_IMG}${item?.poster_path}`
                : PlaceholderImg
            }
            alt={item?.original_title}
            sx={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 2,
          }}
        >
          <Typography
            variant="h4"
            mb={2}
            fontSize={{ xs: "18px", md: "22px" }}
            sx={{
              fontWeight: 600,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              textDecoration: "none",
              color: "black",
            }}
          >
            {item?.original_title}
          </Typography>

          <Typography
            mb={2}
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
              fontSize: "14px",
              color: "#707583",
            }}
          >
            {item?.overview}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "#707583",
            }}
          >
            {`Release year: ${new Date(item?.release_date).getFullYear()}`}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
