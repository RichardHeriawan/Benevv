// Q2020112301
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
import MainColors from "../constants/MainColors";
import MainLayout from "../constants/MainLayout";
import HeadText from "./HeadText";
import { trackAnalytics } from "../lib/analytics/Analytics";

export default (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.goToAlertsPage) {
          props.navigation.navigate("BottomTabNavigator", {
            routeName: "AlertsScreen",
          });
        } else props.navigation.push("ActivityDetail", { id: props.id });

        trackAnalytics("eventClick", {
          entityId: null,
          entityType: "Activity",
          eventId: props.id,
          isRelatedToYou: null,
          eventName: props.title,
          pageId: props.pageId,
          pageName: props.pageName,
        });
      }}
      style={{ marginTop: 5, marginBottom: 5 }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={{ uri: props.uri }}
          style={{
            backgroundColor: MainColors.fillBright,
            borderRadius: MainLayout.tileRadius,
            width: 150,
            height: 100,
          }}
        />
        <View style={{ flex: 1, padding: 10 }}>
          <Text ellipsizeMode="tail" numberOfLines={2}>
            {props.title}
          </Text>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={styles.subEventText}>{props.time}</Text>
            <Text style={styles.subEventText}>{props.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subEventText: {
    color: MainColors.subTitle,
    fontSize: 12,
  },
});
