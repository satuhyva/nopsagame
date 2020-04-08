import React from 'react'
import { Image } from 'react-native'
import cardBackImage from '../../images/kukat.jpg'

const CardBack = () => {


    return (
        <Image
            style={{ flex: 1, borderRadius: 7 }}
            source={cardBackImage}
        />
    )
}

export default CardBack



