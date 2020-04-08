import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Gameboard from './Gameboard'
import SetNewGame from './SetNewGame'


const NopsaGame = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const unitWidth = Math.min(screenWidth / 6, (screenHeight / (6.6 * 1.7)))
    const unitHeight = 1.7 * unitWidth

    const styles = StyleSheet.create({
        screen: {
            backgroundColor: 'green',
            alignItems: 'center',
            width: screenWidth,
            height: screenHeight,
            justifyContent: 'center',
        },
        appContainer: {
            width: unitWidth * 6,
            height: unitHeight * 6.6,
            backgroundColor: 'green',
        },
        titleView: {
            height: unitHeight / 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleText: {
            fontSize: unitHeight / 3.75,
            fontWeigth: 'bold',
            color: '#B9CC3F',
            fontFamily: 'Arial Black',
        },
        infoText: {
            fontSize: unitHeight / 9,
            color: '#B9CC3F',
            fontFamily: 'Arial',
        },
    })



    return (
        <View>
            <View style={styles.screen}>
                <View style={styles.appContainer}>
                    {props.game.isOn ?
                        <Gameboard
                            unitWidth={unitWidth}
                            unitHeight={unitHeight}
                        />
                        :
                        <View>
                            <View style={styles.titleView}>
                                <Text style={styles.titleText}>nopsa</Text>
                                <Text style={styles.infoText}>a card game for those with skill, speed and luck</Text>
                            </View>
                            <SetNewGame
                                unitWidth={unitWidth}
                                unitHeight={unitHeight}
                            />
                        </View>
                    }
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

const ConnectedNopsaGame = connect(mapStateToProps, mapDispatchToProps)(NopsaGame)

export default ConnectedNopsaGame




