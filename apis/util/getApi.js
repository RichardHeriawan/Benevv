import { serverUrl } from "../../env.json";
import Axios from "axios";

import moment from "moment";
import store from "../../redux/store";
import authActions from "../../redux/actions/authActions";
import { GetExpiration, isClear } from "../../components";

export function getApi(fetchURL) {
  const api = Axios.create({
    baseURL: fetchURL,
  });

  api.interceptors.request.use(
    async (config) => {
      const allState = store.getState();
      const isLoggedIn = allState.authReducer.isLoggedIn;

      if (isClear(isLoggedIn) || !isLoggedIn) {
        return config;
      }

      const userInfo = allState.authReducer.userInfo;
      const momentNow = moment.utc();
      const expireMoment = moment.utc(userInfo.accessExpiration);
      const minutesLeft = expireMoment.diff(momentNow, "minutes");
      // console.log('82842', minutesLeft, config.url)

      // Un-launch the app if the token expired
      if (minutesLeft < 480) {
        // TODO for test use 21895
        // console.log('65241')

        // Check also link 2020082723
        // To have a cleaner redux initial state, waiting for other request-responses to finalize
        setTimeout(() => store.dispatch(authActions.ResetAll()), 3000);

        // https://github.com/axios/axios/issues/583#issuecomment-504317347
        return new Promise(() => {});
      } else if (minutesLeft < 1440) {
        // Refresh the token if its going to expire in 24 hours

        // Interceptor auto-catches error https://github.com/axios/axios/issues/754#issuecomment-286806251
        const tokenResponse = await axios.post(
          `${serverUrl}auth/refreshToken`,
          null,
          { headers: { Authorization: "Bearer " + userInfo.accessToken } }
        );
        const useData = tokenResponse.data;

        store.dispatch(
          authActions.PutUserInfo({
            userId: userInfo.userId,
            userType: userInfo.userType,
            templateType: userInfo.templateType,
            accessToken: useData.accessToken,
            accessExpiration: GetExpiration(useData.expiresIn),
          })
        );

        config.headers.Authorization = "Bearer " + useData.accessToken;
        return config;
      }

      config.headers.Authorization = "Bearer " + userInfo.accessToken;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
}
