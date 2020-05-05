import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import GamingStacks from './GamingStacks'
import PlayerCardControlled from './PlayerCardControlled'
import { getPlayerCardActionsInDealing, getCardStartNullStates, getCardBelow } from './helperFunctions.js'



// Gameboard area heights shall be the following (* unitHeight):
//      0.5 header area
//      1.5 computer solitaire area
//      0.8 spacing
//      1.0 playing packs
//      0.8 spacing
//      1.5 player solitaire
//      0.5 info area



const Gameboard = (props) => {

    // console.log('props', props)
    const unitWidth = props.game.unitWidth
    const unitHeight = unitWidth * 1.7
    const bufferLeft = props.game.bufferLeft
    const playerStack = props.game.playerStack
    // const computerStack = props.game.computerStack
    // const speed = props.game.speed
    // const skill = props.game.skill

    // stacks in the middle (to which cards will be placed during the game) are gaming stacks
    //  values of only the topmost cards of the two stacks in the middle are relevant
    const [topmostGamingLeft, setTopmostGamingLeft] = useState('')
    const [topmostGamingRight, setTopmostGamingRight] = useState('')
    const [dealingCount, setDealingCount] = useState(0)
    const [cardNull, setCardNull] = useState(getCardStartNullStates(playerStack.length))
    // const [disabled, setDisabled] = useState(getCardDisbaledStates(playerStack.length))

    const rightDealingPackLocation = { x: (0.25 + 1 + 0.5 + 1 + 0.5 + 1 + 0.5) * unitWidth, y: (1.5 + 0.8) * unitHeight }
    const rightGamingPackLocation = { x: (0.25 + 1 + 0.5 + 1 + 0.5) * unitWidth, y: (1.5 + 0.8) * unitHeight }

    // const cardReferences = playerStack.map(card => React.createRef())
    const [cardReferences] = useState(playerStack.map(card => React.createRef()))

    const dealSolitaires = () => {
        // console.log(cardReferences)
        const dealingActions = getPlayerCardActionsInDealing(playerStack.length, unitWidth, bufferLeft)
        const numberOfActions =  playerStack.length > 15 ? 15 : playerStack.length
        for (let i = 0; i < numberOfActions; i++) {
            cardReferences[i].current.performAction(dealingActions[i])
        }
    }
    const dealSingleCards = () => {
        const nextIndexToDeal = 15 + dealingCount
        if (playerStack.length > nextIndexToDeal) {
            cardReferences[nextIndexToDeal].current.performAction({ ...rightGamingPackLocation, move: true, flip: true, delay: false })
        }
        setTimeout(() => {
            setDealingCount(dealingCount + 1)
            setTopmostGamingRight(playerStack[nextIndexToDeal])
            const updatedNullStates = [ ...cardNull]
            updatedNullStates[nextIndexToDeal] = true
            setCardNull(updatedNullStates)
        }, 1600)
    }

    const updateRightGamingPack = (playerCardIndex) => {
        setTopmostGamingRight(playerStack[playerCardIndex])
        const updatedNullStates = [ ...cardNull]
        updatedNullStates[playerCardIndex] = true
        setCardNull(updatedNullStates)
        const indexOfCardBelow = getCardBelow(playerCardIndex)
        if (indexOfCardBelow !== -1) {
            cardReferences[indexOfCardBelow].current.performAction({ move: false, flip: true })
        }
    }

    const displayPlayerCards = () => {
        return playerStack.map((card, index) => {
            return (
                <PlayerCardControlled
                    key={index}
                    index={index}
                    unitWidth={unitWidth}
                    origo={rightDealingPackLocation}
                    ref={cardReferences[index]}
                    card={card}
                    bufferLeft={bufferLeft}
                    isNull={cardNull[index]}
                    topmostGamingRight={topmostGamingRight}
                    updateRightGamingPack={updateRightGamingPack}
                />
            )
        })
    }

    return (
        <View>
            <View style={{ position: 'absolute', left: bufferLeft + 1.75 * unitWidth, top: 2.3 * 1.7 * unitWidth, width: 2.5 * unitWidth, height: unitHeight }}>
                <GamingStacks
                    topmostLeft={topmostGamingLeft}
                    topmostRight={topmostGamingRight}
                    unitWidth={unitWidth}
                />
            </View>
            {displayPlayerCards()}
            <View style={{ flexDirection: 'row' }}>
                <View style={[ styles.buttonContainer, { position: 'absolute', top: (1.5 + 0.8 + 1 + 0.8 + 1.5) * unitHeight }]}>
                    <TouchableOpacity onPress={dealSolitaires} style={[styles.buttonView]}>
                        <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>1</Text>
                    </TouchableOpacity>
                </View>
                <View style={[ styles.buttonContainer, { position: 'absolute', left: 75, top: (1.5 + 0.8 + 1 + 0.8 + 1.5) * unitHeight }]}>
                    <TouchableOpacity onPress={dealSingleCards} style={[styles.buttonView]}>
                        <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>2</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {

}

const ConnectedGameboard = connect(mapStateToProps, mapDispatchToProps)(Gameboard)


export default ConnectedGameboard


const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
    },
    buttonView: {
        backgroundColor: '#B9CC3F',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'green',
        fontFamily: 'Arial',
    },
})







//************************
// import React, { useState } from 'react'
// import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { getSolitaireDealingActionsForPlayerCards, getRemovedStates,  getPlayerCardStartModes, getPlayerCardDealingModes, getPlayerCardDealingPositions, getPlayerCardsStartToPlayModes } from './gameRoundHelperFunctions.js'
// // import GamePacks from './GamePacks'
// import ControllablePlayerCard from './ControllablePlayerCard'
// import GamingStacks from './GamingStacks'
// import PlayerCard from './PlayerCard'



// // Gameboard area heights shall be the following (* unitHeight):
// //      0.5 header area
// //      1.5 computer solitaire area
// //      0.8 spacing
// //      1.0 playing packs
// //      0.8 spacing
// //      1.5 player solitaire
// //      0.5 info area



// const Gameboard = (props) => {

//     // console.log('props', props)
//     const unitWidth = props.game.unitWidth
//     const unitHeight = unitWidth * 1.7
//     // take into account that there might be extra filling space on the left
//     const bufferLeft = props.game.bufferLeft

//     // stacks in the middle (to which cards will be placed during the game) are gaming stacks
//     //  values of only the topmost cards of the two stacks in the middle are relevant
//     const [topmostGamingLeft, setTopmostGamingLeft] = useState('')
//     const [topmostGamingRight, setTopmostGamingRight] = useState('')

//     const playerStack = props.game.playerStack
//     const playerCardCount = playerStack.length
//     const computerStack = props.game.computerStack
//     const computerCardCount = computerStack.length
//     const [playerCardRemoved, setPlayerCardRemoved] = useState(getRemovedStates(playerCardCount))
//     const [indexOfDealing, setIndexOfDealing] = useState(15)

//     let playerCardReferences = []
//     for (let i = 0; i < playerCardCount; i++) {
//         const newRef = React.createRef()
//         playerCardReferences.push(newRef)
//     }
//     const rightPackPosition = { x: bufferLeft + 4.75 * unitWidth, y: (1.5 + 0.8) * 1.7 * unitWidth }


//     const dealSolitaireCards = () => {
//         const actions = getSolitaireDealingActionsForPlayerCards(playerStack)
//         for (let i = 0; i < playerCardCount; i++) {
//             const action = actions[i]
//             if (action !== '') {
//                 playerCardReferences[i].current.performCardAction(action)
//             }
//         }
//     }

//     const dealNewCards = () => {

//         // case: both dealing stacks contain at least one more card to be dealt
//         if (computerCardCount - 1 > indexOfDealing && playerCardCount - 1 > indexOfDealing) {
//             playerCardReferences[indexOfDealing].current.performCardAction('moveToRightGamePackAndFlip')
//             setTimeout(() => {
//                 // setTopmostGamingRight(playerStack[indexOfDealing])
//                 let updatedRemovalStates = playerCardRemoved.map((status, index) => {
//                     if (index === indexOfDealing) {
//                         return true
//                     } else {
//                         return status
//                     }
//                 })
//                 console.log('updatedRemovalStates', updatedRemovalStates)
//                 // setPlayerCardRemoved(updatedRemovalStates)
//                 // setIndexOfDealing(indexOfDealing + 1)
//             }, 3000)
//         }
//     }


//     // const [playerCardModes, setPlayerCardModes] = useState(getPlayerCardStartModes(props.game.playerStack))
//     // const [playerCardPositions, setPlayerCardPositions] = useState(getPlayerCardDealingPositions(props.game.playerStack, unitWidth, bufferLeft))

//     // // monettako korttia ollaan jakamassa pinosta?
//     // const [topmostToDeal, setTopmostToDeal] = useState(props.game.playerStack.length > 15 ? 15 : -1)

//     // // korttipakat, joihin pelataan; päälimmäinen, näkyvä kortti vasemmalla ja oikealla
//     // const [topmostLeft, setTopmostLeft] = useState('')
//     // const [topmostRight, setTopmostRight] = useState('')

//     // const visibility = new Animated.Value(1)
//     // const animatedVisibility = { opacity: visibility }
//     // const dealCards = () => {
//     //     Animated.timing(visibility, {
//     //         toValue: 0, duration: 500,
//     //     }).start()
//     //     const playerCardDealingModes = getPlayerCardDealingModes(props.game.playerStack)
//     //     setTimeout(() => {
//     //         setPlayerCardModes(playerCardDealingModes)
//     //     },1100)
//     //     setTimeout(() => {
//     //         const updatedModes = getPlayerCardsStartToPlayModes(playerCardDealingModes)
//     //         setPlayerCardModes(updatedModes)
//     //     }, 13000)
//     // }



//     // const handleDealtNewCards = () => {

//     //     // mikä on seuraava kortti, joka pinosta jaetaan? topmostToDeal
//     //     const updatedRight = props.game.playerStack.length > topmostToDeal ?
//     //         { suit: props.game.playerStack[topmostToDeal].suit, value: props.game.playerStack[topmostToDeal].value }
//     //         :
//     //         ''
//     //     const updatedLeft = props.game.computerStack.length > topmostToDeal ?
//     //         { suit: props.game.computerStack[topmostToDeal].suit, value: props.game.computerStack[topmostToDeal].value }
//     //         :
//     //         ''
//     //     const updatedModes = playerCardModes.map((current, index) => {
//     //         if (index === topmostToDeal) {
//     //             return 0
//     //         } else {
//     //             return current
//     //         }
//     //     })
//     //     setTopmostLeft(updatedLeft)
//     //     setTopmostRight(updatedRight)
//     //     setTopmostToDeal(topmostToDeal + 1)
//     //     setPlayerCardModes(updatedModes)
//     // }


//     // const controlCard = () => {
//     //     setTimeout(() => {
//     //         referenceCard.current.actOnCard('moveToRightGamePack')
//     //     }, 0)
//     //     setTimeout(() => {
//     //         referenceCard.current.actOnCard('moveToLeftGamePack')
//     //     }, 1500)
//     //     setTimeout(() => {
//     //         referenceCard.current.actOnCard('flip')
//     //     }, 3000)
//     //     setTimeout(() => {
//     //         referenceCard.current.actOnCard('moveFurther')
//     //     }, 4500)
//     // }
//     // const referenceCard = React.createRef()

//     const PlayerCards = () => {
//         return playerStack.map((card, index) => {
//             return (
//                 <ControllablePlayerCard
//                     key={index}
//                     card={card}
//                     index={index}
//                     ref={playerCardReferences[index]}
//                     cardOrigo={rightPackPosition}
//                     unitWidth={unitWidth}
//                     bufferLeft={bufferLeft}
//                     removed={playerCardRemoved[index]}
//                 />
//             )
//         })
//     }



//     const [actionsCount, setActionsCount] = useState(0)
//     const refC = React.createRef()

//     const actOnCard1 = () => {

//         refC.current.performAction({ x:150 , y:100 })
//         setTimeout(() => {
//             setActionsCount(actionsCount + 1)

//         }, 2000)
//     }
//     const actOnCard2 = () => {

//         refC.current.performAction({ x:100 , y:200 })
//         setTimeout(() => {
//             setActionsCount(actionsCount + 1)
//         }, 2000)
//     }
//     const actOnCard3 = () => {

//         refC.current.performAction({ x:300 , y:300 })
//         setTimeout(() => {
//             setActionsCount(actionsCount + 1)
//         }, 2000)
//     }
//     const actOnCard4 = () => {

//         refC.current.performAction({ x:50 , y:400 })
//         setTimeout(() => {
//             setActionsCount(actionsCount + 1)
//         }, 2000)
//     }
//     const flipIt = () => {

//         refC.current.performAction({ x: -1, y: -1 })
//         setTimeout(() => {
//             setActionsCount(actionsCount + 1)
//         }, 2000)
//     }

//     return (
//         <View>

//             <Text>tilaa muutettu {actionsCount} kertaa</Text>
//             {/* <View style={{ position: 'absolute', left: bufferLeft + 1.75 * unitWidth, top: 2.3 * 1.7 * unitWidth, width: 2.5 * unitWidth, height: unitHeight }}>
//                 <GamingStacks
//                     topmostLeft={topmostGamingLeft}
//                     topmostRight={topmostGamingRight}
//                     unitWidth={unitWidth}
//                 />
//             </View> */}
//             {/* <PlayerCards/> */}
//             <View style={{ position: 'absolute', top: 100, left: 150, width: unitWidth, height: unitHeight, backgroundColor: 'powderblue' }}><Text>1</Text></View>
//             <View style={{ position: 'absolute', top: 200, left: 100, width: unitWidth, height: unitHeight, backgroundColor: 'rosybrown' }}><Text>2</Text></View>
//             <View style={{ position: 'absolute', top: 300, left: 300, width: unitWidth, height: unitHeight, backgroundColor: 'powderblue' }}><Text>3</Text></View>
//             <View style={{ position: 'absolute', top: 400, left: 50, width: unitWidth, height: unitHeight, backgroundColor: 'papayawhip' }}><Text>4</Text></View>
//             <PlayerCard
//                 cardOrigo={rightPackPosition}
//                 unitWidth={unitWidth}
//                 ref={refC}
//             />
//             <View style={{ flexDirection: 'row' }}>
//                 <View style={[ styles.buttonContainer, { position: 'absolute', top: (1.5 ) * unitHeight }]}>
//                     <TouchableOpacity onPress={actOnCard1} style={[styles.buttonView]}>
//                         <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>1</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={[ styles.buttonContainer, { position: 'absolute', left: 75, top: (1.5 ) * unitHeight }]}>
//                     <TouchableOpacity onPress={actOnCard2} style={[styles.buttonView]}>
//                         <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>2</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={[ styles.buttonContainer, { position: 'absolute', left: 150, top: (1.5 ) * unitHeight }]}>
//                     <TouchableOpacity onPress={actOnCard3} style={[styles.buttonView]}>
//                         <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>3</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={[ styles.buttonContainer, { position: 'absolute', left: 200, top: (1.5 ) * unitHeight }]}>
//                     <TouchableOpacity onPress={actOnCard4} style={[styles.buttonView]}>
//                         <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>4</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={[ styles.buttonContainer, { position: 'absolute', left: 275, top: (1.5 ) * unitHeight }]}>
//                     <TouchableOpacity onPress={flipIt} style={[styles.buttonView]}>
//                         <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>flipIt</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>




//         </View>
//     )
// }

// const mapStateToProps = state => {
//     return {
//         game: state.game,
//     }
// }

// const mapDispatchToProps = {

// }

// const ConnectedGameboard = connect(mapStateToProps, mapDispatchToProps)(Gameboard)


// export default ConnectedGameboard


// const styles = StyleSheet.create({
//     buttonContainer: {
//         alignItems: 'center',
//     },
//     buttonView: {
//         backgroundColor: '#B9CC3F',
//         padding: 10,
//         borderRadius: 8,
//     },
//     buttonText: {
//         color: 'green',
//         fontFamily: 'Arial',
//     },
// })





/*
    // console.log('props', props)
    const unitWidth = props.game.unitWidth
    const unitHeight = unitWidth * 1.7
    const bufferLeft = props.game.bufferLeft
    const rightPackPosition = { x: bufferLeft + 4.75 * unitWidth, y: (1.5 + 0.8) * 1.7 * unitWidth }

    const [playerCardModes, setPlayerCardModes] = useState(getPlayerCardStartModes(props.game.playerStack))
    const [playerCardPositions, setPlayerCardPositions] = useState(getPlayerCardDealingPositions(props.game.playerStack, unitWidth, bufferLeft))

    // monettako korttia ollaan jakamassa pinosta?
    const [topmostToDeal, setTopmostToDeal] = useState(props.game.playerStack.length > 15 ? 15 : -1)

    // korttipakat, joihin pelataan; päälimmäinen, näkyvä kortti vasemmalla ja oikealla
    const [topmostLeft, setTopmostLeft] = useState('')
    const [topmostRight, setTopmostRight] = useState('')

    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }
    const dealCards = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 500,
        }).start()
        const playerCardDealingModes = getPlayerCardDealingModes(props.game.playerStack)
        setTimeout(() => {
            setPlayerCardModes(playerCardDealingModes)
        },1100)
        setTimeout(() => {
            const updatedModes = getPlayerCardsStartToPlayModes(playerCardDealingModes)
            setPlayerCardModes(updatedModes)
        }, 13000)
    }

    const handleMoveToLeftGamePack = (cardIndex) => {

    }

    const continuePlaying = () => {
        if (topmostToDeal !== -1) {
            const updatedModes = playerCardModes.map((current, index) => {
                if (index === topmostToDeal) {
                    return 4
                } else {
                    return current
                }
            })
            setPlayerCardModes(updatedModes)
        }
    }

    const handleDealtNewCards = () => {

        // mikä on seuraava kortti, joka pinosta jaetaan? topmostToDeal
        const updatedRight = props.game.playerStack.length > topmostToDeal ?
            { suit: props.game.playerStack[topmostToDeal].suit, value: props.game.playerStack[topmostToDeal].value }
            :
            ''
        const updatedLeft = props.game.computerStack.length > topmostToDeal ?
            { suit: props.game.computerStack[topmostToDeal].suit, value: props.game.computerStack[topmostToDeal].value }
            :
            ''
        const updatedModes = playerCardModes.map((current, index) => {
            if (index === topmostToDeal) {
                return 0
            } else {
                return current
            }
        })
        setTopmostLeft(updatedLeft)
        setTopmostRight(updatedRight)
        setTopmostToDeal(topmostToDeal + 1)
        setPlayerCardModes(updatedModes)
    }
*/

// <PlayerSolitaire
//     cards={props.game.playerStack}
//     cardModes={playerCardModes}
//     cardPositions={playerCardPositions}
//     unitWidth={unitWidth}
//     rightPackPosition={rightPackPosition}
//     bufferLeft={bufferLeft}
//     handleMoveToLeftGamePack={handleMoveToLeftGamePack}
//     handleDealtNewCards={handleDealtNewCards}
// />
// <View style={{ flexDirection: 'row' }}>
//     <Animated.View style={[animatedVisibility, styles.buttonContainer, { position: 'absolute', top: (1.5 + 0.8 + 1 + 0.8 + 1.5) * unitHeight }]}>
//         <TouchableOpacity onPress={dealCards} style={[styles.buttonView]}>
//             <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>deal cards</Text>
//         </TouchableOpacity>
//     </Animated.View>
//     <Animated.View style={[ styles.buttonContainer, { position: 'absolute', left: 200, top: (1.5 + 0.8 + 1 + 0.8 + 1.5) * unitHeight }]}>
//         <TouchableOpacity onPress={continuePlaying} style={[styles.buttonView]}>
//             <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>continue</Text>
//         </TouchableOpacity>
//     </Animated.View>
// </View>
