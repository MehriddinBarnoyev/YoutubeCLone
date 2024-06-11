import React, { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import { getVideos } from "../../API";
import { useNavigate } from "react-router-dom";
import Buttons from "../../Components/Buttons";
import ErrorBoundary from "../../Components/ErrorBoundry"; // Ensure this component exists and works as expected

const extractEmbedLink = (url) => {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
  return url;
};

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVideos = await getVideos();
        console.log("Fetched Videos:", fetchedVideos); // Debug log
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Failed to load videos:", error); // Improved error logging
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography variant="h4">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Buttons />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", paddingTop: "10px" }}>
        {videos.map((video) => (
          <ErrorBoundary key={video.id}> {/* Adding ErrorBoundary here */}
            <Card
              sx={{ borderRadius: "20px", paddingBottom: "20px", width: "calc(33.33% - 13.33px)", cursor: "pointer" }}
              onClick={() => handleVideoClick(video.id)}
            >
              <Box sx={{ width: "100%", height: 0, paddingBottom: "56.25%", position: "relative" }}>
                <iframe
                  src={extractEmbedLink(video.videoLink)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ paddingLeft: "10px", paddingTop: "20px" }}>
                <Typography variant="h6">{video.name}</Typography>
                <Typography variant="body2">{video.productMade}</Typography>
                <Typography variant="body2">{video.views.toLocaleString()} views</Typography>
              </Box>
            </Card>
          </ErrorBoundary>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
