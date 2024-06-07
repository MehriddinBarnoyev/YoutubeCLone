import { Box, Button } from "@mui/material";
import React from "react";
import { followAction } from "../../../API";

const FollowButton = ({ row }) => {
  const FollowHandle = async () => {
    try {
      const result = await followAction({ id: row.id, ...row, status: true });
      if (result.success) {
        console.log("Follow action successful", result.data);
      } else {
        console.error("Follow action failed");
      }
    } catch (error) {
      console.error("An error occurred while following:", error);
    }
  };

  return (
    <Box>
      <Button onClick={FollowHandle}>Subscribe</Button>
    </Box>
  );
};

export default FollowButton;
