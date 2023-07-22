/* eslint-disable react/prop-types */
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Grid } from "@mui/material";
export const PhotoList = ({ images }) => {
  
  return (


    <Grid container>
      <Grid xs={12} md={8} sx={{ margin: "auto" }}>
        <ImageList cols={3} rowHeight={300} sx={{ my: 4 }}>
          {images.length > 0 &&
            images.map((item) => (
              <ImageListItem key={item.publicId}>

                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.publicId}
                  loading="lazy"
                />

              </ImageListItem>
            ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};

