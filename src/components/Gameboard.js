import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'



// Gameboard area sizes shall be the following (* unitHeight):
//      0.5 header area
//      1.5 computer solitaire area
//      0.8 spacing
//      1.0 playing packs
//      0.8 spacing
//      1.5 player solitaire
//      0.5 info area



const Gameboard = (props) => {
    console.log('props', props)
    return (
        <View>
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