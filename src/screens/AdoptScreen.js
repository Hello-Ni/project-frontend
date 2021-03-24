import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text,Button, TextInput, View,TouchableWithoutFeedback,TouchableOpacity,Keyboard,ImageBackground } from 'react-native';
import {axios,base} from '../axios'
export default function AdoptScreen({navigation}) {
    const sendAnimal=async()=>{
      let animal={name:"john",feature:"白毛",type:"dog"}
      await axios.post(`${base}/adopt/findAnimal`,animal)
    }
    return ( 
        <TouchableWithoutFeedback  onPress={()=>{
        Keyboard.dismiss();
        }}>
            <ImageBackground source={require('../../assets/background.png')} style={styles.container}>
              <Button
              onPress={sendAnimal}
              title="test"
              ></Button>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    //justifyContent: 'center',

  },
});
