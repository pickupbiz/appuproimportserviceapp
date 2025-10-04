import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#047520" }, // Header ka bg
          headerTintColor: "#fff", // Header title aur back arrow ka color
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="CustomerRateKg"
          options={{
            title: "Customer Rate KG",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="CustomerRateCbm"
          options={{
            title: "Customer Rate CBM",

            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Summary"
          options={{
            title: "Summary",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
