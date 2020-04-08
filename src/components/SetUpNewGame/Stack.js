import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import CardBack from '../cardSides/CardBack'

const Stack = ({ displayColor, number, selectStack, unitWidth }) => {

    const stackStyle = {
        width: unitWidth * 1.5,
        height: unitWidth * 1.7 * 1.3,
        borderRadius: 7 * 1.3, borderWidth: 1.3,
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <TouchableOpacity onPress={() => selectStack(number)}>
            <View style={[stackStyle, displayColor]}>
                <View style={{ width: unitWidth, height: unitWidth * 1.7, borderRadius: 7 }}>
                    <CardBack/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Stack

