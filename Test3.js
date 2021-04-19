import React, { Component } from "react";
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

const { width, height } = Dimensions.get("screen");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 50,
      borderWidth: 1,
      borderColor: "#B62203",
      innerRadius: 50,
      duration: 6000,
      backgroundColor: "#B62203",
      textColor: "#B62203",
      fontWeight: "600",
      colors: ["#F8920F", "#D07C0F"],
      textAngle: "horizontal",
      knobSource: require("./knob.png"),
      onRef: ref => (this.child = ref),
    };
    return (
      <>
        <View style={styles.container}>
          <StatusBar barStyle={"light-content"} />
          <WheelOfFortune
            options={wheelOptions}
            getWinner={(value, index) => {
              this.setState({ winnerValue: value, winnerIndex: index });
            }}
          />
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => (

                this.setState({
                    started: true,
                    winnerIndex: null,
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
          {this.state.winnerIndex != null && (
            <View style={styles.winnerView}>
              <Text style={styles.winnerText}>
                You win {participants[this.state.winnerIndex]}
              </Text>
            </View>
          )}
        </View>
      </>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    width: width,
    height: width - 50,
    alignItems: "center",
    justifyContent: "center"
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
    bottom: 100
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
