import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Box, Button, Tooltip } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import Confetti from "react-dom-confetti";
import { likeAction } from "../../API";

const LikeButton = ({ videoId }) => {
  const [count, setCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const incrementButton = async () => {
    try {
      const response = await likeAction(videoId);
      if (response.success) {
        setCount(count +1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
      }
    } catch (error) {
      console.error("Failed to like the video:", error);
    }
  };

  return (
    <div className="d-flex pe-3 pt-1">
      <Box>
        <Tooltip title={"Share"}>
          <Button
            startIcon={<IosShareIcon />}
            sx={{ color: "grey", paddingTop: "16px", paddingRight: "20px" }}
          >
            Share
          </Button>
        </Tooltip>
      </Box>
      <>
        <Tooltip title={"I like this"}>
          <Box sx={{ position: "relative" }}>
            <Button startIcon={<ThumbUpIcon />}  onClick={incrementButton}>
              {count}
            </Button>
            <Confetti
              active={showConfetti}
              config={{
                spread: 45,
                startVelocity: 30,
                elementCount: 50,
                colors: ["#f00", "#0f0", "#00f", "#ffeb7f", "#FFFF00"],
              }}
            />
          </Box>
        </Tooltip>
      </>
      <Box>
        <Tooltip title={"I dislike this"}>
          <Button endIcon={<ThumbDownIcon />}></Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default LikeButton;
