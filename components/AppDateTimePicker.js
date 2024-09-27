import React, { memo, useState } from "react";
import { Button, Text, View } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import produce from "immer";
import moment from "moment";
import { AreFormEqual, isClear } from "./index";
import { StyleSheet, Platform } from "react-native";
import MainColors from "../constants/MainColors";
import AppValidation from "./AppValidation";
import MainStyles from "../constants/MainStyles";

const AppDateTimePicker = (props) => {
  const [state, setState] = useState({
    isDateVisible: false,
    isTimeVisible: false,
  });
  // Create a new date and time with 15 minutes added
  const time = new Date();
  time.setMinutes(time.getMinutes() + 15);

  const TransformValue = () => {
    return isClear(props.values[props.myName])
      ? moment.utc()
      : moment.utc(props.values[props.myName]);
  };

  const SetDateVisible = (isVisible) => {
    setState(
      produce((draftState) => {
        draftState.isDateVisible = isVisible;
      })
    );
  };
  const SetTimeVisible = (isVisible) => {
    setState(
      produce((draftState) => {
        draftState.isTimeVisible = isVisible;
      })
    );
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{props.label + " Date"}:</Text>
          <Button
            onPress={() => SetDateVisible(true)}
            transparent
            style={styles.button}
          >
            <Text style={{ color: MainColors.cleanBlack }}>
              {isClear(props.values[props.myName])
                ? "Date"
                : TransformValue().local().format("ddd, MMM D YYYY")}
            </Text>
          </Button>
          <DateTimePickerModal
            isVisible={state.isDateVisible}
            headerTextIOS={props.label}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            isDarkModeEnabled={true}
            date={TransformValue().toDate()}
            minimumDate={new Date()}
            value={new Date()}
            onConfirm={(actualDate) => {
              SetDateVisible(false);
              const dateText = actualDate.toISOString().substring(0, 10);
              props.setFieldValue(
                props.myName,
                dateText + TransformValue().toISOString().substring(10)
              );
            }}
            onCancel={() => SetDateVisible(false)}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{props.label + " Time"}:</Text>
          <Button
            onPress={() => SetTimeVisible(true)}
            transparent
            style={styles.button}
          >
            <Text style={{ color: MainColors.cleanBlack }}>
              {isClear(props.values[props.myName])
                ? "Time"
                : TransformValue().local().format("h:mm A")}
            </Text>
          </Button>
          <DateTimePickerModal
            isVisible={state.isTimeVisible}
            headerTextIOS={props.label}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            //isDarkModeEnabled={false}
            date={time}
            value={time}
            onConfirm={(actualTime) => {
              SetTimeVisible(false);
              const timeText = actualTime.toISOString().substring(10);
              props.setFieldValue(
                props.myName,
                TransformValue().toISOString().substring(0, 10) + timeText
              );
            }}
            onCancel={() => SetTimeVisible(false)}
          />
        </View>
      </View>
      <AppValidation {...props} myName={props.myName} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    ...MainStyles.appTextItem,
    height: 35,
  },
  label: {
    ...MainStyles.textLabel,
    fontSize: 12,
    marginLeft: 15,
  },
});

export default memo(AppDateTimePicker, AreFormEqual);
