import React from 'react'
import { Input, Item } from 'native-base'
import { isClear, SetFormMessage } from './index'
import NumberFormat from 'react-number-format'
import AppValidation from './AppValidation'
import MainColors from '../constants/MainColors'

export default class NumberAppInput extends React.Component {
  render () {
    const inputLabel = !isClear(this.props.label) ? this.props.label : SetFormMessage(this.props.myName)

    return (
      <>
        <Item style={{ borderBottomWidth: 1, borderBottomColor: MainColors.subTitle }}>
          <NumberFormat
            value={this.props.values[this.props.myName]}
            displayType='text'
            thousandSeparator
            prefix='$ '
            renderText={value => (
              <Input
                {...this.props}
                onChangeText={this.props.handleChange(this.props.myName)}
                disabled={this.props.isSubmitting}
                autoCapitalize='none' autoCompleteType='off' autoCorrect={false}
                value={value}
                maxLength={9}
                keyboardType='numeric'
                placeholder={inputLabel}
                onBlur={this.props.handleBlur(this.props.myName)}
              />
            )}
          />

        </Item>
        <AppValidation {...this.props} myName={this.props.myName} />
      </>)
  }
}
