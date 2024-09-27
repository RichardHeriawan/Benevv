import { SetInitialized } from "./util/setInitialized";
import { Api } from "./ApiInstances";

const activityUse = "activity";
const undertakeUse = "undertake";

export const InsertActivity = (usePayload) =>
  Api.post(`${activityUse}/insertDocument`, usePayload);
export const UpdateActivity = (usePayload) =>
  Api.post(`${activityUse}/updateDocument`, usePayload);

export const RetrieveActivity = async (id) => {
  const responseList = await Promise.all([
    Api.post(`${activityUse}/retrieveDocument`, { id }),
    Api.post(`${undertakeUse}/retrieveAll`),
  ]);

  return SetInitialized(responseList, "undertakeInfo");
};

export const SetPreferred = (usePayload) =>
  Api.post(`${activityUse}/setPreferred`, usePayload);
export const ToggleFollow = (usePayload) =>
  Api.post(`${undertakeUse}/toggleFollow`, usePayload);

export const RetrieveActivityPage = async (id) => {
  const [userInfo, activityInfo] = await Promise.all([
    Api.post(`${activityUse}/retrieveUserInfo`, { id }),
    Api.post(`${activityUse}/retrieveDocument`, { id }),
  ]);
  return { userInfo, activityInfo };
};

export const RetrieveForYou = (dataPage) =>
  Api.get(`${activityUse}/retrieveForYou`, { params: { dataPage } });
