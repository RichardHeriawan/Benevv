/* global FormData */

import axios from 'axios'
import { imagesClientId } from '../env.json'
import { HandleError, ImageUrl } from './index'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { Alert } from 'react-native'

export const GetPermissionAsync = async () => {
  const camera = await Camera.requestPermissionsAsync()
  const roll = await ImagePicker.requestMediaLibraryPermissionsAsync() 
  if (roll.status !== 'granted' && camera.status !== 'granted') {
    Alert.alert('Sorry, we need camera roll permissions to make this work!')
  }
  return roll.status === 'granted' && camera.status === 'granted'
}

export const TakePhoto = async (props) => {
  props.setFieldValue(props.myName, undefined)
  const result = await ImagePicker.launchCameraAsync({
    exif: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true
  })
  if (!result.cancelled) {
    props.setFieldValue(props.myName, result.uri)
    UploadImage(props, result.base64)
  }
}

export const PickImage = async (props) => {
  props.setFieldValue(props.myName, undefined)
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true
  })
  if (!result.cancelled) {
    props.setFieldValue(props.myName, result.uri)
    UploadImage(props, result.base64)
  }
}

const UploadImage = (props, imageBase) => {
  const formData = new FormData()
  formData.append('image', imageBase)
  props.setSubmitting(true)

  // https://www.labnol.org/code/20526-javascript-image-uploader
  axios.post(ImageUrl, formData,
    { headers: { Authorization: 'Client-ID ' + imagesClientId } })
    .then((response) => {
      props.setFieldValue(props.myName, response.data.data.link)
    })
    .catch((error) => {
      props.setFieldValue(props.myName, undefined)
      HandleError(error)
    })
    .finally(() => props.setSubmitting(false))
}
