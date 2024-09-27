import { serverUrl } from "../env.json";
import { useAxios } from "./hooks/useAxios";
import { getApi } from "./util/getApi";

const fetchURL = serverUrl + "/campaign";

const api = getApi(fetchURL);

export const getCampaignByCampaignShortPOST = ({ campaign_short }) =>
  api.post("/retrieveDocument", { campaign_short }).then((r) => r.data);

export const useGetCampaignByCampaignShortPOST = ({ campaign_short }) => {
  return useAxios(fetchURL + "/retrieveDocument", {
    method: "POST",
    data: {
      campaign_short,
    },
  });
};

export const addCampaignDonorPOST = ({
  user_id,
  campaign_short,
  action_type,
  action_id,
  amount,
  note,
}) =>
  api
    .post("/insertDocument", {
      user_id,
      campaign_short,
      action_type,
      action_id,
      amount,
      note,
    })
    .then((r) => r.data);
