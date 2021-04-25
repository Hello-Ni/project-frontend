import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import { axios, base } from "../axios";
import AnimalPanel from "../components/panel/AnimalPanel";

export default function AdoptScreen({ navigation }) {
  const sendAnimal = async () => {
    await axios.get(
      "http://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL"
    );
    //let animal={name:"john",feature:"白毛",type:"dog"}
    //await axios.post(`${base}/adopt/findAnimal`,animal)
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        source={require("../../assets/background2.png")}
        style={styles.container}
      >
        <View style={styles.container}>
          <AnimalPanel />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: 'center',
  },
});
