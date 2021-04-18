import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, { Marker, Polygon } from "react-native-maps";
import RegisterPanel from "../components/panel/RegisterPanel";
export default function RegisterWindow({ navigation }) {
  Geocoder.init("AIzaSyDonjbD-iLIzfrKhky6ESfjfTtxso5vJG0"); // use a valid API key
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
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <RegisterPanel inputLoc={inputLoc} />
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
});
