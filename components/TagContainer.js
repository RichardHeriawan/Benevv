import React, { useState } from "react";
import TagElement from "./TagElement";
import { View, Icon } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import MainColors from "../constants/MainColors";
import MainLayout from "../constants/MainLayout";
import { trackAnalytics } from "../lib/analytics/Analytics";

export default ({
  entityId,
  entityType,
  templateType,
  isRelatedToYou,
  causesList,
  navigation,
  isOpened,
}) => {
  const [state, SetState] = useState({ isOpened: isOpened });
  const route = useRoute();

  const CauseNavigation = (id) =>
    navigation.push("CauseSpecificPage", { causeId: id });

  const MappedElements = (causesList) => {
    return causesList.map((cause) => {
      return (
        <TagElement
          key={cause.id}
          titleValue={cause.cause_name}
          onPress={() => {
            CauseNavigation(cause.id);
            trackAnalytics("causeClick", {
              entityId: entityId,
              entityType: entityType,
              profileType: templateType,
              isRelatedToYou: isRelatedToYou,
              causeId: cause.id,
              causeName: cause.cause_name,
              pageId: route.key,
              pageName: route.name,
            });
          }}
        />
      );
    });
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {MappedElements(causesList.slice(0, 2))}
      {state.isOpened && MappedElements(causesList.slice(2))}
      {causesList.slice(2).length > 0 && (
        <TouchableOpacity
          style={styles.touchExpand}
          onPress={() => {
            SetState({ isOpened: !state.isOpened });
          }}
        >
          <Icon
            type="FontAwesome5"
            style={styles.iconValue}
            name={state.isOpened ? "chevron-left" : "ellipsis-h"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconValue: {
    fontSize: MainLayout.iconMore,
  },
  touchExpand: {
    justifyContent: "center",
    margin: 3,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: MainColors.selectedTag,
  },
});
