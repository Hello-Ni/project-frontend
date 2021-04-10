import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text,Button, TextInput, View,TouchableWithoutFeedback,TouchableOpacity,Keyboard,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import {axios,base} from '../axios'
export default function App({navigation}) {
    const [buttonType,setButtonType]=useState([
      
    ]);
    const pressHandler=async(screen)=>{
      switch(screen){
        case "map":
          navigation.push("MapWindow")
          break;
        case "adopt":
          navigation.push("AdoptWindow")
          break;
        case "register":
          navigation.push("RegisterWindow")
          break;
        default:
          //reset all data
          await axios.post(`${base}/maps/create`);
          break;
      }
        
    };
    
    return ( 
        <TouchableWithoutFeedback  onPress={()=>{
        Keyboard.dismiss();
        }}>
            <ImageBackground source={require('../../assets/background.png')} style={styles.container}>
               <View style={styles.imageBox}></View>
                    <View style={styles.content}>
                      <TouchableOpacity   style={styles.iconBox} onPress={()=> pressHandler("map")}>
                          <FontAwesome5 name="map-marker-alt" size={50} color="black" />
                          <Text>地圖搜尋</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler("adopt")}>
                          <FontAwesome5 name="dog" size={50} color="black" />
                          <Text>寵物領養</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler("register")}>
                      <AntDesign name="pushpin" size={50} color="black" />
                          <Text>登記走失</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler()}>
                          <MaterialCommunityIcons name="comment-search" size={50} color="black" />
                          <Text>文章搜尋</Text>     
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBox} onPress={()=> pressHandler()}>
                        <Ionicons name="person" size={50} color="black" />
                          <Text>個人資料</Text>     
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
    flexWrap:'wrap',
  },
  iconBox:{
    flex:1,
    alignItems:'center',
    //borderColor:'red',
    //borderWidth:1,
    minWidth:'25%',
    maxWidth:'25%',
    padding:10
  },
  content:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'flex-start',
    //padding:10,
    //backgroundColor:'yellow'
  }
});
