import React, { useState, useImperativeHandle } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Stack from './Stack'


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
})


const SelectStack = React.forwardRef((props, ref) => {

    const unitWidth = props.unitWidth
    const unitHeight = unitWidth * 1.7

    const [selectedStack, setSelectedStack] = useState(0)

    const changedSelection = (id) => {
        setSelectedStack(id)
    }

    const getSelectedStack = () => {
        const computerStack = selectedStack === 0 ? 1 : 0
        return { player: selectedStack, computer: computerStack }
    }
    useImperativeHandle(ref, () => {
        return { getSelectedStack }
    })

    const borderColorStack1 = selectedStack === 0 ? { borderColor: '#B9CC3F' } : { borderColor: 'green' }
    const borderColorStack2 = selectedStack === 1 ?  { borderColor: '#B9CC3F' } : { borderColor: 'green' }


    return (
        <View style={styles.container}>
            <Text style={[styles.instructionText, { fontSize: unitHeight / 5 }]}>select your stack of cards</Text>
            <View style={{ flexDirection: 'row' }}>
                <Stack displayColor={borderColorStack1} number={0} selectStack={changedSelection} unitWidth={unitWidth}/>
                <View style={{ width: 30 }}/>
                <Stack displayColor={borderColorStack2} number={1} selectStack={changedSelection} unitWidth={unitWidth}/>
            </View>
        </View>
    )
})

export default SelectStack

