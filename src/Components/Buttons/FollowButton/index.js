// FollowButton.js

import {Box, Button, Tooltip} from "@mui/material";
import React from "react";
import { followAction } from "../../../API";

const FollowButton = ({ row }) => {
  const handleSubscribe = async () => {
    try {
      const result = await followAction({ id: row.id, ...row, status: true });
      if (result.success) {
        console.log("Subscription successful", result.data);
        // Optionally, you can update UI or show a success message
      } else {
        console.error("Subscription failed");
        // Optionally, you can handle failure scenarios
      }
    } catch (error) {
      console.error("An error occurred while subscribing:", error);
      // Optionally, you can handle error scenarios
    }
  };

  return (
    <Box>
      <Tooltip title="Subscribe">
        <Button onClick={handleSubscribe} sx={{ mt: 2 }}>
          Subscribe
        </Button>
      </Tooltip>

    </Box>
  );
};

export default FollowButton;
