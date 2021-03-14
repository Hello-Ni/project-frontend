import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text,Button, TextInput, View,TouchableWithoutFeedback,TouchableOpacity,Keyboard,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
export default function App({navigation}) {
    const [buttonType,setButtonType]=useState([

    ]);
    const pressHandler=()=>{
        console.log("press")
        navigation.push("MapWindow")
    };
    
    return ( 
        <TouchableWithoutFeedback  onPress={()=>{
        Keyboard.dismiss();
        }}>
            <ImageBackground source={require('../../assets/background.png')} style={styles.container}>
               <View style={styles.imageBox}></View>
                    <View style={styles.content}>
                      <TouchableOpacity   style={styles.iconBox} onPress={()=> pressHandler()}>
                          <FontAwesome5 name="map-marker-alt" size={50} color="black" />
                          <Text>地圖搜尋</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler()}>
                          <FontAwesome5 name="dog" size={50} color="black" />
                          <Text>寵物領養</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler()}>
                      <AntDesign name="pushpin" size={50} color="black" />
                          <Text>登記走失</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler()}>
                          <FontAwesome5 name="question" size={50} color="black" />
                          <Text>待開發</Text>     
                      </TouchableOpacity>               
                    </View> 
                
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
  imageBox:{
    flex:1,
  },
  iconBox:{
    flex:1,
    //backgroundColor:'red',
    alignItems:'center'
  },
  content:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly',
    padding:10,
    //borderStartColor:'yellow'
  }
});
