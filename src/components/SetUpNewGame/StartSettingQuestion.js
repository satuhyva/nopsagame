import React from 'react'
import {  View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'



const StartSettingQuestion = ({ start, unitHeight }) => {

    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }
    const fadeOut = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 1000,
        }).start()
        setTimeout(() => {
            start()
        }, 1000)
    }

    return (

        <View>
            <Animated.View style={animatedVisibility}>
                <View style={styles.container}>
                    <Text style={[styles.questionText, { fontSize: unitHeight / 5 }]}>feel like playing?</Text>
                    <TouchableOpacity onPress={fadeOut} style={[styles.buttonView, { marginTop: unitHeight / 3 }]}>
                        <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>setup a new game</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
    },
    questionText: {
        color: '#B9CC3F',
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    buttonView: {
        backgroundColor: '#B9CC3F',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'green',
        fontFamily: 'Arial',
    },
})




export default StartSettingQuestion

