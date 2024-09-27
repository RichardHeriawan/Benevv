import {
  ActivityIndicator,
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as PaymentServiceApi from '../apis/PaymentServiceApi'
import * as UserServiceApi from '../apis/UserServiceApi'
import * as CampaignServiceApi from '../apis/CampaignServiceApi'
import * as DonorServiceApi from '../apis/DonorServiceApi'
import { useStripe } from '@stripe/stripe-react-native'
import store from '../redux/store'
import Progress from './Progress'
import { TextInputMask } from 'react-native-masked-text'
import * as WebBrowser from 'expo-web-browser'
import { webSiteUrl } from '../env.json'
import { Spinner } from 'native-base'
import MainColors from '../constants/MainColors'
import { HandleError } from '.'

function DonationButton (props) {
  // donation button needs a campaign short to work
  const { campaignShort, activityId } = props
  const [donationAmount, setDonationAmount] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [infoPost, setInfoPost] = useState({})
  const [infoUser, setInfoUser] = useState({});

  const userId = store.getState().authReducer.userInfo.userId

  
  useEffect(() => {
    CampaignServiceApi.getCampaignByCampaignShortPOST(
      { campaign_short: campaignShort }
    ).then(el => {
      setInfoPost(el);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.error(err);
    })

    UserServiceApi.getUserByUserId({ userId })
    .then(res => setInfoUser(res))
    .catch(err => console.error(err));
  }, [])

  const openPaymentSheet = async () => {
    props.donateAbilityChanger(true);
    const response = await PaymentServiceApi.createPaymentIntentPOST({
      stripeCustomerId: infoUser.stripe_customer_id,
      amount: donationAmount.replace(/\D/g,'')
    })

    WebBrowser.openBrowserAsync((`${webSiteUrl}donate?paymentIntent=${response.paymentIntent}&userId=${userId}&campaignShort=${campaignShort}&activityId=${activityId}&amount=${donationAmount.replace(/\D/g,'')}`))
    .then(() => {
      props.donateAbilityChanger(false);
    }
      
    )
    .catch(err => console.error(err));
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner style={{ flex: 1 }} color={MainColors.primary} />
      </View>
    )
  }

  return (
    <>
      {campaignShort && infoPost.total_raised ?
        <View>
          <Progress totalRaised={infoPost.total_raised} goal={infoPost.goal}/>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 7
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%' }}>
              <TextInputMask
                style={styles.textInput}
                type={'money'}
                placeholder={'Amount'}
                options={{
                  precision: 2,
                  separator: '.',
                  unit: '$',
                }}
                value={donationAmount}
                onChangeText={text => setDonationAmount(text)}
              />
            </View>
            <Pressable onPress={openPaymentSheet} style={({ pressed }) =>
              [styles.donateButton, { opacity: pressed ? 0.8 : 1, }, { opacity: props.donateAbility ? 0.3 : 1, }]} disabled={props.donateAbility}>
                <Text style={styles.donateText}> Donate </Text>
            </Pressable>
          </View>
        </View>
        :
        <></>
      }
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderColor: '#8692A6',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  donateButton: {
    marginLeft: 20,
    backgroundColor: '#FF2D55',
    width: '30%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  donateText: {
    color: 'white',
    padding: 10,
    fontSize: 16
  }
})

export default DonationButton
