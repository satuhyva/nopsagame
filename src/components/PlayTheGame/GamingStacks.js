import React from 'react'
import { View } from 'react-native'
import CardFront from '../cardSides/CardFront'


const GamingStacks = ({ topmostLeft, topmostRight,  unitWidth }) => {
    const cardViewStyle = { position: 'absolute',
        width: unitWidth,
        height: 1.7 * unitWidth,
        borderRadius: 7,
        zIndex: 0,
    }

    const colorLeft = topmostLeft === '' ? 'green' : 'papayawhip'
    const colorRight = topmostRight === '' ? 'green' : 'papayawhip'

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={[cardViewStyle, { left: 0, top: 0, backgroundColor: colorLeft  }]}>
                {topmostLeft !== '' ?
                    <CardFront suit={topmostLeft.suit} value={topmostLeft.value}/>
                    :
                    null
                }
            </View>
            <View style={[cardViewStyle, { left: 1.5 * unitWidth, top: 0, backgroundColor: colorRight  }]}>
                {topmostRight !== '' ?
                    <CardFront suit={topmostRight.suit} value={topmostRight.value}/>
                    :
                    null
                }
            </View>
        </View>
    )
}

export default GamingStacks

