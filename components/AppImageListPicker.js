import React, { memo, useEffect, useState } from 'react'
import { Text, Button, Icon, View, ActionSheet } from 'native-base'
import { Image, SectionList, StyleSheet, TouchableOpacity } from 'react-native'
import produce from 'immer'
import { AreFormEqual, HandleError, isClear } from './index'
import { GetPermissionAsync, PickImage, TakePhoto } from './ImageChooser'
import MainColors from '../constants/MainColors'
import MainLayout from '../constants/MainLayout'

const primaryLevel = 10
const itemMarginLevel = 5
const tileLevel = 160
const checkLevel = 65
const headerLevel = 20

const AppImageListPicker = (props) => {
  const defaultImages = [
    {
      title: '',
      data: [{ id: 1, title: '', isPicker: true, uri: '', isSelected: false }]
    },
    {
      title: 'Health',
      data: [
        {
          id: 2,
          title: 'Health',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1554734867-bf3c00a49371?fit=crop&w=700&q=80'
        },
        {
          id: 3,
          title: 'Health',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1588774210246-a1dc467758df?fit=crop&w=700&q=80'
        },
        {
          id: 4,
          title: 'Health',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?fit=crop&w=700&q=80'
        },
        {
          id: 5,
          title: 'Health',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?fit=crop&w=700&q=80'
        },
        {
          id: 6,
          title: 'Health',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1483721310020-03333e577078?fit=crop&w=700&q=80'
        }]
    },
    {
      title: 'Immigration',
      data: [
        {
          id: 7,
          title: 'Immigration',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?fit=crop&w=700&q=80'
        },
        {
          id: 8,
          title: 'Immigration',
          isPicker: false,
          isSelected: false,
          uri: 'https://images.unsplash.com/photo-1532617040019-3900939de424?fit=crop&w=700&q=80'
        }]
    }
  ]
  const [state, setState] = useState({ myImages: defaultImages, permission: true })

  useEffect(() => {
    if (!isClear(props.values[props.myName])) {
      setState(produce((draftState) => {
        // Selecting picker option
        draftState.myImages[0].data[0].isSelected = true
      }))
    }

    GetPermissionAsync()
      .then(response => {
        setState(produce((draftState) => {
          draftState.permission = response
        }))
      })
      .catch(HandleError)
  }, [])

  // TODO TouchableOpacity disable when  disabled={props.isSubmitting}
  return (
    <SectionList
      style={{ marginTop: primaryLevel }}
      horizontal
      sections={state.myImages}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) =>
        <MainItem {...props} itemIndex={index} itemValue={item} permission={state.permission} mySetState={setState} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={isClear(title) ? {} : { marginLeft: headerLevel }}>{title}</Text>
      )}
    />
  )
}

const MainItem = (props) => {
  if (props.itemValue.isPicker) {
    return <ImagePicker {...props} permission={props.permission} />
  } else {
    return <DefaultPicture {...props} />
  }
}

const ImagePicker = (props) => {
  const OptionCheck = (buttonIndex) => {
    props.mySetState(produce((draftState) => ItemSelector(draftState, props.itemValue.title, props.itemValue.id)))
    if (buttonIndex === 0) {
      TakePhoto(props)
        .then()
        .catch(HandleError)
    } else if (buttonIndex === 1) {
      PickImage(props)
        .then()
        .catch(HandleError)
    }
  }
  const OnClickImagePrompt = () => {
    if (props.permission) {
      ActionSheet.show({
        options: ['Camera', 'Upload', 'Cancel'],
        cancelButtonIndex: 2
      },
      (buttonIndex) => OptionCheck(buttonIndex))
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={OnClickImagePrompt}>
        <Image
          style={{
            ...styles.alignedPicture,
            ...(props.itemValue.isSelected ? styles.selectedPicture : {})
          }} source={{ uri: props.itemValue.isSelected ? props.values[props.myName] : undefined }}
        />
      </TouchableOpacity>
      <Button
        style={{ marginLeft: itemMarginLevel, marginRight: itemMarginLevel, marginTop: primaryLevel }}
        onPress={OnClickImagePrompt}
        disabled={props.isSubmitting}
      >
        <Text>{'Pick an image' + (props.itemValue.isSelected ? ' ✓' : '')}</Text>
      </Button>
    </View>)
}

const DefaultPicture = (props) => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center' }}
      onPress={() => {
        props.setFieldValue(props.myName, props.itemValue.uri)
        props.mySetState(produce((draftState) => ItemSelector(draftState, props.itemValue.title, props.itemValue.id)))
      }}
    >
      <Image
        style={{
          ...styles.alignedPicture,
          ...(props.itemValue.isSelected ? styles.selectedPicture : {})
        }}
        source={{ uri: props.itemValue.uri }}
      />
      <View style={{ justifyContent: 'center', height: checkLevel }}>
        <Icon
          type='FontAwesome5' name='check'
          style={{ color: props.itemValue.isSelected ? MainColors.primary : MainColors.fillBright }}
        />
      </View>
    </TouchableOpacity>)
}

const ItemSelector = (draftState, itemTitle, itemId) => {
  // Deselecting all options
  draftState.myImages.forEach(useItem => useItem.data.forEach(subItem => {
    subItem.isSelected = false
  }))

  // Selecting current option
  draftState.myImages.filter(useItem => useItem.title === itemTitle)[0]
    .data.filter(useItem => useItem.id === itemId)[0].isSelected = true
}

const styles = StyleSheet.create({
  // Check also link 2020060501
  alignedPicture: {
    backgroundColor: MainColors.fillBright,
    resizeMode: 'cover',
    borderRadius: MainLayout.tileRadius,
    width: tileLevel,
    height: tileLevel,
    marginLeft: itemMarginLevel,
    marginRight: itemMarginLevel
  },
  selectedPicture: {
    borderColor: MainColors.primary,
    borderWidth: 3
  }
})

export default memo(AppImageListPicker, AreFormEqual)
