import React, { useState, useImperativeHandle } from 'react'
import { Image, View, Text, TouchableOpacity, Animated } from 'react-native'
import CardBack from '../cardSides/CardBack'
import CardFront from '../cardSides/CardFront'

const ControlledPlayerCard = React.forwardRef((props, ref) => {

    const unitWidth = props.unitWidth
    const cardOrigo = props.cardOrigo
    const card = { suit: 2, value: 4 }
    const [isDisabled, setIsDisabled] = useState(true)

    const cardViewStyle = {
        position: 'absolute',
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }



    const actOnCard = (actions) => {
        console.log('actions', actions)
        if (actions === 'moveToRightGamePack') {
            const newTarget = { x : - 1.5 * unitWidth, y: 0 }
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(animatedMove, {
                    toValue: { x: newTarget.x , y: newTarget.y  }, duration: 1000,
                }),
            ]).start()
        }
        if (actions === 'moveToLeftGamePack') {
            const newTarget = { x : - 3.0 * unitWidth, y: 0 }
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(animatedMove, {
                    toValue: { x: newTarget.x , y: newTarget.y  }, duration: 1000,
                }),
            ]).start()
        }
        if (actions === 'flip') {
            Animated.sequence([
                Animated.timing(animatedFlipPart1, {
                    toValue: 90, tension: 10, friction: 10, duration: 300,
                }),
                Animated.timing(animatedFlipPart2, {
                    toValue: 180, tension: 10, friction: 10, duration: 300,
                }),
            ]).start()
        }
        if (actions === 'moveFurther') {
            const newTarget = { x : - 1.5 * unitWidth, y: -1 * 1.7 * unitWidth }
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(animatedMove2, {
                    toValue: { x: newTarget.x , y: newTarget.y  }, duration: 1000,
                }),
            ]).start()
            setTimeout(() => {
                setIsDisabled(false)
            }, 2000)
        }
    }

    useImperativeHandle(ref, () => {
        return { actOnCard }
    })

    let animatedMove =  new Animated.ValueXY()
    const animatedStyleMove = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y } ] }

    let animatedFlipPart1 = new Animated.Value(0)
    let animatedFlipPart2 = new Animated.Value(90)
    const interpolatedFlip1 = animatedFlipPart1.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const interpolatedFlip2 = animatedFlipPart2.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedStyleFlip1 = { transform: [ { rotateX: interpolatedFlip1 } ] }
    const animatedStyleFlip2 = { transform: [ { rotateX: interpolatedFlip2 } ] }
    const animatedCombined = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y }, { rotateX: interpolatedFlip1 } ] }
    let animatedMove2 =  new Animated.ValueXY()
    const animatedCombined2 = { transform: [ { translateX: animatedMove2.x }, { translateY: animatedMove2.y }, { rotateX: interpolatedFlip2 } ] }

    return (
        <TouchableOpacity disabled={isDisabled}>
            <Animated.View style={[cardViewStyle, { left: cardOrigo.x, top: cardOrigo.y }, animatedCombined]}>
                <CardBack/>
            </Animated.View>
            <Animated.View style={[cardViewStyle, { left: cardOrigo.x - 3 * unitWidth, top: cardOrigo.y }, animatedCombined2]}>
                <CardFront suit={card.suit} value={card.value}/>
            </Animated.View>
        </TouchableOpacity>
    )
})

export default ControlledPlayerCard

// <Animated.View style={[cardViewStyle, { left: cardOrigo.x, top: cardOrigo.y }, animatedStyleMove]}>
//     <CardBack/>
// </Animated.View>

