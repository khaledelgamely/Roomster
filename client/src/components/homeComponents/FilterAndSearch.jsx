import React, { useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import FilterButton from "./FilterButton";
import { useDispatch } from "react-redux";
import { getApartments } from "../../store/Slices/apartment";

const FilterAndSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApartments({ page: 1, keyword: `&keyword=${searchQuery}` }));
  }, [dispatch, searchQuery]);

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      sx={{ height: "60px", marginBottom: "120px" }}
      
      className="center filterSearch"
    >
      <Grid item xs={12} sm={9} md={10} lg={11}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Apartments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 3,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} lg={1}>
        <Grid container justifyContent="center">
          <FilterButton />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterAndSearch;
