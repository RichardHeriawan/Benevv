import { commentApi } from "./ApiInstances";

const postUse = "post";

export const GetComments = (postId) =>
  commentApi.get(`${postUse}/${postId}/comments`);
export const PostComment = (payload) => commentApi.post("comment", payload);
export const healthCheck = () => commentApi.get("healthcheck");
