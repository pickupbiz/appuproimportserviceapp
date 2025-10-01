import { useRouter } from "expo-router";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { useDispatch } from "react-redux";

const CustomerRateKg = () => {
  const router = useRouter();
  // const dispatch = useDispatch();

  const [kg, setKg] = useState("");
  const [customerRate, setCustomerRate] = useState("");
  const [ourRate, setOurRate] = useState("");

  const handleNext = () => {
    // Redux action commented
    // const type = "BY_WEIGHT";
    // const payload = { kg, customerRate, ourRate };
    // dispatch({ type, payload });

    // Navigate to CustomerRateCBM page
    router.push({
      pathname: "/services/CustomerRateCbm",
      params: { kg, customerRate, ourRate, total: calculateKG() },
    });
  };

  const handleCancel = () => {
    setKg("");
    setCustomerRate("");
    setOurRate("");
  };

  const calculateKG = () => {
    const k = parseFloat(kg);
    const c = parseFloat(customerRate);
    if (isNaN(k) || isNaN(c)) return "";
    return (k * c).toFixed(2);
  };

  const isNextDisabled =
    !kg || !customerRate || parseFloat(customerRate) <= parseFloat(ourRate);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter KG"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={kg}
          onChangeText={setKg}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Customer Rate"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={customerRate}
          onChangeText={setCustomerRate}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Our Rate"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={ourRate}
          onChangeText={setOurRate}
        />

        <Text style={styles.totalValue}>
          {calculateKG() ? `Total: ${calculateKG()}` : ""}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isNextDisabled && styles.disabledButton]}
            onPress={handleNext}
            disabled={isNextDisabled}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomerRateKg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4e8cff",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4e8cff",
  },
});
