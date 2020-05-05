/* eslint-disable indent */
import React, { useState, useImperativeHandle } from 'react'
import {  View, TouchableOpacity, Animated, PanResponder } from 'react-native'
import CardBackB from '../cardSides/CardBackB'
import CardFront from '../cardSides/CardFront'


const PlayerCard = React.forwardRef((props, ref) => {

    const unitWidth = props.unitWidth

    const card = { suit: 2, value: 3 }
    const [location] = useState({ x: 0, y: 0 })
    // const [animatedMove, setAnimatedMove] = useState(new Animated.ValueXY())
    const [animatedMove] = useState(new Animated.ValueXY())
        const animatedMovingStyle = { transform: [ { translateX: animatedMove.x }, { translateY: animatedMove.y }] }


    let animatedFlipPart1 = new Animated.Value(0)
    const interpolatedFlip1 = animatedFlipPart1.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlip1Style = { transform: [  { rotateX: interpolatedFlip1 } ] }

    let animatedFlipPart2 = new Animated.Value(90)
    const interpolatedFlip2 = animatedFlipPart2.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedFlip2Style = { transform: [ { rotateX: interpolatedFlip2 } ] }


    const performAction = (newLocation) => {
        if (!(newLocation.x === -1)) {
            Animated.sequence([
                Animated.timing(animatedMove, {
                    toValue: { x: newLocation.x , y: newLocation.y  }, duration: 1000,
                }),
            ]).start()
        } else {
            Animated.sequence([
                Animated.timing(animatedFlipPart1, {
                    toValue: 90, tension: 10, friction: 10, duration: 1000,
                }),
                Animated.timing(animatedFlipPart2, {
                    toValue: 180, tension: 10, friction: 10, duration: 1000,
                }),
            ]).start()
            setTimeout(() => {
                setShowFront(true)
            }, 2000)
        }
    }

    useImperativeHandle(ref, () => {
        return { performAction }
    })


    // to enable dragging we need a new touchable with new animated location
    let animatedDraggable = new Animated.ValueXY()
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }

    const returnCardToOriginalPosition = () => {
        Animated.timing(animatedDraggable, {
            toValue: { x: 0, y: 0 }, duration: 500,
        }).start()
    }

    const moveCardAlongDrag = (dx, dy) => {
        Animated.timing(animatedDraggable, {
            toValue: { x: dx, y: dy }, duration: 0,
        }).start()
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            moveCardAlongDrag(gestureState.dx, gestureState.dy)
        },
        onPanResponderRelease: (evt, gestureState) => {
            returnCardToOriginalPosition()
        },
    })

    const cardViewStyle = {
        position: 'absolute',
        // width: unitWidth,
        // height: unitWidth * 1.7,
        // borderRadius: 7,
        // backgroundColor: 'papayawhip',
    }
    const style1 = {
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',

    }
    const style3 = {
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: '#B9CC3F',

    }
    const style2 = {
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
        top: -unitWidth * 1.7,
    }


    const [showFront, setShowFront] = useState(false)


    const CARD = () => {

        return (
            <TouchableOpacity  disabled={!showFront}>
                {showFront ?
                    // <View style={[style1]} >
                    //     <CardFront suit={card.suit} value={card.value}/>
                    // </View>
                        <Animated.View style={[style1, dragStyle]} {...panResponder.panHandlers} >
                            <CardFront suit={card.suit} value={card.value}/>
                        </Animated.View>
                :
                    <View>
                        <Animated.View style={[style3, animatedFlip1Style]}>
                            <CardBackB/>
                        </Animated.View>
                        <Animated.View style={[style2, animatedFlip2Style]} >
                            <CardFront suit={card.suit} value={card.value}/>
                        </Animated.View>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    return (
        // <Animated.View style={[cardViewStyle, { left: location.x, top: location.y }, animatedStyle]}>
        //     <CardBack/>
        // </Animated.View>
        // <TouchableOpacity disabled={true}>
        //     <Animated.View style={[cardViewStyle, { left: location.x, top: location.y }, animatedStyle]}>
        //         <CardBack/>
        //     </Animated.View>
        //     <Animated.View style={[cardViewStyle, { left: location.x, top: location.y }, animatedFlip2AndMove2]} >
        //         <CardFront suit={card.suit} value={card.value}/>
        //     </Animated.View>
        // </TouchableOpacity>
        <Animated.View style={[cardViewStyle, { left: location.x, top: location.y }, animatedMovingStyle]}>
            <CARD/>
        </Animated.View>
    )
})

export default PlayerCard


