import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
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

const getComments = async () => {
  try {
    const commentResponse = await instance.get("/comments");
    return commentResponse.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const followAction = async (body) => {
  try {
    const res = await instance.put(`/subscribe/${body.id}`, body);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error in follow action:", error);
    return { success: false };
  }
};

export { getVideos, getComments, followAction };
