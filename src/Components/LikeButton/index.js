import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Box, Button, Tooltip } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import Confetti from "react-dom-confetti";

const LikeButton = () => {
  const [count, setCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const increment = () => {
    setCount(count + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100); // Show confetti briefly
  };

  const icon1 = (
    <Box color={"grey"}>
      <ThumbDownIcon />
    </Box>
  );

  const icon2 = (
    <Box color={"grey"}>
      <ThumbUpIcon />
    </Box>
  );

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
            <Button startIcon={icon2} onClick={increment}>
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
          <Button endIcon={icon1}></Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default LikeButton;
