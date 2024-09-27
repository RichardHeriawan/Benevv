import { Api } from "./ApiInstances";
import { SetInitialized } from "./util/setInitialized";

const undertakeUse = "undertake";

export const UpdateOrganization = (usePayload) =>
  Api.post("organization/updateProfile", usePayload);

export const RetrieveOrganization = async (id) => {
  const responseList = await Promise.all([
    Api.get("organization/getProfile"),
    Api.post(`${undertakeUse}/retrieveAll`),
  ]);

  return SetInitialized(responseList, "undertakeInfo");
};
