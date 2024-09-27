import { serverUrl } from "../env.json";
import { useAxios } from "./hooks/useAxios";
import { useEffect } from "react";

const fetchURL = serverUrl + "/donor";

export const getCampaignDonorsByCampaignShortPOST = ({ campaign_short }) => {
  return api
    .post(`/retrieveCampaignDonors`, { campaign_short })
    .then((r) => r.data);
};

export const FetchGetCampaignDonorsPOST = ({ children, campaign_short }) => {
  const { loading, error, response, refetch } = useAxios(
    fetchURL + "/retrieveCampaignDonors",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${TEST_BEARER_TOKEN}`,
      },
      data: { campaign_short },
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

  return children({ loading, error, response, refetch });
};
