import React from "react";
import { Text, View } from "native-base";
import MainColors from "../constants/MainColors";

export default ({ titleValue }) => (
  <View
    style={{
      display: "flex",
      justifyContent: "center",
      padding: 6,
      margin: 3,
      fontSize: 14,
      backgroundColor: MainColors.selectedTag,
      borderRadius: 4,
    }}
  >
    <Text style={{ fontSize: 14 }}>{titleValue}</Text>
  </View>
);
