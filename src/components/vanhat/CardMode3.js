import React from 'react'
import { View, Animated } from 'react-native'
import CardBack from '../cardSides/CardBack'

const CardMode3 = ({ index, position, rightPackPosition, unitWidth }) => {

    const cardViewStyle = {
        position: 'absolute',
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }

    let animatedMove =  new Animated.ValueXY()

    const animatedStyleMoveOnly = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y } ] }

    const animateCardMove = () => {
        Animated.sequence([
            Animated.delay(500 * index),
            Animated.timing(animatedMove, {
                toValue: { x: position.x - rightPackPosition.x, y: position.y - rightPackPosition.y }, duration: 1000,
            }),
        ]).start()
    }

    return (
        <View onLayout={animateCardMove}>
            <Animated.View style={[cardViewStyle, { left: rightPackPosition.x, top: rightPackPosition.y }, animatedStyleMoveOnly]}>
                <CardBack/>
            </Animated.View>
        </View>
    )
}

export default CardMode3

