import { StyleSheet, View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'


const DataCard = () => {
    return (
        <View style = {styles.container}>
            <Text>Yuh</Text>
        </View>
    ) 
}

export default DataCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 60,
        maxWidth: 60,
        backgroundColor: Colors.tertiary,
    },
})