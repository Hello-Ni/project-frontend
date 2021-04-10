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
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import Geocoder from "react-native-geocoding";
import MapView, { Marker, Polygon } from "react-native-maps";
import { base, axios } from "../axios";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import { animalType } from "../scripts/animal";
export default function RegisterWindow({ navigation }) {
  Geocoder.init("AIzaSyDonjbD-iLIzfrKhky6ESfjfTtxso5vJG0"); // use a valid API key
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("0.5");
  const [polygons, setPolygons] = useState([
    { latitude: 22.997835714925152, longitude: 120.19910163770508 },
  ]);
  const [inputLoc, setInputLoc] = useState({
    latitude: 22.997800066043517,
    longitude: 120.20266576552974,
  });
  const [initLoc, setInitLoc] = useState({
    latitude: 22.997800066043517,
    longitude: 120.20266576552974,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
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
  const calculateRectangle = (distance, loc) => {
    let radius = 6371;
    let dis = distance;
    let dlng =
      2 *
      Math.asin(
        Math.sin(dis / (2 * radius)) / Math.cos((loc.latitude * Math.PI) / 180)
      );

    dlng = (dlng * 180) / Math.PI;
    let dlat = dis / radius;
    dlat = (dlat * 180) / Math.PI;
    let rectangle = {
      left: parseFloat(loc.longitude) - dlng,
      right: parseFloat(loc.longitude) + dlng,
      top: parseFloat(loc.latitude) + dlat,
      bottom: parseFloat(loc.latitude) - dlat,
    };
    setPolygons([
      { latitude: rectangle.top, longitude: rectangle.left },
      { latitude: rectangle.top, longitude: rectangle.right },
      { latitude: rectangle.bottom, longitude: rectangle.right },
      { latitude: rectangle.bottom, longitude: rectangle.left },
    ]);
    return rectangle;
  };
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
    console.log(animalDetail);
    // await axios
    //   .post(`${base}/maps/insert`, {
    //     location: JSON.stringify(inputLoc),
    //     detail: JSON.stringify(animalDetail),
    //   })
    //   .then((res) => {
    //     console.log(res.data.status);
    //   });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {/* <View style={styles.inputBox}>
          <TextInput
              placeholder="請輸入地點"
              onChangeText={(val)=>{setAddress(val)}}
              onSubmitEditing={testHandler}
              value={address}       
            >
          </TextInput>
          <TouchableOpacity  onPress={()=> testHandler()}>
            <FontAwesome5 name="search" size={20} color="#BEBEBE" />
          </TouchableOpacity>        
        </View> */}
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
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {!image && <Button title="Upload Image" onPress={pickImage} />}
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150 }}
              />
            )}
          </View>
        </View>
        <MapView
          initialRegion={initLoc}
          showsUserLocation={true}
          onPress={(event) => {
            setInputLoc(event.nativeEvent.coordinate);
            calculateRectangle(1, event.nativeEvent.coordinate);
          }}
          onPoiClick={(event) => {
            console.log(event.nativeEvent.name);
            setInputLoc(event.nativeEvent.coordinate);
            calculateRectangle(1, event.nativeEvent.coordinate);
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: inputLoc.latitude,
              longitude: inputLoc.longitude,
            }}
          />
          <Polygon coordinates={polygons} tappable={false} />
        </MapView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  inputBox: {
    position: "absolute",
    width: "90%",
    height: "7%",
    margin: 20,
    padding: 10,
    top: 0,
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailBox: {
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
