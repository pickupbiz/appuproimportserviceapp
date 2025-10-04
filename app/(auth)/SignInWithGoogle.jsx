import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      // ⚠️ Abhi ke liye aapka Android client_id
      webClientId:
        "817917458559-3oas3iqgcc8l2jgg96amvnhh7befs657.apps.googleusercontent.com",
      offlineAccess: true,
      scopes: ["profile", "email"],
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const { email, name, photo } = userInfo.user;

      // ✅ Save user to AsyncStorage
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({ email, name, photo })
      );

      console.log("User saved:", email);

      // ✅ Navigate to Home
      router.replace("/(tabs)/index");
    } catch (error) {
      console.error("Google Sign-In error:", error);
      Alert.alert("Error", "Google Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        <Image
          source={require("../../assets/images/google.png")}
          style={styles.googleIcon}
        />
        {loading ? (
          <ActivityIndicator size="small" color="#555" />
        ) : (
          <Text style={styles.googleText}>Sign in with Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SignInWithGoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#fff",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#026f1271",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginTop:10,
    
  },
  googleIcon: { width: 40, height: 40,backgroundColor:"#fff", borderRadius:30,},
  googleText: { fontSize:12, fontWeight: "600", color: "#fff",paddingLeft:5 },
});
