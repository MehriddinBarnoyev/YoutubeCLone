import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const CommentTube = ({ videoId, comments, addComment }) => {
  const [comment, setComment] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

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
        setSubmitMessage("Comment submitted successfully!");
        setTimeout(() => setSubmitMessage(""), 3000); // Clear message after 3 seconds
      } catch (error) {
        console.error(error);
        setSubmitMessage("Failed to submit comment.");
      }
    }
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h6">Comments</Typography>
      <Box
        component="form"
        onSubmit={handleCommentSubmit}
        sx={{ marginBottom: "20px", paddingTop:"20px" }}
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
        {submitMessage && (
          <Typography variant="body2" sx={{ marginTop: "10px", color: "green" }}>
            {submitMessage}
          </Typography>
        )}
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
