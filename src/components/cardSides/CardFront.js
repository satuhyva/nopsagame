import React from 'react'
import { View, Text } from 'react-native'

const CardFront = ({ suit, value }) => {
    let color = 'black'
    let char = ''
    switch (suit) {
    case 2:
        char = '♥'
        color = 'red'
        break
    case 3:
        char = '♣'
        break
    case 4:
        char = '♦'
        color = 'red'
        break
    default:
        char = '♠'
        break
    }
    const cardText = value === 1 ? 'A' : value

    return (
        <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color, fontSize: 30 }}>{char}</Text>
            <Text style={{ color: color, fontSize: 30 }}>{cardText}</Text>
        </View>
    )
}


export default CardFront


