import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const getVideos = async () => {
  try {
    const videoResponse = await instance.get("/video");
    return videoResponse.data;
  } catch (error) {
    console.error("Videolar olishda xato:", error);
    return [];
  }
};

const getVideoById = async (id) => {
  try {
    const videoResponse = await instance.get(`/video/${id}`);
    return videoResponse.data;
  } catch (error) {
    console.error("Videoni olishda xato:", error);
    return null;
  }
};

const getComments = async (videoId) => {
  try {
    const commentResponse = await instance.get(`/comments?postId=${videoId}`);
    return commentResponse.data;
  } catch (error) {
    console.error("Fikrlarni olishda xato:", error);
    return [];
  }
};

const followAction = async (body) => {
  try {
    const res = await instance.put(`/subscribe/${body.id}`, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Obunani amalga oshirishda xato:", error);
    return { success: false };
  }
};

export { getVideos, getVideoById, getComments, followAction };
