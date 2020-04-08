import React, { useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

const SetNewGame = (props) => {


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

const ConnectedSetNewGame = connect(mapStateToProps, mapDispatchToProps)(SetNewGame)

export default ConnectedSetNewGame
