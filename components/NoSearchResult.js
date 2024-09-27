import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function NoSearchResult() {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 24}]}>Hello, is anyone out there?</Text>
            <Image source={require('../assets/images/no-result.png')} style={styles.icon}></Image>
            <Text style={[styles.text, {fontSize: 12}]}>We can't find any causes matching your search. Try again!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 30, 
        marginBottom: 30
    },
    text: {
        color: 'gray'
    },
    container: {
        marginTop: 50,
        alignItems: 'center',
        marginLeft: 10
    }
})