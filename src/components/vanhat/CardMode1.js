import React from 'react'
import { View } from 'react-native'
import CardBack from '../cardSides/CardBack'

const CardMode1 = ({ position, unitWidth }) => {

    const cardViewStyle = { position: 'absolute',
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }


    return (
        <View style={[cardViewStyle, { left: position.x, top: position.y }]}>
            <CardBack/>
        </View>
    )
}

export default CardMode1

