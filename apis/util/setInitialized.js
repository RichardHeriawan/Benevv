export function SetInitialized(responseList, ...propertyNames) {
  let i = 1;
  responseList[0].data.initialized = {};
  for (const nextProperty of propertyNames) {
    responseList[0].data.initialized[nextProperty] = responseList[i++].data;
  }

  return responseList[0];
}
