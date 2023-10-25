import React from "react";
import { Typography } from "@mui/material";
function C() {
  return (
    <div>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontWeight: "bold",
          fontSize: "50px",
        }}
      >
        You have been matched!
      </Typography>
    </div>
  );
}

export default C;
