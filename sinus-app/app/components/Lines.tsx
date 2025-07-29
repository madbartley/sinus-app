import { StyleSheet, View, Image } from 'react-native'
import React from 'react'


const Lines = () => {
    return (
      <View style={styles.container}>
        <View style = {styles.lines}>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 250}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 235}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 207}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 218}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 205}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 218}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 225}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 200}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 178}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 140}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 168}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 145}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 152}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 200}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 235}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 210}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 230}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 225}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 241}}/>
          <Image source={require('../../assets/images/line.png')} style={{width: 2, height: 250}}/>
        </View>
      </View>
    )
  }


export default Lines;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    lines: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
      alignItems: 'flex-end',
    }
})