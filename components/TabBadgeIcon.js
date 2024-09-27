import * as React from 'react'
import { Badge } from 'react-native-elements'
import TabBarIcon from './TabBarIcon'
import { connect } from 'react-redux'
import { View } from 'native-base'

const TabBadgeIcon = (props) =>
  <View>
    <TabBarIcon {...props} />
    {props.notificationCount > 0 &&
      <Badge status='error' containerStyle={{ position: 'absolute', top: -11, right: -14 }} value={props.notificationCount} />}
  </View>

const mapStateToProps = (state) => {
  return {
    notificationCount: state.authReducer.notificationCount
  }
}

export default connect(mapStateToProps)(TabBadgeIcon)
