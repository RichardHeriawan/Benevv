import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { View, Text } from 'native-base'
import TimeSince from './useTimeSince';

const Comment = ({username, pic, children, timestamp}) => {
    //Need to calculate this given the timestamp
    let time = TimeSince(timestamp); 
    //I need the Username, pic, Body, Timestamp
    return(
        <View style={styles.wrapper}>
            <Image source={{uri: pic}}
                   style={styles.pic} 
            />
            <View style={styles.content}>
                <Text style={styles.body}>
                    <Text style={styles.username}>{username + "  "}</Text>
                    {children}
                </Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: { 
        flexDirection: "row", 
    },
    content: { 
        marginTop: 15, 
        width: 0, 
        flexGrow: 1, 
    },
    username: { 
        fontWeight: "bold", 
        fontSize: 14.7
    },
    pic: { 
        borderRadius: 50, 
        width: 50, 
        height: 50, 
        margin: 10
    }, 
    body: { 
        fontSize: 14.7, 
    },
    time: { 
        marginTop: 10,
        fontSize: 12, 
        color:"#979797"
    }
})

export default Comment