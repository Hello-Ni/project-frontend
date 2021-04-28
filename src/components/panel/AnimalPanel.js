import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { render } from "react-dom";
import { base, axios } from "../../axios";
import AnimalCard from "../AnimalCard";
export default function RecommendPanel({}) {
  const [recommend, setrRecommend] = useState([
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
  const [selectAnimal, setSelectAnimal] = useState({
    type: "狗",
    breed: "不拘",
    gender: "不拘",
  });
  const [selectBox, setSelectBox] = useState({
    type: ["狗", "貓"],
    breed: ["米克斯", "拉布拉多"],
    gender: ["男", "女"],
  });
  const fetchAnimal = () => {
    //console.log("fetch");
    //axios.post(`${base}/adopt/create`);
  };
  const handleInputResult = (txt, key) => {
    console.log(txt, key);
    let newSelect = { ...selectAnimal };
    newSelect[key] = txt;
    setSelectAnimal(newSelect);
  };

  return (
    <View style={styles.main}>
      {fetchAnimal()}
      <View style={styles.recommendBox}>
        <Text style={{ fontSize: 20, marginLeft: 30, top: 25 }}>推薦給你</Text>
        <AnimalCard animals={recommend} isHorizon={true} margin={30} />
      </View>
      <View style={styles.searchBox}>
        {Object.keys(selectBox).map((name, i1) => {
          return (
            <View style={styles.select} key={i1}>
              <Picker
                mode="dropdown"
                name={name}
                selectedValue={selectAnimal[name]}
                onValueChange={(value) => {
                  handleInputResult(value, name);
                }}
              >
                {selectBox[name].map((item, i2) => {
                  return <Picker.Item key={i2} label={item} value={item} />;
                })}
              </Picker>
            </View>
          );
        })}
        <Button title="搜尋" style={{ flex: 1 }} />
      </View>
      <View style={styles.showBox}>
        <AnimalCard animals={recommend} isHorizon={false} margin={5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  recommendBox: {
    flex: 5,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  showBox: {
    flex: 5.5,
  },
  select: {
    flex: 1,
    borderColor: "#ced4da",
    marginHorizontal: "1%",

    borderWidth: 3,
    color: "red",
    fontSize: 3,
  },
});
