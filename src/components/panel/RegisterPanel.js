import React, { useState } from "react";
import { StyleSheet, Text, Button, TextInput, View, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { base, axios } from "../../axios";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import { animalType } from "../../scripts/animal";
export default function RegisterPanel({ inputLoc }) {
  const [image, setImage] = useState(null);
  const [animalDetail, setAnimalDetail] = useState({
    name: "",
    type: "",
    breed: "混種",
    feature: "",
    owner: "",
    date: "",
    phone: "",
  });
  const [animalText] = useState([
    { text: "寵物名字", placeholder: "輸入名字", key: "name" },
    { text: "寵物特徵", placeholder: "輸入特徵", key: "feature" },
    { text: "聯絡人", placeholder: "輸入聯絡人", key: "owner" },
  ]);
  const [animalChecked, setAnimalChecked] = useState("dog");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const handleInputResult = (txt, key) => {
    let newDetail = { ...animalDetail };
    newDetail[key] = txt;
    setAnimalDetail(newDetail);
  };
  const submitForm = async () => {
    await axios
      .post(`${base}/maps/insert`, {
        location: JSON.stringify(inputLoc),
        detail: JSON.stringify(animalDetail),
      })
      .then((res) => {
        console.log(res.data.status);
      });
  };
  return (
    <View style={styles.detailBox}>
      <View style={{ justifyContent: "center" }}>
        <View name="type" style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="dog"
              status={animalChecked === "dog" ? "checked" : "unchecked"}
              onPress={() => {
                setAnimalChecked("dog"), handleInputResult("狗", "type");
              }}
            />
            <Text>狗</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="cat"
              status={animalChecked === "cat" ? "checked" : "unchecked"}
              onPress={() => {
                setAnimalChecked("cat"), handleInputResult("貓", "type");
              }}
            />
            <Text>貓</Text>
          </View>
        </View>
        <View>
          <Picker
            name="breed"
            selectedValue={animalDetail.breed}
            onValueChange={(value) => {
              handleInputResult(value, "breed");
            }}
          >
            {animalType[animalChecked].map((type, idx) => {
              return <Picker.Item label={type} value={type} />;
            })}
          </Picker>
        </View>
        {animalText.map((animal, idx) => {
          return (
            <View key={idx} style={styles.inputDetail}>
              <Text>{animal.text}:</Text>
              <TextInput
                placeholder={animal.placeholder}
                onChangeText={(val) => {
                  handleInputResult(val, animal.key);
                }}
              />
            </View>
          );
        })}
        <View style={styles.inputDetail}>
          <DatePicker
            date={animalDetail.date}
            placeholder="失蹤日期"
            format="YYYY-MM-DD"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
              },
            }}
            onDateChange={(date) => {
              handleInputResult(date, "date");
            }}
          />
        </View>
        <View style={styles.inputDetail}>
          <Text>電話:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="輸入電話"
            onChangeText={(val) => {
              handleInputResult(val, "phone");
            }}
          />
        </View>
        <Button title="送出" onPress={submitForm} />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {!image && <Button title="Upload Image" onPress={pickImage} />}
        {image && (
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  detailBox: {
    flex: 1.5,
    flexDirection: "row",
    position: "relative",
    width: "100%",
    height: "60%",
    alignItems: "center",
    paddingLeft: 30,
  },
  inputDetail: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    height: "60%",
    width: "30%",
  },
});
