import React, { useState, memo } from 'react'
import { Input, Item, Label, Text } from 'native-base'
import { AreFormEqual, isClear, SetFormMessage } from './index'
import AppValidation from './AppValidation'
import MainStyles from '../constants/MainStyles'

const AppTextInput = (props) => {
  const inputLabel = !isClear(props.label) ? props.label : SetFormMessage(props.myName)
  const isFloating = inputLabel.length < 50
  const bigSize = 16
  const smallSize = 12
  const [labelSize, setLabelSize] = useState(bigSize)

  // Check also link 2020110520
  return (
    <>
      <Item
        style={MainStyles.appTextItem}
        floatingLabel={isFloating}
        stackedLabel={!isFloating}
      >
        <Label style={[
          { fontSize: isFloating ? (!isClear(props.values[props.myName]) ? smallSize : labelSize) : smallSize },
          MainStyles.textLabel]}
        >
          {inputLabel}
          {props.isRequired && <Text style={MainStyles.errorMessage}> *</Text>}
        </Label>
        <Input
          {...props}
          disabled={props.isSubmitting ? true : props.isDisabled}
          autoCompleteType='off' value={props.values[props.myName]}
          onChangeText={props.handleChange(props.myName)}
          onBlur={() => {
            props.handleBlur(props.myName)
            if (isFloating && isClear(props.values[props.myName])) {
              setLabelSize(bigSize)
            }
          }}
          onFocus={() => {
            if (isFloating) {
              setLabelSize(smallSize)
            }
          }}
        />
      </Item>
      <AppValidation {...props} myName={props.myName} />
    </>)
}

// TODO put this to all parent-children on a Form
// https://github.com/jaredpalmer/formik/issues/342#issuecomment-489346081
// if onlyUpdateForKeys dont work, use shouldUpdate
// export default onlyUpdateForKeys(['ifValue', 'ifError'])(AppTextInput)      ifValue={formProps.values.Password} ifError={formProps.errors.Password}
export default memo(AppTextInput, AreFormEqual)
