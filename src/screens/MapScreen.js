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
  Image,
  PermissionsAndroid,
} from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, {
  Marker,
  Polygon,
  Polyline,
  Circle,
  Geojson,
} from "react-native-maps";
import { base, axios } from "../axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { circle } from "react-native/Libraries/Animated/src/Easing";
export default function MapWindow({ navigation }) {
  Geocoder.init("AIzaSyDonjbD-iLIzfrKhky6ESfjfTtxso5vJG0"); // use a valid API key
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("1");
  const [polygons, setPolygons] = useState([
    { latitude: 22.997835714925152, longitude: 120.19910163770508 },
    { latitude: 22.997835714926152, longitude: 120.19910163780508 },
  ]);
  const [inputLoc, setInputLoc] = useState({
    latitude: 22.997800066043517,
    longitude: 120.20266576552974,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [markers, setMarkers] = useState([]);
  const [details, setDetails] = useState([]);
  const [animalDetail, setAnimalDetail] = useState({ showing: false });
  const submitHandler = async () => {
    //console.log(address)
    await Geocoder.from(address)
      .then(async (json) => {
        let searchLoc = json.results[0].geometry.location;
        let Loc = {
          latitude: searchLoc.lat,
          longitude: searchLoc.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };

        setInputLoc(Loc);
        let region = calculateShape(parseFloat(distance), Loc);
        let res = await axios.post(`${base}/maps/search`, region);
        setMarkers(res.data.data);
      })
      .catch((error) => console.warn(error));
  };
  const tapHandler = async (loc) => {
    console.log(loc);
    let newLoc = {
      latitude: loc.latitude,
      longitude: loc.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    setInputLoc(newLoc);
    let region = calculateShape(parseFloat(distance), newLoc);
    console.log(region);
    let res = await axios.post(`${base}/maps/search`, region);
    setMarkers(res.data.places);
    setDetails(res.data.details);
  };
  const calculateShape = (distance, loc) => {
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
  const selectAnimalView = (target, idx) => {
    let t = { ...details[idx] };
    t.showing = true;
    console.log(t);
    setAnimalDetail(t);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setAnimalDetail({ showing: false });
      }}
    >
      <View style={styles.container}>
        <MapView
          initialRegion={inputLoc}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          style={styles.map}
          onPress={(event) => {
            tapHandler(event.nativeEvent.coordinate);
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.lat, longitude: marker.lng }}
              title={marker.type}
              onPress={() => selectAnimalView(marker, index)}
              isPreselected={true}
            />
          ))}
          <Circle
            center={inputLoc}
            radius={parseFloat(distance) * 1000 * (1 / Math.sin(Math.PI / 4))}
          ></Circle>
        </MapView>
        <View style={styles.showBox}></View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="請輸入地點"
            onChangeText={(val) => {
              setAddress(val);
            }}
            onSubmitEditing={submitHandler}
            value={address}
          ></TextInput>
          <TouchableOpacity onPress={() => submitHandler()}>
            <FontAwesome5 name="search" size={20} color="#BEBEBE" />
          </TouchableOpacity>
        </View>
        {animalDetail.showing && (
          <View style={styles.detailBox}>
            <Image style={styles.photo} source={{ uri: animalDetail.image }} />
            <View>
              <Text>寵物名字:{animalDetail.name}</Text>
              <Text>品種:{animalDetail.type}</Text>
              <Text>特徵:{animalDetail.feature}</Text>
              <Text>失蹤日期:{animalDetail.date}</Text>
              <Text>失主:{animalDetail.owner}</Text>
              <Text>電話:{animalDetail.phone}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    position: "absolute",
    backgroundColor: "#fff",
    width: "85%",
    height: "30%",
    bottom: 0,
    alignItems: "center",
    paddingLeft: 30,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  photo: {
    height: "60%",
    width: "30%",
  },
});
