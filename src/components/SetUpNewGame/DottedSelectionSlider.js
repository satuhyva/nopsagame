import React, { useState, useImperativeHandle } from 'react'
import {  View, Text, StyleSheet } from 'react-native'
import SmallDot from './SmallDot'
import LargeDot from './LargeDot'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 50,
    },
    instructionText: {
        color: '#B9CC3F',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    dotSliderView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})



const DottedSelectionSlider = React.forwardRef((props, ref) => {

    const instruction = props.item === 'skill' ?
        'select opponent skill level'
        :
        'select opponent speed'
    const unitWidth = props.unitWidth
    const unitHeight = unitWidth * 1.7
    const number = props.number
    const dotViewWidth = 6 * unitWidth / 30

    const [value, setValue] = useState(1)

    const handleSelectionChanged = (newValue) => {
        let startValue = value
        const changes = Math.max(newValue - value, value - newValue)
        function changeDotIntervalUp() {
            return setInterval(() => {
                if (startValue < newValue) {
                    startValue++
                    setValue(startValue)
                }
            }, 180 / changes)
        }
        function changeDotIntervalDown() {
            return setInterval(() => {
                if (newValue < startValue) {
                    startValue--
                    setValue(startValue)
                }
            }, 180 / changes)
        }
        let changeInterval
        if (value < newValue) {
            changeInterval = changeDotIntervalUp()
        } else if (value > newValue) {
            changeInterval = changeDotIntervalDown()
        }
        setTimeout(() => {
            clearInterval(changeInterval)
        }, 180 * changes)
    }

    const getSelectedValue = () => {
        return (value - 1) / 6 + 1
    }
    useImperativeHandle(ref, () => {
        return { getSelectedValue }
    })

    const displayDotSlider = () => {
        let dots = []
        for (let i = 1; i <= number * 6 + 1; i++) {
            if ((i - 1) % 6 !== 0) {
                dots.push(
                    <SmallDot
                        key={i}
                        value={value}
                        dotViewWidth={dotViewWidth}
                        dotNumber={i}
                    />)
            } else {
                dots.push(
                    <LargeDot
                        key={i}
                        value={value}
                        dotViewWidth={dotViewWidth}
                        handleSelectionChanged={handleSelectionChanged}
                        dotNumber={i}
                    />)
            }
        }
        return dots
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.instructionText, { fontSize: unitHeight / 5 }]}>{instruction}</Text>
            <View style={styles.dotSliderView}>
                {displayDotSlider()}
            </View>
        </View>

    )
})

export default DottedSelectionSlider


