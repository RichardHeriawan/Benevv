import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { PickImage, TakePhoto, GetPermissionAsync } from './ImageChooser'
import { HandleError, isClear } from './index'
import { Icon, ActionSheet } from 'native-base'
import produce from 'immer'
import MainStyles from '../constants/MainStyles'
import MainColors from '../constants/MainColors'
import PhotoChooseIcon from './PhotoChooseIcon'

/*
  * Image Previewer for the create event form.
  * Utilizes functions from the expo-image-picker library
*/

const primaryLevel = 10

const AppImagePreviewer = (props) => {
  const [state, setState] = useState({
    permission: true
  })

  useEffect(() => {
    GetPermissionAsync()
      .then((response) => {
        setState(
          produce((draftState) => {
            draftState.permission = response
          })
        )
      })
      .catch(HandleError)
  }, [])

  const OptionCheck = (buttonIndex) => {
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
    if (state.permission) {
      ActionSheet.show(
        {
          options: ['Camera', 'Upload', 'Cancel'],
          cancelButtonIndex: 2
        },
        (buttonIndex) => OptionCheck(buttonIndex)
      )
    }
  }
  return (
    <TouchableOpacity style={styles.imageContainer} onPress={OnClickImagePrompt}>
      <Image
        style={{ ...MainStyles.anchorAllSides }}
        source={{ uri: isClear(props.values[props.myName]) ? undefined : props.values[props.myName] }}
      />
      {isClear(props.values[props.myName]) &&
        <>
          <Icon
            style={styles.cameraButton}
            type='FontAwesome5'
            name='camera'
            onPress={OnClickImagePrompt}
            disabled={props.isSubmitting}
          />
          <Text style={styles.cameraButton}>Pick an image</Text>
        </>}
      {!isClear(props.values[props.myName]) && <PhotoChooseIcon />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: MainColors.disabledButton,
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    marginTop: primaryLevel,
    overflow: 'hidden',
    borderRadius: 16 // Using a big radius
  },
  cameraButton: {
    color: MainColors.cleanWhite
  }
})

export default AppImagePreviewer
