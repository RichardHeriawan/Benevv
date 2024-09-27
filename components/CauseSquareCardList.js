import CauseSquareCard from './CauseSquareCard'
import { isClear } from './index'
import React from 'react'

export default ({ entityId, entityType, templateType,isRelatedToYou, actualCauses, navigation }) => {
  if (isClear(actualCauses)) {
    return null
  }
  return actualCauses.map(cause =>
    <CauseSquareCard
      isSmall
      causeId={cause.id}
      entityId={entityId}
      entityType={entityType}
      templateType={templateType}
      isRelatedToYou={isRelatedToYou}
      key={cause.id}
      itemUrl={cause.cause_image}
      itemName={cause.cause_name}
      navigation={navigation}
    />)
}
