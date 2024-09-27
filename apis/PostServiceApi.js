import { Api } from "./ApiInstances";
import { SetInitialized } from "./util/setInitialized";

const postUse = "post";
const undertakeUse = "undertake";

export const InsertPost = (usePayload) =>
  Api.post(`${postUse}/insertDocument`, usePayload);
export const UpdatePost = (usePayload) =>
  Api.post(`${postUse}/updateDocument`, usePayload);

export const DeletePost = async (postPayload) =>
  Api.post(`${postUse}/deleteDocument`, postPayload);

export const RetrievePost = async (id) => {
  const responseList = await Promise.all([
    Api.get(`${postUse}/retrieveDocument`, { params: { id } }),
    Api.post(`${undertakeUse}/retrieveAll`),
  ]);

  return SetInitialized(responseList, "undertakeInfo");
};

export const GetPost = (id) =>
  Api.get(`${postUse}/retrieveDocument`, { params: { id: id } });

export const SetPostLiked = (usePayload) =>
  Api.post(`${postUse}/setPostLiked`, usePayload);

export const RetrievePosts = (dataPage) =>
  Api.get("post/retrieveAll", { params: { dataPage } });
export const RetrieveRelatedPostsForCauses = (dataPage, causeId) =>
  Api.get("undertake/relatedPosts", { params: { dataPage, causeId } });
export const RetrieveRelatedPostsForActivities = (dataPage, activityId) =>
  Api.get("activity/relatedPosts", { params: { dataPage, activityId } });

export const StartForm = async () => {
  const actualResponse = await Api.post(`${undertakeUse}/retrieveAll`);
  return { data: { undertakeInfo: actualResponse.data } };
};
