import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularMovieList,
  getTrendingMovieList,
} from "../redux/actions/moviesAction";
import MovieCard from "../Components/MovieCard";
import {
  setTotalPopularMoviesPages,
  setTotalTrendingMoviesPages,
  setTrendingMoviePageNo,
  setPopularMoviePageNo,
} from "../redux/slices/moviesSlice";

const HomePage = () => {
  const [searchFilter, setsearchFilter] = useState("");

  const dispatch = useDispatch();
  const {
    trendingMovieList,
    popularMovieList,
    trendingMoviePageNo,
    totalTrendingMoviesPages,
    popularMoviePageNo,
    totalPopularMoviesPages,
  } = useSelector((state) => state.movies);

  const trendingMovieListApi = useCallback((trendingMoviePageNo) => {
    dispatch(getTrendingMovieList(trendingMoviePageNo))
      .unwrap()
      .then((res) => {
        dispatch(setTotalTrendingMoviesPages(res?.total_pages));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const popularMovieListApi = useCallback((popularMoviePageNo) => {
    dispatch(getPopularMovieList(popularMoviePageNo))
      .unwrap()
      .then((res) => {
        dispatch(setTotalPopularMoviesPages(res?.total_pages));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    trendingMovieListApi(trendingMoviePageNo);
  }, [trendingMoviePageNo]);

  useEffect(() => {
    popularMovieListApi(popularMoviePageNo);
  }, [popularMoviePageNo]);

  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ display: "inline-block", width: "100%" }}>
      <Container>
        <Box
          sx={{
            display: "inline-block",
            width: "100%",
            ".movie_link_tag": { textDecoration: "none" },
          }}
        >
          <Box sx={{ display: "flex", width: "100%", mb: 3 }}>
            <TextField
              id="outlined-basic"
              label="Search movies"
              variant="outlined"
              value={searchFilter}
              onChange={(e) => setsearchFilter(e.target.value)}
              sx={{ width: "100%" }}
              placeholder="Search movies here..."
            />
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Trending Movies" {...a11yProps(0)} />
              <Tab label="Popular Movies" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              {trendingMovieList &&
                trendingMovieList
                  ?.filter((item) =>
                    item.original_title
                      .toLowerCase()
                      .includes(searchFilter.toLowerCase())
                  )
                  ?.map((item) => (
                    <Grid item xs={12} sm={4} md={3} key={item?.id}>
                      <MovieCard item={item} />
                    </Grid>
                  ))}
            </Grid>

            {trendingMovieList && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 5,
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(setTrendingMoviePageNo(trendingMoviePageNo - 1))
                  }
                  disabled={trendingMoviePageNo === 1}
                >
                  Previous Page
                </Button>

                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(setTrendingMoviePageNo(trendingMoviePageNo + 1))
                  }
                  disabled={totalTrendingMoviesPages === trendingMoviePageNo}
                >
                  Next Page
                </Button>
              </Box>
            )}
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              {popularMovieList &&
                popularMovieList
                  ?.filter((item) =>
                    item.original_title
                      .toLowerCase()
                      .includes(searchFilter.toLowerCase())
                  )
                  ?.map((item) => (
                    <Grid item xs={12} sm={4} md={3} key={item?.id}>
                      <MovieCard item={item} />
                    </Grid>
                  ))}
            </Grid>

            {popularMovieList && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 5,
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(setPopularMoviePageNo(popularMoviePageNo - 1))
                  }
                  disabled={popularMoviePageNo === 1}
                >
                  Previous Page
                </Button>

                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(setPopularMoviePageNo(popularMoviePageNo + 1))
                  }
                  disabled={totalPopularMoviesPages === popularMoviePageNo}
                >
                  Next Page
                </Button>
              </Box>
            )}
          </CustomTabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
