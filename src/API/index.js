import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const getVideos = async () => {
  try {
    const videoResponse = await instance.get("/video");
    return videoResponse.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

const getVideoById = async (id) => {
  try {
    const videoResponse = await instance.get(`/video/${id}`);
    return videoResponse.data;
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    return null;
  }
};

const getComments = async (videoId) => {
  try {
    const commentResponse = await instance.get(`/comments?postId=${videoId}`);
    return commentResponse.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const followAction = async (id, body) => {
  try {
    const res = await instance.put(`/video/${id}`, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error performing follow action:", error);
    return { success: false };
  }
};

const likeAction = async (id, body) => {
  try {
    const res = await instance.put(`/video/${id}`, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error performing like action:", error);
    return { success: false };
  }
};

export { getVideos, getVideoById, getComments, followAction, likeAction };
