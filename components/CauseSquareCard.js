// Q2020070309
import React from "react";
import { Text, View } from "native-base";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import MainStyles from "../constants/MainStyles";
import MainLayout from "../constants/MainLayout";
import MainColors from "../constants/MainColors";
import { trackAnalytics } from "../lib/analytics/Analytics";

const primaryLevel = 10;
const itemSizeLevel = 160;
const smallLevel = 145;

export default (props) => {
  const route = useRoute();
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.push("CauseSpecificPage", { causeId: props.causeId });
        // https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpaneltrack
        trackAnalytics("causeClick", {
          entityId: props.entityId,
          entityType: props.entityType,
          isRelatedToYou: props.isRelatedToYou,
          profileType: props.templateType,
          causeId: props.causeId,
          causeName: props.itemName,
          pageId: route.key,
          pageName: route.name,
        });
      }}
      style={{
        borderRadius: MainLayout.tileRadius,
        margin: MainLayout.tileMargin,
        overflow: "hidden",
      }}
    >
      <View style={MainStyles.anchorAllSides}>
        <ImageBackground
          style={MainStyles.backImage}
          source={{ uri: props.itemUrl }}
        />
      </View>
      <View
        style={{
          ...styles.causeOverlay,
          ...(props.isSmall
            ? { width: smallLevel, height: smallLevel }
            : { width: itemSizeLevel, height: itemSizeLevel }),
        }}
      >
        <Text style={styles.causeText}>{props.itemName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  causeOverlay: {
    justifyContent: "center",
    alignItems: "center",
    padding: primaryLevel,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  causeText: {
    color: MainColors.cleanWhite,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
