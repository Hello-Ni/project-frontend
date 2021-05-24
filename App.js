import { StatusBar } from "expo-status-bar";
import React, { useSate } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./src/components/header";
import AddTodo from "./src/components/addTodo";
import Navigator from "./src/router/homeStack";
export default class App extends React.Component {
  constructor() {
    super();
    console.log("fuck");
  }
  render() {
    return <Navigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 2,
    padding: 40,
  },
});
