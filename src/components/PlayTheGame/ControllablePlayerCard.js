import React, { useState, useImperativeHandle } from 'react'
import {  View, TouchableOpacity, Animated, PanResponder } from 'react-native'
import CardBack from '../cardSides/CardBack'
import CardFront from '../cardSides/CardFront'
import  { getPlayerCardPositionAfterFlip } from './gameRoundHelperFunctions.js'

const ControllablePlayerCard = React.forwardRef((props, ref) => {

    const unitWidth = props.unitWidth
    const cardOrigo = props.cardOrigo
    const card = props.card
    const bufferLeft = props.bufferLeft
    const cardIndex = props.index
    const removed = props.removed
    // console.log('cardIndex', cardIndex, 'removed', removed)
    const positionAfterFlip = getPlayerCardPositionAfterFlip(cardIndex, unitWidth, bufferLeft)
    // console.log(cardIndex, positionAfterFlip)

    const [isDisabled, setIsDisabled] = useState(true)
    const [isDraggable, setIsDraggable] = useState(false)
    const [cumulativeLocation, setCumulativeLocation] = useState({ x: 0, y: 0 })

    const cardViewStyle = {
        position: 'absolute',
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }

    // movement to first destination and first half of flip (back of the card view)
    let animatedMove1 =  new Animated.ValueXY()
    let animatedFlipPart1 = new Animated.Value(0)
    const interpolatedFlip1 = animatedFlipPart1.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    const animatedMove1AndFlip1 = { transform: [ { translateX: animatedMove1.x }, { translateY: animatedMove1.y }, { rotateX: interpolatedFlip1 } ] }

    // second half of flip and possible further movement (front of the card view)
    let animatedFlipPart2 = new Animated.Value(90)
    const interpolatedFlip2 = animatedFlipPart2.interpolate({
        inputRange: [0, 180], outputRange: ['180deg', '360deg'],
    })
    let animatedMove2 =  new Animated.ValueXY()
    const animatedFlip2AndMove2 = { transform: [ { translateX: animatedMove2.x }, { translateY: animatedMove2.y }, { rotateX: interpolatedFlip2 } ] }

    // to enable dragging we need a new touchable with new animated location
    let animatedDraggable = new Animated.ValueXY()
    const dragStyle = { transform: [ { translateX: animatedDraggable.x }, { translateY: animatedDraggable.y }] }

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
            // handleReleasedCard(gestureState.moveX, gestureState.moveY)
        },
    })


    const performCardAction = (action) => {

        if (action === 'moveToSolitaireAndFlip') {
            const newTarget = positionAfterFlip
            Animated.sequence([
                Animated.delay(500 * cardIndex),
                Animated.timing(animatedMove1, {
                    toValue: { x: newTarget.x - cardOrigo.x, y: newTarget.y - cardOrigo.y  }, duration: 1000,
                }),
                Animated.timing(animatedFlipPart1, {
                    toValue: 90, tension: 10, friction: 10, duration: 300,
                }),
                Animated.timing(animatedFlipPart2, {
                    toValue: 180, tension: 10, friction: 10, duration: 300,
                }),
            ]).start()
            setTimeout(() => {
                setIsDraggable(true)
                setCumulativeLocation({  x: newTarget.x - cardOrigo.x, y: newTarget.y - cardOrigo.y  })
            }, (15 * 500 + 2000))
        } else if (action === 'moveToSolitaire') {
            const newTarget = positionAfterFlip
            Animated.sequence([
                Animated.delay(500 * cardIndex),
                Animated.timing(animatedMove1, {
                    toValue: { x: newTarget.x - cardOrigo.x, y: newTarget.y - cardOrigo.y  }, duration: 1000,
                }),
            ]).start()
        } else if (action === 'moveToRightGamePackAndFlip') {
            const newTarget = positionAfterFlip
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(animatedMove1, {
                    toValue: { x: newTarget.x - cardOrigo.x, y: newTarget.y - cardOrigo.y  }, duration: 1000,
                }),
                Animated.timing(animatedFlipPart1, {
                    toValue: 90, tension: 10, friction: 10, duration: 300,
                }),
                Animated.timing(animatedFlipPart2, {
                    toValue: 180, tension: 10, friction: 10, duration: 300,
                }),
            ]).start()
        }
    }


    useImperativeHandle(ref, () => {
        return { performCardAction }
    })
    if (removed) {
        return null
    } else if (!isDraggable) {
        return (
            <TouchableOpacity disabled={isDisabled}>
                <Animated.View style={[cardViewStyle, { left: cardOrigo.x, top: cardOrigo.y }, animatedMove1AndFlip1]}>
                    <CardBack/>
                </Animated.View>
                <Animated.View style={[cardViewStyle, { left: positionAfterFlip.x, top: positionAfterFlip.y }, animatedFlip2AndMove2]} >
                    <CardFront suit={card.suit} value={card.value}/>
                </Animated.View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity>
                <Animated.View style={[cardViewStyle, { left: positionAfterFlip.x, top: positionAfterFlip.y }, dragStyle]} {...panResponder.panHandlers} >
                    <CardFront suit={card.suit} value={card.value}/>
                </Animated.View>
            </TouchableOpacity>
        )
    }

})

export default ControllablePlayerCard



