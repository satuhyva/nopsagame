import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Gameboard from './PlayTheGame/Gameboard'
import SetUpNewGame from '../components/SetUpNewGame/SetUpNewGame'


const NopsaGame = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const unitWidth = Math.min(screenWidth / 6, (screenHeight / (6.6 * 1.7)))
    const unitHeight = 1.7 * unitWidth
    const bufferLeft = (screenWidth - 6 * unitWidth) / 2

    const styles = StyleSheet.create({
        screen: {
            backgroundColor: 'green',
            alignItems: 'center',
            width: screenWidth,
            height: screenHeight,
            // justifyContent: 'center',
        },
        appContainer: {
            width: unitWidth * 6,
            height: unitHeight * 6.6,
            backgroundColor: 'green',
        },
        titleView: {
            height: unitHeight / 2,
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

    const Header = () => {
        return (
            <View style={styles.titleView}>
                <Text style={styles.titleText}>nopsa</Text>
                <Text style={styles.infoText}>a card game for those with skill, speed and luck</Text>
            </View>
        )
    }


    return (
        <View>
            {/* <View style={{ width: unitWidth, height: 0.5 * unitHeight, backgroundColor: 'powderblue' }}></View>
            <View style={{ width: unitWidth, height: 1.5 * unitHeight, backgroundColor: 'blue' }}></View>
            <View style={{ width: unitWidth, height: 0.8 * unitHeight, backgroundColor: 'rosybrown' }}></View>
            <View style={{ width: unitWidth, height: unitHeight, backgroundColor: 'blue' }}></View>
            <View style={{ width: unitWidth, height: 0.8 * unitHeight, backgroundColor: 'rosybrown' }}></View>
            <View style={{ width: unitWidth, height: 1.5 * unitHeight, backgroundColor: 'blue' }}></View>
            <View style={{ width: unitWidth, height: 0.5 * unitHeight, backgroundColor: 'powderblue' }}></View> */}
            <View style={styles.screen}>
                <View style={styles.appContainer}>
                    <Header/>
                    {props.game.isOn ?
                        <Gameboard/>
                        :
                        <SetUpNewGame
                            unitWidth={unitWidth}
                            unitHeight={unitHeight}
                            bufferLeft={bufferLeft}
                        />

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




