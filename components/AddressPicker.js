import { Picker } from "@react-native-picker/picker";
import React from "react";
import AppPicker from "./AppPicker";
import AppTextInput from "./AppTextInput";
import MapImage from "../views/SingleActivity/MapImage";
import { FormKeys } from "./index";
import { onlyUpdateForKeys } from "recompose";
import MainColors from "../constants/MainColors";

const AddressPicker = (formProps) => {
  return (
    <>
      <AppTextInput {...formProps} myName="City" />
      <AppTextInput {...formProps} myName="Details" label="Address" />
      <MapImage
        placeDetails={formProps.values.Details}
        placeCity={formProps.values.City}
      />
    </>
  );
};

export default onlyUpdateForKeys(FormKeys)(AddressPicker);
