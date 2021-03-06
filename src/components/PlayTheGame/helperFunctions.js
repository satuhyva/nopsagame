export const getPlayerCardActionsInDealing = (cardCount, unitWidth, bufferLeft) => {
    let actions = []
    for (let i = 0; i < cardCount; i++) {
        if (i < 15) {
            const location = getCardSolitaireLocationForDealing(i, unitWidth, bufferLeft)
            const willFlip = getCardFlipState(i, cardCount)
            actions.push({ ...location, move: true, flip: willFlip, delay: true })
        }
    }
    return actions
}

export const getComputerCardActionsInDealing = (cardCount, unitWidth, bufferLeft) => {
    let actions = []
    for (let i = 0; i < cardCount; i++) {
        if (i < 15) {
            const location = getComputerCardSolitaireLocationForDealing(i, unitWidth, bufferLeft)
            const willFlip = getCardFlipState(i, cardCount)
            actions.push({ ...location, move: true, flip: willFlip, delay: true })
        }
    }
    return actions
}

export const getNextCardToPlay = (computerCardsVisible, computerStack, topmostGamingLeft, topmostGamingRight) => {
    // console.log(computerCardsVisible, topmostGamingLeft, topmostGamingRight)
    // ensin vain helppo versio, eli meneekö mikään järjestyksessä vasemmalta oikealle
    let sideAndindex = { side: '', indexOfVisible: '' }
    for (let i = 0; i < computerCardsVisible.length; i++) {
        const cardToTest = computerStack[computerCardsVisible[i]]
        if (valueIsSuitable(topmostGamingLeft.value, cardToTest.value)) {
            sideAndindex = { side: 'left', indexOfVisible: computerCardsVisible[i] }
            return sideAndindex
        }
        if (valueIsSuitable(topmostGamingRight.value, cardToTest.value)) {
            sideAndindex = { side: 'right', indexOfVisible: computerCardsVisible[i] }
            return sideAndindex
        }
    }
    return sideAndindex
}





export const getCardSolitaireLocationForDealing = (index, unitWidth, bufferLeft) => {
    const unitHeight = 1.7 * unitWidth
    const origoY =  (1.5 + 0.8 + 1.0 + 0.8) * unitHeight

    let posX = bufferLeft > 0 ? bufferLeft : 0
    switch (index) {
    case 0:
        posX += 1 / 6 * unitWidth
        break
    case 1: case 5:
        posX += (2 / 6  + 1)* unitWidth
        break
    case 2: case 6: case 9:
        posX +=  (3 / 6 + 2) * unitWidth
        break
    case 3: case 7: case 10: case 12:
        posX +=  (4 / 6 + 3) * unitWidth
        break
    default:
        posX +=  (5 / 6 + 4) * unitWidth
    }

    let posY = 0
    switch (index) {
    case 14:
        posY = origoY + (4 * 0.125) * unitHeight
        break
    case 12: case 13:
        posY = origoY + (3 * 0.125) * unitHeight
        break
    case 9: case 10: case 11:
        posY = origoY + (2 * 0.125) * unitHeight
        break
    case 5: case 6: case 7: case 8:
        posY = origoY + (1 * 0.125) * unitHeight
        break
    default:
        posY = origoY
    }
    return { x: posX, y: posY }
}

export const getComputerCardSolitaireLocationForDealing = (index, unitWidth, bufferLeft) => {
    const unitHeight = 1.7 * unitWidth
    const origoY =  0

    let posX = bufferLeft > 0 ? bufferLeft : 0
    switch (index) {
    case 14: case 13: case 11: case 8: case 4:
        posX += 1 / 6 * unitWidth
        break
    case 12: case 10: case 7: case 3:
        posX += (2 / 6  + 1)* unitWidth
        break
    case 9: case 6: case 2:
        posX +=  (3 / 6 + 2) * unitWidth
        break
    case 5: case 1:
        posX +=  (4 / 6 + 3) * unitWidth
        break
    default:
        posX +=  (5 / 6 + 4) * unitWidth
    }

    let posY = 0
    switch (index) {
    case 4: case 3: case 2: case 1: case 0:
        posY = origoY + (4 * 0.125) * unitHeight
        break
    case 8: case 7: case 6: case 5:
        posY = origoY + (3 * 0.125) * unitHeight
        break
    case 11: case 10: case 9:
        posY = origoY + (2 * 0.125) * unitHeight
        break
    case 13: case 12:
        posY = origoY + (1 * 0.125) * unitHeight
        break
    default:
        posY = origoY
    }
    return { x: posX, y: posY }
}


const getCardFlipState = (index, count) => {
    let flip = false
    switch (index) {
    case 0: case 5: case 9: case 12: case 14:
        flip = true
        break
    case 1: case 2: case 3: case 4:
        if (index + 4 > count) {
            flip = true
        }
        break
    case 6: case 7: case 8:
        if (index + 4 > count) {
            flip = true
        }
        break
    case 10: case 11:
        if (index + 4 > count) {
            flip = true
        }
        break
    case 13:
        if (index + 4 > count) {
            flip = true
        }
        break
    default:
        break
    }
    return flip
}

export const wasReleasedOnRightGamingPack = (releaseX, releaseY, unitWidth, bufferLeft) => {
    // console.log('releaseX', releaseX)
    // console.log('releaseY', releaseY)
    const gamingRightX = bufferLeft + (0.25 + 1 + 0.5 + 1 + 0.5) * unitWidth
    const gamingRightY = bufferLeft + (0.5 + 1.5 + 0.8) * unitWidth * 1.7
    // console.log('gamingRightX', gamingRightX)
    // console.log('gamingRightY', gamingRightY)
    let wasReleasedOnRightGamingPackArea = false
    if (releaseX > gamingRightX && releaseX < gamingRightX + unitWidth && releaseY > gamingRightY && releaseY < gamingRightY + unitWidth * 1.7) {
        wasReleasedOnRightGamingPackArea = true
    }
    return wasReleasedOnRightGamingPackArea
}

export const valueIsSuitable = (currentTopmostValue, newValue) => {
    if (currentTopmostValue === 1) {
        if (newValue === 2 || newValue === 13) {
            return true
        }
    } else if (currentTopmostValue === 13) {
        if (newValue === 12 || newValue === 1) {
            return true
        }
    } else {
        if (newValue === currentTopmostValue + 1 || newValue === currentTopmostValue - 1) {
            return true
        } else {
            return false
        }
    }
}

export const getCardStartNullStates = (cardCount) => {
    let nullStates = []
    for (let i = 0; i < cardCount; i++) {
        nullStates.push(false)
    }
    return nullStates
}

// export const getCardDisbaledStates = (cardCount) => {
//     let disabledStates = []
//     for (let i = 0; i < cardCount; i++) {
//         disabledStates.push(true)
//     }
//     return disabledStates
// }

export const getCardBelow = (playerCardIndex) => {
    let index
    switch (playerCardIndex) {
    case 14:
        index = 13
        break
    case 13:
        index =  11
        break
    case 12:
        index =  10
        break
    case 11:
        index =  8
        break
    case 10:
        index =  7
        break
    case 9:
        index =  6
        break
    case 8:
        index =  4
        break
    case 7:
        index =  3
        break
    case 6:
        index =  2
        break
    case 5:
        index =  1
        break
    default:
        index =  -1
    }
    return index

}