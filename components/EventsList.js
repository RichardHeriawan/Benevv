import EventCard from './EventCard'
import moment from 'moment'
import { View } from 'native-base'
import { isClear } from './index'
import React from 'react'
import HeadText from './HeadText'

export default ({ actualEvents, navigation, goToAlertsPage, hasMore, pageId,pageName }) => {
  if (isClear(actualEvents)) {
    return null
  }
  return (
    <View style={{ marginTop: 5 }}>
      {actualEvents.map(data =>
        <EventCard
          uri={!isClear(data.visuals[0]) ? data.visuals[0].image_url : null}
          title={data.activity_title}
          time={(moment.utc(data.start_date_time)).local().format('ddd, MMMM D YYYY [at] LT')}
          location={!isClear(data.places[0]) ? data.places[0].place_details : data.activity_url}
          navigation={navigation}
          actualEvents={actualEvents}
          id={data.id}
          key={data.id}
          pageId={pageId}
          pageName={pageName}
          goToAlertsPage={goToAlertsPage}
        />)}
      {hasMore &&
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <HeadText medium noMargin>...</HeadText>
        </View>}
    </View>
  )
}
