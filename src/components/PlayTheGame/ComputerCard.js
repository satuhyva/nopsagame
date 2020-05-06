import React, { useState, useImperativeHandle } from 'react'
import {  View, TouchableOpacity, Animated, PanResponder } from 'react-native'
import CardBackSimple from '../cardSides/CardBackSimple'
import CardFront from '../cardSides/CardFront'

const ComputerCard = React.forwardRef((props, ref) => {

    const isNull = props.isNull
    if (isNull) {
        return null
    }

    const unitWidth = props.unitWidth
    const unitHeight = 1.7 * unitWidth
    const card = props.card
    const index = props.index
    const origo = props.origo
    const bufferLeft = props.bufferLeft
    const topmostGamingRight = props.topmostGamingRight
    const [location, setLocation] = useState(props.origo)


    const [displayCardFront, setDisplayCardFront] = useState(false)

    // for animating card frame moving around:
    const [animatedMove, setAnimatedMove] = useState(new Animated.ValueXY())
    const animatedMoveStyle = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y }] }


    // for animating card flipping inside the moving frame:
    let animatedFlipPart1 = new Animated.Value(0)
    const interpolatedFlip1 = animatedFlipPart1.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlipPart1Style = { transform: [  { rotateX: interpolatedFlip1 } ] }
    let animatedFlipPart2 = new Animated.Value(90)
    const interpolatedFlip2 = animatedFlipPart2.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlipPart2Style = { transform: [ { rotateX: interpolatedFlip2 } ] }


    // for controlling card movement and flipping from a parent component:
    const performAction = (actions) => {

        if (actions.return) {
            Animated.sequence([
                Animated.timing(animatedMove, {
                    toValue: { x: actions.x -  origo.x, y: actions.y -  origo.y }, duration: 1000,
                }),
            ]).start()
            setTimeout(() => {
                setDisplayCardFront(true)
            }, 1600)
            return
        }
        if (actions.flip && !actions.move) {
            Animated.sequence([
                Animated.timing(animatedFlipPart1, {
                    toValue: 90, tension: 10, friction: 10, duration: 300,
                }),
                Animated.timing(animatedFlipPart2, {
                    toValue: 180, tension: 10, friction: 10, duration: 300,
                }),
            ]).start()
            setTimeout(() => {
                setDisplayCardFront(true)
            }, 1600)
            return
        }
        const delay = actions.delay ? 1 : 0
        if (actions.move && actions.flip) {
            Animated.sequence([
                Animated.delay(500 * index * delay),
                Animated.timing(animatedMove, {
                    toValue: { x: actions.x -  origo.x, y: actions.y -  origo.y }, duration: 1000,
                }),
                Animated.timing(animatedFlipPart1, {
                    toValue: 90, tension: 10, friction: 10, duration: 300,
                }),
                Animated.timing(animatedFlipPart2, {
                    toValue: 180, tension: 10, friction: 10, duration: 300,
                }),
            ]).start()
            setTimeout(() => {
                setDisplayCardFront(true)

            }, 1600 + 500 * index * delay)
        } else if (actions.move && actions.delay) {
            Animated.sequence([
                Animated.delay(500 * index),
                Animated.timing(animatedMove, {
                    toValue: { x: actions.x -  origo.x, y: actions.y  -  origo.y }, duration: 1000,
                }),
            ]).start()
        } else if (actions.move && !actions.delay) {
            Animated.sequence([
                Animated.timing(animatedMove, {
                    toValue: { x: actions.x -  origo.x, y: actions.y  -  origo.y }, duration: 1000,
                }),
            ]).start()
        }
    }

    useImperativeHandle(ref, () => {
        return { performAction }
    })


    const FlippableCard = () => {
        const cardStyle = {
            width: unitWidth,
            height: unitWidth * 1.7,
            borderRadius: 7,
        }
        const style1 = { ...cardStyle, backgroundColor: 'papayawhip' }
        const style2 = { ...style1, top: -unitWidth * 1.7 }
        const style3 = { ...cardStyle, backgroundColor: '#B9CC3F' }

        return (
            <TouchableOpacity  disabled={!displayCardFront}>
                {displayCardFront ?
                    <Animated.View style={[style1]}>
                        <CardFront suit={card.suit} value={card.value}/>
                    </Animated.View>
                    :
                    <View>
                        <Animated.View style={[style3, animatedFlipPart1Style]}>
                            <CardBackSimple/>
                        </Animated.View>
                        <Animated.View style={[style2, animatedFlipPart2Style]} >
                            <CardFront suit={card.suit} value={card.value}/>
                        </Animated.View>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    // this is the frame of the card that moves around
    return (
        <Animated.View style={[ { position: 'absolute', left: location.x, top: location.y }, animatedMoveStyle]}>
            <FlippableCard/>
        </Animated.View>
    )

})

export default ComputerCard

