import { Api } from "./ApiInstances";

const memoUse = "memo";

export const SetMemoRead = (usePayload) =>
  Api.post(`${memoUse}/setMemoRead`, usePayload);
