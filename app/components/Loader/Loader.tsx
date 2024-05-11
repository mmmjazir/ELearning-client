import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div className="flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CircularProgress/>
    </div>
  );
};

export default Loader;