import React, { useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'



// Gameboard area sizes shall be the following (* unitHeight):
//      0.5 title area
//      1.5 computer solitaire area
//      0.8 spacing
//      1.0 playing packs
//      0.8 spacing
//      1.5 player solitaire
//      0.5 info area



const Gameboard = (props) => {
    return (
        <View></View>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game,
        view: state.view,
    }
}

const mapDispatchToProps = {

}

const ConnectedGameboard = connect(mapStateToProps, mapDispatchToProps)(Gameboard)

export default ConnectedGameboard