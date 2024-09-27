import { ScrollView } from "react-native";
import React from "react";

export default ({ children }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{
      marginLeft: -10,
      marginRight: -10,
      paddingLeft: 5,
      paddingRight: 5,
    }}
  >
    {children}
  </ScrollView>
);
