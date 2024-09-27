/* global require */
import React, { useEffect, useState } from "react";
import { StyleProvider } from "native-base";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import NavigationTheme from "./constants/NavigationTheme";
import { StatusBar, LogBox } from "react-native";
import moment from "moment";
import Constants from "expo-constants";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import MainLogin from "./views/UserLogin/MainLogin";
import { HandleError } from "./components";
import { HiddenHeaderOption, MyScreenOption } from "./navigation/HeaderOptions";
import authActions from "./redux/actions/authActions";
import InputNavigator from "./navigation/InputNavigator";
import Sample02 from "./Sample02";
import RegisterPush from "./views/ChatMessage/RegisterPush";

// https://momentjs.com/docs/#/customization/relative-time/
moment.updateLocale("en", {
  calendar: {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastDay: "[Yesterday at] LT",
    nextWeek: "ddd, MMMM D YYYY [at] LT",
    lastWeek: "ddd, MMMM D YYYY [at] LT",
    sameElse: "ddd, MMMM D YYYY [at] LT",
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    w: "1w",
    ww: "%dw",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

const Stack = createStackNavigator();

const AppStart = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    if (Math.floor(Math.random() * 10) !== 0) {
      LogBox.ignoreLogs([
        "Animated:",
        "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in",
        "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android",
      ]);
    }

    const loadResourcesAndDataAsync = async () => {
      SplashScreen.preventAutoHideAsync();
      // Load fonts
      await Font.loadAsync({
        ...Ionicons.font,
        ...FontAwesome5.font,
        Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
        Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
      });
    };

    loadResourcesAndDataAsync()
      .then()
      .catch(HandleError)
      .finally(() => {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StyleProvider style={getTheme(platform)}>
        <NavigationContainer theme={NavigationTheme}>
          {Constants.platform.ios && <StatusBar barStyle="dark-content" />}

          {/* BNV-1632: Don't render homepage until causes have been chosen first time registering */}
          {(!props.isLoggedIn || props.isChoosingCauses) && (
            <Stack.Navigator screenOptions={HiddenHeaderOption}>
              <Stack.Screen name="MainLogin" component={MainLogin} />
              <Stack.Screen name="Sample02" component={Sample02} />
            </Stack.Navigator>
          )}
          {props.isLoggedIn && !props.isChoosingCauses && (
            <>
              {/* When logged-in, listening for notification events */}
              <RegisterPush />
              <Stack.Navigator screenOptions={HiddenHeaderOption}>
                <Stack.Screen
                  name="BottomTabNavigator"
                  component={BottomTabNavigator}
                />
                <Stack.Screen
                  name="InputNavigator"
                  component={InputNavigator}
                />
              </Stack.Navigator>
            </>
          )}
        </NavigationContainer>
      </StyleProvider>
    );
  }
};

const mapStateToProps = (state) => {
  // BNV-1632: To make sure that we have access to API (meaning we have been logged in/authenticated)
  //  but before going to home screen, added extra field isChoosingCauses that blocks navigation to
  //  homescreen allowing for the choosing causes page to be displayed the first time registering
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isChoosingCauses: state.authReducer.isChoosingCauses,
  };
};

export default connect(mapStateToProps, authActions)(AppStart);
