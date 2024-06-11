import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const getVideos = async () => {
  try {
    const videoResponse = await instance.get("/video");
    return videoResponse.data;
  } catch (error) {
    console.error("Error fetching videos:", error.response ? error.response.data : error.message);
    return [];
  }
};

const getVideoById = async (id) => {
  try {
    const videoResponse = await instance.get(`/video/${id}`);
    return videoResponse.data;
  } catch (error) {
    console.error(`Error fetching video by ID (${id}):`, error.response ? error.response.data : error.message);
    return null;
  }
};

const getComments = async (videoId) => {
  try {
    const commentResponse = await instance.get(`/comments?postId=${videoId}`);
    return commentResponse.data;
  } catch (error) {
    console.error(`Error fetching comments for video ID (${videoId}):`, error.response ? error.response.data : error.message);
    return [];
  }
};

const followAction = async (id, body) => {
  try {
    const res = await instance.put(`/video/${id}`, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.error(`Error performing follow action on video ID (${id}):`, error.response ? error.response.data : error.message);
    return { success: false };
  }
};

const likeAction = async (id) => {
  try {
    // Fetch the current video data to get the current likeNumber
    const videoResponse = await instance.get(`/video/${id}`);
    const currentVideo = videoResponse.data;

    if (currentVideo) {
      // Prepare the body with updated like status and incremented likeNumber
      const body = {
        likes: true,
        likeNumber: currentVideo.likeNumber + 1,
      };

      const res = await instance.patch(`/video/${id}`, body); // Use PATCH instead of PUT
      return { success: true, data: res.data };
    } else {
      console.error(`Video with ID (${id}) not found.`);
      return { success: false };
    }
  } catch (error) {
    console.error(`Error performing like action on video ID (${id}):`, error.response ? error.response.data : error.message);
    return { success: false };
  }
};
const disLikeAction = async (id) => {
  try {
    const videoResponse = await instance.get(`/video/${id}`);
    const currentVideo = videoResponse.data;

    if (currentVideo) {
      const body = {
        dislikes: true,
        dislikeNumber: currentVideo.dislikeNumber + 1, // Increment dislikeNumber instead of likeNumber
      };

      const res = await instance.patch(`/video/${id}`, body);
      return { success: true, data: res.data };
    } else {
      console.error(`Video with ID (${id}) not found.`);
      return { success: false };
    }
  } catch (error) {
    console.error(`Error performing dislike action on video ID (${id}):`, error.response ? error.response.data : error.message);
    return { success: false };
  }
};

export { getVideos, getVideoById, getComments, followAction, likeAction, disLikeAction };
