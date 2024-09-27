import { isDevelopment, mixpanelToken, mixpanelTokenDev } from '../../env.json'
import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics'

let token = "";
(isDevelopment == false) ? token = mixpanelToken : token = mixpanelTokenDev;
const analytics = new ExpoMixpanelAnalytics(token);

export async function trackAnalytics (trackName, trackData) {
    return await analytics.track(trackName, trackData);
  }