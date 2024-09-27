import { Api } from "./ApiInstances";
// https://kharis.external.smarttwigs.io/kharis/api/v1/post/reportPost

export const ReportUser = (report) => {
  return Api.post("post/reportPost/", report);
};
