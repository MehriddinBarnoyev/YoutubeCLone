import { Box, Button } from "@mui/material";
import React from "react";
import { followAction } from "../../../API";

const FollowButton = ({ row }) => {
  const FollowHandle = async () => {
    followAction(row.id, {...row, status: true})
    console.log(row)
 
  };

  return (
    <Box>
      <Button onClick={FollowHandle} sx={{mt:2}}>Subscribe</Button>
    </Box>
  );
};

export default FollowButton;
