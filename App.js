import React from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppStart from "./AppStart";
import * as Sentry from "sentry-expo";
import { SentryKey, isDevelopment, stripeKey } from "./env.json";
import GracefulFailure from "./navigation/GracefulFailure";
import { StripeProvider } from "@stripe/stripe-react-native";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";

const persistedStore = persistStore(store);

if (!isDevelopment) {
  Sentry.init({
    dsn: SentryKey, // Use a developer sentry project for filtering bugs
    enableInExpoDevelopment: false,
    debug: true,
  });
  console.reportErrorsAsExceptions = true;
}

i18next.init({
  compatibilityJSON: "v3",
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

export default () => (
  <GracefulFailure>
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <StripeProvider
          publishableKey={stripeKey}
          urlScheme="benev.io" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.smarttwigs.client.benevv" // required for Apple Pay
        >
          <I18nextProvider i18n={i18next}>
            <AppStart />
          </I18nextProvider>
        </StripeProvider>
      </PersistGate>
    </Provider>
  </GracefulFailure>
);
