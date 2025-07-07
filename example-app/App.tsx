import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { sum } from "node-api-example-lib";

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        value={a}
        onChangeText={setA}
        selectTextOnFocus
      />
      <Text style={styles.text}>+</Text>
      <TextInput
        style={styles.input}
        value={b}
        onChangeText={setB}
        selectTextOnFocus
      />
      <Text style={styles.text}>
        = {sum(parseFloat(a), parseFloat(b)) || "?"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    fontSize: 20,
    textAlign: "center",
    minWidth: 100,
    borderBottomWidth: 1,
    borderColor: "#aaa",
    margin: 10,
  },
});
