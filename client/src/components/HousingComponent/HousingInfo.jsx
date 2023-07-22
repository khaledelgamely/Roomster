/* eslint-disable react/prop-types */
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

function HousingInfo({ title, body = null }) {
  return (
    <>
      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography variant="h6" color="initial">
          {title}
        </Typography>
        {body && (
          <Typography variant="p" color="initial" sx={{ width: "50%" }}>
            {body}
          </Typography>
        )}
      </Box>
      <Divider />
    </>
  );
}

export default HousingInfo;
