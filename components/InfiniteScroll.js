// Never, never, never mix redux with this component
import React, { useEffect, useState } from 'react'
import { Text, View, Spinner } from 'native-base'
import produce from 'immer'
import { SectionList, RefreshControl } from 'react-native'
import { HandleError, isClear } from './index'
import moment from 'moment'
import MainColors from '../constants/MainColors'
import PageSkeleton from './PageSkeleton'
const primaryLevel = 10

export default ({ firstPageData, retrieveWithPage, enableRefresh, enableTitleDate, children, id }) => {
  const [state, setState] = useState({
    dataPage: 1,
    isLoading: true,
    loadingRank: 0,
    listItems: [],
    itemsTotal: 0,
    sumItems: 0,
    isRefreshing: false,
    id: id
  })

  const RetrieveMoreData = () => {
    if (state.loadingRank >= 2) {
      return
    }

    setState(produce((draftState) => {
      draftState.loadingRank = 1
    }))

    retrieveWithPage(state.dataPage, state.id)
      .then((response) => {
        const myData = response.data
        AddToList(myData)
      })
      .catch(HandleError)
  }

  useEffect(() => {
    if (isClear(firstPageData)) {
      RetrieveMoreData()
    } else {
      setState(produce((draftState) => {
        draftState.loadingRank = 1
      }))

      AddToList(firstPageData)
    }
  }, [])

  // Synchronize with isRefreshing state change
  useEffect(() => {
    if (state.isRefreshing) {
      RetrieveMoreData()
    }
  }, [state.isRefreshing])

  const AddToList = (myData) => {
    setState(produce((draftState) => {
      if (draftState.isLoading || draftState.isRefreshing) {
        draftState.itemsTotal = myData.total
        draftState.isLoading = false
      }

      draftState.sumItems += myData.sum
      // If all the models were retrieved
      if (draftState.sumItems >= draftState.itemsTotal) {
        draftState.loadingRank = 2
      } else {
        draftState.loadingRank = 0
      }
      if (draftState.isRefreshing) {
        draftState.listItems = [...myData.values]
      } else {
        draftState.listItems = [...state.listItems, ...myData.values]
      }
      draftState.isRefreshing = false
      draftState.dataPage++
    }))
  }

  // Resets state but keeps data until refresh
  const HandleRefresh = () => {
    setState(produce((draftState) => {
      draftState.isRefreshing = true
      draftState.dataPage = 1
      draftState.loadingRank = 0
      draftState.sumItems = 0
    }))
  }

  const SectionHeader = ({ section: { title } }) => {
    if (isClear(title)) return null
    return (
      <View style={{ padding: primaryLevel, backgroundColor: MainColors.selectedTag }}>
        <Text>{enableTitleDate ? moment.utc(title).format('ddd, MMM D') : title}</Text>
      </View>
    )
  }

  // https://reactnative.dev/docs/sectionlist#example
  // retrieveWithPage Api must return an object data:{ values: [{ title: title, data: arrayItems }], sum, total }
  return (
    <PageSkeleton isLoading={state.isLoading}>
      {!state.isLoading &&
        <SectionList
          refreshControl={enableRefresh ? <RefreshControl refreshing={state.isRefreshing} onRefresh={HandleRefresh} /> : undefined}
          sections={state.listItems}
          keyExtractor={(item, index) => index}
          onEndReached={RetrieveMoreData}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text style={{ margin: primaryLevel }}>Collaborate with Benev and the social changes will show up here.</Text>}
          ListFooterComponent={
            <View style={{ paddingBottom: primaryLevel * 2, alignItems: 'center' }}>
              {state.loadingRank === 2 ? null : <Spinner color={MainColors.primary} />}
            </View>
          }
          renderSectionHeader={SectionHeader}
          renderItem={({ item, index }) => children(item, index)}
          keyboardShouldPersistTaps="handled"
        />}
    </PageSkeleton>)
}
