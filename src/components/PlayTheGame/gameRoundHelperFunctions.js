export const getPlayerCardPositionAfterFlip = (cardIndex, unitWidth, bufferLeft) => {

    const unitHeight = 1.7 * unitWidth

    if (cardIndex > 14) {
        return { x: bufferLeft + (3.25) * unitWidth, y: (1.5 + 0.8) * unitHeight }
    }

    let posX = bufferLeft > 0 ? bufferLeft : 0
    switch (cardIndex) {
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

    const origoY = (1.5 + 0.8 + 1.0 + 0.8) * unitHeight

    let posY = 0
    switch (cardIndex) {
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


export const getSolitaireDealingActionsForPlayerCards = (playerStack) => {
    const cardCount = playerStack.length
    let actionsTable = []
    for (let i = 0; i < cardCount; i++) {
        const willFlipInSolitaire = getCardFlipState(i, cardCount)
        if (willFlipInSolitaire) {
            actionsTable.push('moveToSolitaireAndFlip')
        } else if (i < 15) {
            actionsTable.push('moveToSolitaire')
        } else {
            actionsTable.push('')
        }
    }
    return actionsTable
}

// will the card flip in dealing the solitaire cards in the beginning?

export const getCardFlipState = (index, count) => {
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

export const getRemovedStates = (cardCount) => {
    let table = []
    for (let i = 0; i < cardCount; i++) {
        table.push(false)
    }
    return table
}





// card positions in the solitaires in the beginning:

export const getPlayerCardSolitairePosition = (i, unitWidth, bufferLeft) => {
    const unitHeight = 1.7 * unitWidth
    const origoY = (1.5 + 0.8 + 1.0 + 0.8) * unitHeight

    let posX = bufferLeft > 0 ? bufferLeft : 0
    switch (i) {
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
    switch (i) {
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






// card modes / dealing the cards / first moves:
// MODES:
// 0 = null (not visible anymore)
// 1 = in right side card stack, back visible
// 2 = animated card, moves from right side stack to solitaire, flips
// 3 = animated card, moves from right side stack to solitaire, does not flip
// 4 = animated card, moves from right side stack to middle
// 5 = touchable and animated card, move to middle pack or empty position
// 6 = touchable and animated card, move to middle pack
// 7 = solitaire card, back upwards, not touchable



// start mode for each card is 1
export const getPlayerCardStartModes = (playerStack) => {
    const cardCount = playerStack.length
    let table = new Array(cardCount).fill(1)
    return table
}


export const getPlayerCardDealingModes = (playerStack) => {
    let table = []
    const cardCount = playerStack.length
    for (let i = 0; i < cardCount; i++) {
        if (i < 15) {
            const willFlip = getCardFlipState(i, cardCount)
            if (willFlip) {
                table.push(2)
            } else {
                table.push(3)
            }
        } else {
            table.push(1)
        }
    }
    return table
}


export const getPlayerCardDealingPositions = (playerStack, unitWidth, bufferLeft) => {
    let table = []
    const cardCount = playerStack.length
    for (let i = 0; i < cardCount; i++) {
        if (i < 15) {
            table.push(getPlayerCardSolitairePosition(i, unitWidth, bufferLeft))
        } else {
            table.push('')
        }
    }
    return table
}

export const getPlayerCardsStartToPlayModes = (currentModes) => {
    const updatedModes = currentModes.map(current => {
        if (current === 2) {
            return 5
        } else if (current === 3)  {
            return 7
        } else {
            return current
        }
    })
    return updatedModes
}


export const isOnLeftGameStack = (releaseX, releaseY, unitWidth, bufferLeft) => {
    const origoX = 1.75 * unitWidth
    const origoY = 2.8 * unitWidth * 1.7
    let is = false
    if (releaseX > origoX && releaseX < origoX + unitWidth && releaseY > origoY && releaseY < origoY + unitWidth * 1.7) {
        is = true
    }
    return is
}