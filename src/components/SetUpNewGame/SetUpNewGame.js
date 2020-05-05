import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import StartSettingQuestion from './StartSettingQuestion'
import DottedSelectionSlider from './DottedSelectionSlider'
import SelectStack from './SelectStack'
import { setGameSettings } from '../../reducers/gameReducer'
import { createStacks } from './createStacks.js'


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
    },
    questionText: {
        color: '#B9CC3F',
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    buttonView: {
        backgroundColor: '#B9CC3F',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'green',
        fontFamily: 'Arial',
    },
})



const SetUpNewGame = (props) => {

    const [startSetting, setStartSetting] = useState(false)
    const unitHeight = props.unitHeight
    const unitWidth = props.unitWidth
    const bufferLeft = props.bufferLeft

    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }

    const start = () => {
        setStartSetting(true)
    }

    const referenceSkill = React.createRef()
    const referenceSpeed = React.createRef()
    const referenceStack = React.createRef()

    const saveSettings = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 1000,
        }).start()

        const stacks = createStacks()

        setTimeout(() => {
            props.setGameSettings({
                skill: referenceSkill.current.getSelectedValue(),
                speed: referenceSpeed.current.getSelectedValue(),
                playerStack: stacks[referenceStack.current.getSelectedStack().player],
                computerStack : stacks[referenceStack.current.getSelectedStack().computer],
                isOn: true,
                unitWidth: unitWidth,
                bufferLeft: bufferLeft,
            })
        }, 1000)
    }

    return (
        <Animated.View style={animatedVisibility}>
            {!startSetting ?
                <StartSettingQuestion start={start} unitHeight={unitHeight}/>
                :
                <View style={styles.container}>
                    <DottedSelectionSlider
                        item="skill"
                        unitWidth={unitWidth}
                        number={2}
                        ref={referenceSkill}
                    />
                    <DottedSelectionSlider
                        item="speed"
                        unitWidth={unitWidth}
                        number={4}
                        ref={referenceSpeed}
                    />
                    <SelectStack
                        unitWidth={unitWidth}
                        ref={referenceStack}
                    />
                    <TouchableOpacity onPress={saveSettings} style={styles.buttonView}>
                        <Text style={[styles.buttonText, { fontSize: unitHeight / 6 }]}>save settings</Text>
                    </TouchableOpacity>
                </View>
            }
        </Animated.View>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

const ConnectedSetUpNewGame = connect(mapStateToProps, mapDispatchToProps)(SetUpNewGame)

export default ConnectedSetUpNewGame
