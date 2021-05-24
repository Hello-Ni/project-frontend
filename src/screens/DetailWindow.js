import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import { axios, base } from "../axios";

export default function DetailScreen({ navigation }) {
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
          <Image
            style={{ height: "50%", width: "100%" }}
            source={{ uri: navigation.getParam("animal").image }}
          />
          <View>
            <Text style={{ fontSize: 30 }}>
              名字:{navigation.getParam("animal").name}
            </Text>
          </View>
          <View>
            <Text>類別:{navigation.getParam("animal").type}</Text>
            <Text>品種:{navigation.getParam("animal").breed}</Text>
            <Text>性別:{navigation.getParam("animal").gender}</Text>
            <Text>年齡:{navigation.getParam("animal").age}</Text>
            <Text>體型:{navigation.getParam("animal").shape}</Text>
            <Text>聯絡人:{navigation.getParam("animal").contactor}</Text>
            <Text>電話:{navigation.getParam("animal").phone}</Text>
            <Text>地區:{navigation.getParam("animal").location}</Text>
          </View>
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
