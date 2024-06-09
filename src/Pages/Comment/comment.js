import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const CommentTube = ({ videoId, comments = [], addComment }) => { 
  const [commentText, setCommentText] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const response = await fetch("http://localhost:5000/comments", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: videoId,
            text: commentText,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to post comment");
        }
        const newComment = await response.json();
        addComment(newComment);
        setCommentText("");
        setSubmitMessage("Comment submitted successfully!");
        setTimeout(() => setSubmitMessage(""), 3000);
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
        sx={{ marginBottom: "20px", paddingTop: "20px" }}
      >
        <TextField
          fullWidth
          label="Add a comment"
          variant="outlined"
          value={commentText}
          onChange={handleCommentChange}
          sx={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
        {submitMessage && (
          <Typography variant="body2" sx={{ marginTop: "10px", color: submitMessage.includes("successfully") ? "green" : "red" }}>
            {submitMessage}
          </Typography>
        )}
      </Box>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Box key={index} sx={{ marginBottom: "10px" }}>
            <Typography>{comment.text}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No comments yet.</Typography>
      )}
    </Box>
  );
};

export default CommentTube;
