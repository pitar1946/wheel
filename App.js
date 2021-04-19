import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  TouchableOpacity, Dimensions,
} from "react-native";
import Knob from "./knob.svg";
import { SvgCss, SvgXml } from "react-native-svg";

import WheelBtn from "./wheel-button.svg";

import WheelOfFortune from "./WheelOfFortune";

const participants = [
  "5",
  "10",
  "5",
  "20",
  "15",
  "1",
  "25",
  "",
];

const { width } = Dimensions.get("screen");

const App = () => {
  const [winner, setWinner] = useState({
    winnerValue: null,
    winnerIndex: null,
  });


  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 1,
    borderColor: "#B62203",
    innerRadius: 50,
    duration: 2000,
    backgroundColor: "#B62203",
    textColor: "#B62203",
    fontWeight: "600",
    colors: ["#F8920F", "#D07C0F"],
    textAngle: "horizontal",
    knobSource: require("./knob.png"),
    onRef: ref => (this.child = ref),
  };

  let fail = "mudo Marijanovo";

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            setWinner({
                ...winner,
                winnerValue: value, winnerIndex: index,
              },
            );
          }} />
        <View style={styles.startButtonView}>
          <TouchableOpacity
            onPress={() => (
              setWinner({
                  ...winner,
                  winnerIndex: null,
                  winnerValue: null
                },
              ),
                this.child._tryAgain()
            )}
            style={styles.startButton}>
            <Image source={require("./wheel-button.png")} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {winner.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              You win {winner.winnerValue  !== '' ? winner.winnerValue : fail}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    width: width,
    height: width - 50,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonView: {
    position: "absolute",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    width: 110,
    height: 100,
  },
  startButtonText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  winnerView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
  },

  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
