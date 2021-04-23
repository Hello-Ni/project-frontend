import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome, Entypo, Foundation } from "@expo/vector-icons";
import { base, axios } from "../../axios";
export default function RecommendPanel({}) {
  const [animal, setAnimal] = useState([
    {
      name: "華仔",
      breed: "米克斯",
      type: "貓",
      gender: "公",
      shape: "中型",
      color: "棕色虎斑",
      age: "成年",
      fixed: "已結紮",
      location: "台南市 永康區",
      contact: "黃吱吱",
      phone: "0910989647",
      image: `${base}/Animal/cat/0.jpg`,
    },
    {
      name: "阿喵",
      breed: "米克斯",
      type: "貓",
      gender: "母",
      shape: "小型",
      color: "白底虎斑",
      age: "幼年",
      fixed: "已結紮",
      location: "桃園市 中壢區",
      contact: "陳佩勤",
      phone: "0930235888",
      image: `${base}/Animal/cat/1.jpg`,
    },
    {
      name: "瑪妮",
      breed: "米克斯",
      type: "貓",
      gender: "母",
      shape: "小型",
      color: "三花",
      age: "成年",
      fixed: "已結紮",
      location: "新北市 汐止區",
      contact: "溫先生",
      phone: "0978092308",
      image: `${base}/Animal/cat/2.jpg`,
    },
    {
      name: "乳牛",
      breed: "混種長毛貓",
      type: "貓",
      gender: "公",
      shape: "大型",
      color: "咖啡混黑",
      age: "成年",
      fixed: "已結紮",
      location: "屏東縣 屏東市",
      contact: "隻隻",
      phone: "0938517803",
      image: `${base}/Animal/cat/3.jpg`,
    },
    {
      name: "小菲",
      breed: "米克斯",
      type: "貓",
      gender: "公",
      shape: "中型",
      color: "橘白",
      age: "成年",
      fixed: "已結紮",
      location: "新北市 中和區",
      contact: "Darren",
      phone: "0939895131",
      image: `${base}/Animal/cat/4.jpg`,
    },
  ]);
  const findURL = () => {
    console.log("dick");
    let imageURL = URL.createObjectURL(`${base}/Animal/dog/0.jpg`);
    console.log(imageURL);
  };
  const renderItem = ({ item }) => (
    <View style={styles.recommend}>
      <Image style={styles.photo} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.detail}>
        <View style={styles.content}>
          <FontAwesome name="id-card" size={15} color="white" />
          <Text style={styles.text}>{item.type}</Text>
        </View>
        <View style={styles.content}>
          <AntDesign name="tag" size={15} color="white" />
          <Text style={styles.text}>{item.gender}</Text>
        </View>
        <View style={styles.content}>
          <Foundation name="foot" size={15} color="white" />
          <Text style={styles.text}>{item.age + item.shape + item.breed}</Text>
        </View>
        <View style={styles.content}>
          <Entypo name="home" size={15} color="white" />
          <Text style={styles.text}>{item.location}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={animal}
        renderItem={renderItem}
        keyExtractor={(item) => item.phone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recommend: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "scroll",
    backgroundColor: "#FFF3B5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 20,
    margin: 30,
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    color: "#AEA8A8",
    marginLeft: 20,
  },
  photo: { height: "50%", width: "100%" },
  detail: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    minHeight: 13,
    fontSize: 8,
    marginLeft: 10,
    marginBottom: 6,
  },
  text: {
    fontSize: 10,
    marginLeft: 10,
  },
});
