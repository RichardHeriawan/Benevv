import { serverUrl, commentUrl } from "../env.json";
import { getApi } from "./util/getApi";

export const Api = getApi(serverUrl);

export const commentApi = getApi(commentUrl);
export const userApi = getApi(serverUrl + "user");
export const paymentApi = getApi(
  "https://carefulqueen.backendless.app/api/services/PaymentService"
);

export const donorApi = getApi(serverUrl + "donor");
export const campaignApi = getApi(serverUrl + "campaign");
