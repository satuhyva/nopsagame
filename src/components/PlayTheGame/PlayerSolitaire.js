import React from 'react'
import { View } from 'react-native'
import CardMode1 from './CardMode1'
import CardMode2 from './CardMode2'
import CardMode3 from './CardMode3'
import CardMode4 from './CardMode4'
import CardMode5 from './CardMode5'
import CardMode6 from './CardMode6'
import CardMode7 from './CardMode7'

const PlayerSolitaire = ({
    cards,
    cardModes,
    cardPositions,
    unitWidth,
    rightPackPosition,
    bufferLeft,
    handleMoveToLeftGamePack,
    handleDealtNewCards,
}) => {

    // console.log('cardModes', cardModes)

    return (
        <View>
            {cards.map((card, index) => {
                const mode = cardModes[index]
                const position = cardPositions[index]
                if (mode === 1) {
                    // card placed in right side stack, back upwards
                    // position is position of right side pack
                    return (
                        <CardMode1
                            key={index}
                            position={rightPackPosition}
                            unitWidth={unitWidth}
                        />
                    )
                } else if (mode === 2) {
                    // 2 = animated card, moves from right side stack to player solitaire, flips
                    // position is position at the end of animation
                    return (
                        <CardMode2
                            key={index}
                            index={index}
                            card={card}
                            position={position}
                            rightPackPosition={rightPackPosition}
                            unitWidth={unitWidth}
                        />
                    )
                } else if (mode === 3) {
                    // 3 = animated card, moves from right side stack to player solitaire, does not flip
                    // position is position at the end of animation
                    return (
                        <CardMode3
                            key={index}
                            index={index}
                            position={position}
                            rightPackPosition={rightPackPosition}
                            unitWidth={unitWidth}
                        />
                    )
                } else if (mode === 4) {
                    // 4 = animated card, moves from right side stack to either of middle stacks and flips
                    return (
                        <CardMode4
                            key={index}
                            index={index}
                            card={card}
                            position={rightPackPosition}
                            unitWidth={unitWidth}
                            handleDealtNewCards={handleDealtNewCards}
                        />
                    )
                } else if (mode === 5) {
                    // 5 = touchable and animated card, move to middle pack or empty position
                    return (
                        <CardMode5
                            key={index}
                            index={index}
                            card={card}
                            position={position}
                            rightPackPosition={rightPackPosition}
                            unitWidth={unitWidth}
                            bufferLeft={bufferLeft}
                            handleMoveToLeftGamePack={handleMoveToLeftGamePack}
                        />
                    )
                }  else if (mode === 6) {
                    // 6 = touchable and animated card, move to middle pack
                    return (
                        <CardMode6
                            key={index}
                            index={index}
                            card={card}
                            position={position}
                            rightPackPosition={rightPackPosition}
                            unitWidth={unitWidth}
                            bufferLeft={bufferLeft}
                            handleMoveToLeftGamePack={handleMoveToLeftGamePack}
                        />
                    )
                } else if (mode === 7) {
                    // 7 = solitaire card, back upwards, not touchable
                    return (
                        <CardMode7
                            key={index}
                            index={index}
                            card={card}
                            position={position}
                            rightPackPosition={rightPackPosition}
                            unitWidth={unitWidth}
                            bufferLeft={bufferLeft}
                            handleMoveToLeftGamePack={handleMoveToLeftGamePack}
                        />
                    )
                } else {
                    return null
                }
            })}
        </View>
    )
}

export default PlayerSolitaire

