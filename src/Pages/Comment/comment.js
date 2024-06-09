import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const CommentTube = ({ videoId, comments, addComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const response = await fetch("http://localhost:3000/comments", { // replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: videoId,
            text: comment,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to post comment");
        }
        const newComment = await response.json();
        addComment(newComment); // Update the comments state with the new comment
        setComment("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h6">Comments</Typography>
      <Box
        component="form"
        onSubmit={handleCommentSubmit}
        sx={{ marginBottom: "20px" }}
      >
        <TextField
          fullWidth
          label="Add a comment"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          sx={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      {comments.map((comment, index) => (
        <Box key={index} sx={{ marginBottom: "10px" }}>
          <Typography>{comment.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CommentTube;
