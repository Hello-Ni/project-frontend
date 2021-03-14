import { StatusBar } from 'expo-status-bar';
import React,{useSate} from 'react';
import { StyleSheet, Text,Button, TextInput, View,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from "../components/header";
export default function App({navigation}) {
    const pressHandler=()=>{
        navigation.push*("MainWindow")
    }
    return (
    
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
