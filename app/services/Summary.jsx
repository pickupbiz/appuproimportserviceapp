import { View, Text, StyleSheet } from "react-native";

const Summary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Customer Rate KG Screen</Text>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4f7" },
  text: { fontSize: 20, fontWeight: "bold", color: "#333" },
});
