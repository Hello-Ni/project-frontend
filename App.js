import { StatusBar } from 'expo-status-bar';
import React,{useSate} from 'react';
import { StyleSheet, Text, TextInput, View,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from "./src/components/header";
import AddTodo from "./src/components/addTodo"
export default function App() {
  return (
    
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <AddTodo></AddTodo>
        </View>
        <StatusBar style="auto" />
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
  content:{
    flex:2,
    padding:40,
  }
});
