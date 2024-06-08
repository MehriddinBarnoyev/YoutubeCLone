import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Grid,
  Divider,
} from "@mui/material";
import { getVideos, getComments } from "../../API";
import CommentTube from "../Comment/comment";
import LikeButton from "../../Components/LikeButton";
import FollowButton from "../../Components/Buttons/FollowButton";

const extractEmbedLink = (url) => {
  if (!url) return "";

  if (url.includes("embed/")) {
    return url;
  } else if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  } else if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }
  return url;
};

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [errorVideo, setErrorVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videos = await getVideos();
        const selectedVideo = videos.find((v) => v.id === Number(id));
        if (selectedVideo) {
          setVideo(selectedVideo);
          setOtherVideos(videos.filter((v) => v.id !== Number(id)));
        } else {
          setErrorVideo("Video not found");
        }
      } catch (error) {
        setErrorVideo("Failed to load video details");
      } finally {
        setLoadingVideo(false);
      }
    };

    const fetchComments = async () => {
      try {
        const comments = await getComments();
        const videoComments = comments.filter(
          (comment) => comment.postId === Number(id)
        );
        setComments(videoComments);
      } catch (error) {
        setErrorComments("Failed to load comments");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchVideo();
    fetchComments();
  }, [id]);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (loadingVideo || loadingComments) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (errorVideo || !video) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Typography variant="h4">{errorVideo}</Typography>
        </Box>
      </Box>
    );
  }

  if (errorComments) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h4">{errorComments}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%",
              marginBottom: "20px",
            }}
          >
            <iframe
              title={video.name}
              src={extractEmbedLink(video.videoLink)}
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ fontWeight: "700", mt: 2 }}>
                {video.name}
              </Typography>
              <FollowButton row={video} />
              <LikeButton />
            </Box>

            <Typography variant="body1">{video.productMade}</Typography>
            <Typography variant="body2">
              {video.views.toLocaleString()} views
            </Typography>
          </Box>
          <Divider sx={{ margin: "20px 0" }} />
          <Box>
            <CommentTube
              videoId={Number(id)}
              comments={comments}
              addComment={addComment}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Other Videos</Typography>
          {otherVideos.map((otherVideo) => (
            <Card
              key={otherVideo.id}
              sx={{
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => handleVideoClick(otherVideo.id)}
            >
              <Box
                sx={{
                  width: "120px",
                  height: "90px",
                  position: "relative",
                  marginRight: "10px",
                }}
              >
                <iframe
                  src={extractEmbedLink(otherVideo.videoLink)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={otherVideo.name}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {otherVideo.name}
                </Typography>
                <Typography variant="body2">
                  {otherVideo.productMade}
                </Typography>
                <Typography variant="body2">
                  {otherVideo.views.toLocaleString()} views
                </Typography>
              </Box>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoPage;
