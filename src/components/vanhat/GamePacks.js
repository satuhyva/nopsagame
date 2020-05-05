import React from 'react'
import { View } from 'react-native'
import CardFront from '../cardSides/CardFront'


const GamePack = ({ topmostLeft, topmostRight,  unitWidth }) => {
    const cardViewStyle = { position: 'absolute',
        width: unitWidth,
        height: 1.7 * unitWidth,
        borderRadius: 7,
        zIndex: 0,
    }

    const backColorLeft = topmostLeft === '' ? 'green' : 'papayawhip'
    const backColorRight = topmostLeft === '' ? 'green' : 'papayawhip'

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={[cardViewStyle, { left: 0, top: 0, backgroundColor: backColorLeft  }]}>
                {topmostLeft !== '' ?
                    <CardFront suit={topmostLeft.suit} value={topmostLeft.value}/>
                    :
                    null
                }
            </View>
            <View style={[cardViewStyle, { left: 1.5 * unitWidth, top: 0, backgroundColor: backColorRight  }]}>
                {topmostRight !== '' ?
                    <CardFront suit={topmostRight.suit} value={topmostRight.value}/>
                    :
                    null
                }
            </View>
        </View>
    )
}

export default GamePack

