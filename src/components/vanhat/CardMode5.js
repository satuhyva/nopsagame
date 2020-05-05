import React from 'react'
import { Animated, TouchableOpacity, PanResponder } from 'react-native'
import CardFront from '../cardSides/CardFront'
import { isOnLeftGameStack } from './gameRoundHelperFunctions.js'


// position is right hand side dealing pack position
const CardMode5 = ({ index, card, position, rightPackPosition, unitWidth, bufferLeft, handleMoveToLeftGamePack }) => {

    const cardViewStyle = {
        position: 'absolute',
        width: unitWidth,
        height: unitWidth * 1.7,
        borderRadius: 7,
        backgroundColor: 'papayawhip',
    }

    let cardPosition = new Animated.ValueXY()
    const animatedStyle = { transform: [ { translateX: cardPosition.x }, { translateY: cardPosition.y }] }

    const moveCardAlongDrag = (dx, dy) => {
        Animated.timing(cardPosition, {
            toValue: { x: dx, y: dy }, duration: 0,
        }).start()
    }

    const returnCardToOriginalPosition = () => {
        Animated.timing(cardPosition, {
            toValue: { x: 0, y: 0 }, duration: 500,
        }).start()
    }

    const moveCardToLeftGamePackPosition = () => {
        console.log('siirretään')
        Animated.timing(cardPosition, {
            toValue: { x: bufferLeft + 1.75 * unitWidth - position.x, y: 2.3 * 1.7 * unitWidth - position.y }, duration: 200,
        }).start()
        setTimeout(() => {
            handleMoveToLeftGamePack(index)
        }, 300)
    }

    const handleReleasedCard = (releaseX, releaseY) => {
        const releasedOnLeftStack = isOnLeftGameStack(releaseX, releaseY, unitWidth, bufferLeft)
        // const isSuitableValue = isAcceptableValue(valueLeft, card.value)

        if (releasedOnLeftStack) { // && isSuitableValue) {
            moveCardToLeftGamePackPosition()
        } else {
            returnCardToOriginalPosition()
            // const indexOfEmptyPositionReleasedOn = isOnEmptyPosition(releaseX, releaseY, empties, positionsTable, unitWidth, unitHeight)
            // console.log('indexOfEmptyPositionReleasedOn', indexOfEmptyPositionReleasedOn)
            // if (indexOfEmptyPositionReleasedOn !== -1) {
            //     moveCardToEmptySolitairePosition(indexOfEmptyPositionReleasedOn)
            // } else {
            //     returnCardToOriginalPosition()
            // }
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
            moveCardAlongDrag(gestureState.dx, gestureState.dy)
        },
        onPanResponderRelease: (evt, gestureState) => {
            handleReleasedCard(gestureState.moveX, gestureState.moveY)
        },
    })

    return (
        <TouchableOpacity>
            <Animated.View style={[cardViewStyle, { left: position.x, top: position.y }, animatedStyle]} {...panResponder.panHandlers}>
                <CardFront suit={card.suit} value={card.value}/>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default CardMode5

