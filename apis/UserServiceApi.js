import { useIsFocused } from "@react-navigation/native";
import { useAxios } from "./hooks/useAxios";
import { SetInitialized } from "./util/setInitialized";
import { Api, userApi } from "./ApiInstances";
import { serverUrl } from "../env.json";

const fetchURL = serverUrl + "/user";
const undertakeUse = "undertake";

export const getUserByUserId = ({ userId }) =>
  userApi
    .post("/retrieveDocument", {
      id: userId,
    })
    .then((r) => r.data)
    .catch((e) => console.log("ERROR: " + JSON.stringify(e)));

export const blockUser = ({ user_id, blocked_id }) =>
  userApi
    .post("/setBlock", {
      blocked_by: user_id,
      blocked: blocked_id,
      action: "block",
    })
    .then((r) => r.data)
    .catch((e) => console.log("ERROR: " + JSON.stringify(e)));

export const unblockUser = ({ user_id, blocked_id }) =>
  userApi
    .post("/setBlock", {
      blocked_by: user_id,
      blocked: blocked_id,
      action: "unblock",
    })
    .then((r) => r.data)
    .catch((e) => console.log("ERROR: " + JSON.stringify(e)));

export const useGetUserByUserIdGET = ({ userId }) => {
  const isFocused = useIsFocused();

  return useAxios(fetchURL + "/retrieveDocument", {
    method: "POST",
    data: {
      id: userId,
    },
  });
};

export const FetchGetUserByUserIdGET = (props) => {
  const { children, userId } = props;

  const { loading, error, response } = useAxios(
    fetchURL + "/retrieveDocument",
    {
      method: "POST",
      data: {
        id: userId,
      },
    }
  );

  useEffect(() => {
    if (error) {
      console.error(
        "Fetch error: " + error.response.status + " " + error.message
      );
      console.error(error);
    }
  }, [error]);

  return children({ loading, error, response });
};

// Type 3

const userUse = "user";

export const UpdatePerson = (usePayload) =>
  Api.post(`${userUse}/updateDocument`, usePayload);
export const RetrievePerson = async (id) => {
  const responseList = await Promise.all([
    Api.post(`${userUse}/retrieveDocument`, { id }),
    Api.post(`${undertakeUse}/retrieveAll`),
  ]);
  return SetInitialized(responseList, "undertakeInfo");
};
export const RetrieveUser = (id) =>
  Api.post(`${userUse}/retrieveDocument`, { id });
export const UpdateAlerts = (usePayload) =>
  Api.post(`${userUse}/updateAlerts`, usePayload);
export const SendSkill = (userId, causeType) =>
  Api.post(`${userUse}/saveSkill`, { causeType });
export const SetStatusData = (activityId, statusType, requestType) =>
  Api.post(`${userUse}/setStatusData`, {
    activityId,
    statusType,
    requestType,
  });
export const RetrievePublicProfile = async (id) => {
  const responseList = await Promise.all([
    Api.post(`${userUse}/retrieveDocument`, { id }),
    Api.post(`${userUse}/publicProfile`, { id }),
  ]);

  return SetInitialized(responseList, "publicInfo");
};

export const RetrievePrivateProfile = async (id) => {
  const responseList = await Promise.all([
    Api.post(`${userUse}/retrieveDocument`, { id }),
    Api.post(`${userUse}/publicProfile`, { id }),
    Api.post(`${userUse}/privateProfile`, { id }),
  ]);

  return SetInitialized(responseList, "publicInfo", "privateInfo");
};

export const searchUsers = (usePayload) =>
  Api.post(`${userUse}/searchDocuments`, usePayload);

export const DeletedAccount = () => Api.delete("/auth/deleteUser");
