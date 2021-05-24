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
export default class RecommendPanel extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      isInit: false,
      wait: false,
      recommend: [],
      animals: [],
      selectAnimal: {
        type: "狗",
        breed: "不拘",
        gender: "不拘",
      },
      searchTag: {
        type: ["狗", "貓"],
        breed: ["米克斯", "拉布拉多"],
        gender: ["不拘", "公", "母"],
      },
      allBreed: {
        狗: {},
        貓: {},
      },
    };
  }
  componentDidMount() {
    this.fetchAllBreed();
    this.fetchRecommend();
    //this.fetchAnimal();
  }
  async fetchAnimal() {
    axios.get(`${base}/adopt/findAnimal`);
  }
  async fetchRecommend() {
    let res = await axios.get(`${base}/adopt/recommend`);
    console.log(res.data.data);
    this.setState({ recommend: res.data.data });
    console.log(this.state.recommend.length);
  }
  async getAnimal() {
    this.state.wait = true;
    let res = await axios.post(
      `${base}/adopt/findAnimal`,
      this.state.selectAnimal
    );
    this.setState({ animals: res.data.data });
    //this.state.wait = false;
    console.log(res.data.data);
  }
  async fetchAllBreed() {
    let res = await axios.get(`${base}/adopt/getAllBreed`);
    this.state.allBreed["狗"] = res.data.data.dog;
    this.state.allBreed["貓"] = res.data.data.cat;
    this.state.searchTag.breed = res.data.data.dog;
    this.state.isInit = true;
    this.forceUpdate();
  }
  handleInputResult(txt, key) {
    if (key === "type") this.state.searchTag.breed = this.state.allBreed[txt];
    console.log(txt, key);
    let newSelect = { ...this.state.selectAnimal };
    newSelect[key] = txt;
    this.setState({ selectAnimal: newSelect });
  }
  clickAnimal(animal) {
    this.props.navigation.navigate("DetailWindow", { animal: animal });
    console.log(animal.image);
    axios.post(`${base}/adopt/storeHistory`, animal);
  }
  render() {
    if (!this.state.isInit) return null;
    else
      return (
        <View style={styles.main}>
          <View style={styles.recommendBox}>
            <Text style={{ fontSize: 20, marginLeft: 30, top: 25 }}>
              推薦給你
            </Text>
            <AnimalCard
              animals={this.state.recommend}
              isHorizon={true}
              margin={30}
              onPress={(animal) => this.clickAnimal(animal)}
            />
          </View>
          <View style={styles.searchBox}>
            {Object.keys(this.state.searchTag).map((name, i1) => {
              return (
                <View style={styles.select} key={i1}>
                  <Picker
                    mode="dropdown"
                    name={name}
                    selectedValue={this.state.selectAnimal[name]}
                    onValueChange={(value) => {
                      this.handleInputResult(value, name);
                    }}
                  >
                    {this.state.searchTag[name].map((item, i2) => {
                      return <Picker.Item key={i2} label={item} value={item} />;
                    })}
                  </Picker>
                </View>
              );
            })}
            <Button
              title="搜尋"
              style={{ flex: 1 }}
              onPress={async () => {
                await this.getAnimal();
              }}
            />
          </View>
          <View style={styles.showBox}>
            <AnimalCard
              animals={this.state.animals}
              isHorizon={false}
              margin={5}
              onPress={(animal) => this.clickAnimal(animal)}
            />
          </View>
        </View>
      );
  }
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
