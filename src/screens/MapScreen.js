import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text,Button, TextInput, View,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Geocoder from 'react-native-geocoding';
import {base, axios} from '../axios'
export default function App({navigation}) {
    Geocoder.init("AIzaSyDonjbD-iLIzfrKhky6ESfjfTtxso5vJG0"); // use a valid API key
    const [address,setAddress]=useState("")
    const [locaiton,setLocation]=useState({lat:22.997800066043517, lng:120.20266576552974});
    const pressHandler=()=>{
        navigation.push*("MainWindow")
    }
    const testHandler=async ()=>{
      console.log(`${base}/maps/getAllMarker`);
      const res=await axios.get(`${base}/maps/getAllMarker`);
      console.log(res)
    }
    const submitHandler=async()=>{
      Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
      })
      .catch(error => console.warn(error));
    }
    return (
    
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <TextInput
          placeholder="請輸入地點"
          onChangeText={(val)=>{setAddress(val)}}
          onSubmitEditing={testHandler}
          value={address}
          
        ></TextInput>
        <Button
        onPress={testHandler}
        title="submit"
        ></Button>
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
