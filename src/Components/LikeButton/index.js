import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Box, Button, Tooltip } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import Confetti from "react-dom-confetti";
import { likeAction, getVideoById, disLikeAction } from "../../API";

const LikeButton = ({ videoId }) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const video = await getVideoById(videoId);
      if (video) {
        setCount(video.likeNumber);
        setLiked(video.likes);
        setCount2(video.dislikeNumber); // Set dislike count from the server
        setDisliked(video.dislikes); // Set dislike status from the server
      }
    };
    fetchData();
  }, [videoId]);

  const incrementButton = async () => {
    const result = await likeAction(videoId);
    if (result.success) {
      setCount(prevCount => prevCount + 1);
      setLiked(true);
      setDisliked(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  };

  const decrementButton = async () => {
    const result = await disLikeAction(videoId);
    if (result.success) {
      setCount2(prevCount2 => prevCount2 + 1); // Increment dislike count
      setLiked(false);
      setDisliked(true);
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
      <Tooltip title={"I like this"}>
        <Box sx={{ position: "relative" }}>
          <Button
            startIcon={<ThumbUpIcon />}
            onClick={incrementButton}
            sx={{ color: liked ? "primary.main" : "grey" }}
          >
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
      <Box>
        <Tooltip title={"I dislike this"}>
          <Button
            endIcon={<ThumbDownIcon />}
            onClick={decrementButton}
            sx={{ color: disliked ? "primary.main" : "grey" }}
            >
            {count2}
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default LikeButton;
