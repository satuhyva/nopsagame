import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// import SetNewGame from './SetNewGame'
// import Gameboard from './Gameboard'

const NopsaGame = (props) => {

    // const oneHeightUnit = props.unitHeight

    // const screenStyle = {
    //     backgroundColor: 'green',
    //     alignItems: 'center',
    //     width: props.screenWidth,
    //     height: props.screenHeight,
    //     justifyContent: 'center',
    // }
    // const appContainerStyle = {
    //     width: props.unitWidth * 6,
    //     height: oneHeightUnit * 6.6,
    //     backgroundColor: 'green',
    // }
    // const titleView = {
    //     height: oneHeightUnit / 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }
    // const titleText = {
    //     fontSize: oneHeightUnit / 3.75,
    //     fontWeigth: 'bold',
    //     color: '#B9CC3F',
    //     fontFamily: 'Arial Black',
    // }
    // const titleInfoText = {
    //     fontSize: oneHeightUnit / 9,
    //     color: '#B9CC3F',
    //     fontFamily: 'Arial',
    // }

    return (
        <View>
            {/* <View style={screenStyle}>
                <View style={appContainerStyle}>
                    {props.game.isOn ?
                        <Gameboard
                            unitWidth={props.unitWidth}
                            unitHeight={props.unitHeight}
                        />
                        :
                        <View>
                            <View style={titleView}>
                                <Text style={titleText}>nopsa</Text>
                                <Text style={titleInfoText}>a card game for those with skill, speed and luck</Text>
                            </View>
                            <SetNewGame
                                unitWidth={props.unitWidth}
                                unitHeight={props.unitHeight}
                                screenWidth={props.screenWidth}
                                screenHeight={props.screenHeight}
                            />
                        </View>
                    }
                </View>
            </View> */}
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

const ConnectedNopsaGame = connect(mapStateToProps, mapDispatchToProps)(NopsaGame)

export default ConnectedNopsaGame




