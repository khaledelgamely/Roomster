import { Grid, Skeleton } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
export const SkeletonCard = () => {
  return (
    <Grid container spacing={2}>
      {[..."x".repeat(10)].map((item, index) => (
        <Grid key={index} item xs={12} sm={4} md={4} lg={3}>
          <Skeleton variant="rectangular" width={"100%"} height={"300px"} />
          <Skeleton
            animation="wave"
            height={10}
            width="50%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={10}
            width="50%"
            style={{ marginBottom: 6 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export const SkeletonPageDetails = () => {
  return (
    <>
      <Skeleton width="100%">
        <Typography>.</Typography>
      </Skeleton>
      <Grid
        container
        spacing={2}
        component="div"
        sx={{
          height: 500,
          overflow: "hidden",
        }}
      >
        <Grid item xs={12} md={6}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"100%"}
          ></Skeleton>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: { xs: "none", md: "block" }, height: 500 }}
        >
          <Grid container spacing={2} component="div" sx={{ height: 500 }}>
            <Grid item xs={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={"100%"}
              ></Skeleton>
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={"100%"}
              ></Skeleton>
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={"100%"}
              ></Skeleton>
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={"100%"}
              ></Skeleton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      ;
    </>
  );
};
