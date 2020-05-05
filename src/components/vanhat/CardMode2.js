import React from 'react'
import { View, Animated } from 'react-native'
import CardBack from '../cardSides/CardBack'
import CardFront from '../cardSides/CardFront'

const CardMode2 = ({ index, card, position, rightPackPosition, unitWidth }) => {

    const cardViewStyle = {
        position: 'absolute',
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }

    let animatedMove =  new Animated.ValueXY()
    let animatedFlipPart1 = new Animated.Value(0)
    let animatedFlipPart2 = new Animated.Value(90)
    const interpolatedFlip1 = animatedFlipPart1.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const interpolatedFlip2 = animatedFlipPart2.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedStyleMoveAndFlip1 = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y }, { rotateX: interpolatedFlip1 } ] }
    const animatedStyleFlip2 = { transform: [ { rotateX: interpolatedFlip2 } ] }

    const animateCardMoveAndFlip = () => {
        Animated.sequence([
            Animated.delay(500 * index),
            Animated.timing(animatedMove, {
                toValue: { x: position.x - rightPackPosition.x, y: position.y - rightPackPosition.y }, duration: 1000,
            }),
            Animated.timing(animatedFlipPart1, {
                toValue: 90, tension: 10, friction: 10, duration: 300,
            }),
            Animated.timing(animatedFlipPart2, {
                toValue: 180, tension: 10, friction: 10, duration: 300,
            }),
        ]).start()
    }

    return (
        <View onLayout={animateCardMoveAndFlip}>
            <Animated.View style={[cardViewStyle, { left: rightPackPosition.x, top: rightPackPosition.y }, animatedStyleMoveAndFlip1]}>
                <CardBack/>
            </Animated.View>
            <Animated.View style={[cardViewStyle, { left: position.x, top: position.y }, animatedStyleFlip2]}>
                <CardFront suit={card.suit} value={card.value}/>
            </Animated.View>
        </View>
    )
}

export default CardMode2

