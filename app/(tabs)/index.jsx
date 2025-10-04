// import { useRouter } from "expo-router";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// export default function HomeScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Home Tab</Text>

//       <Pressable
//         style={styles.button}
//         onPress={() => router.push("/(auth)/LoginScreens")}
//       >
//         <Text style={styles.buttonText}>Go to Login</Text>
//       </Pressable>

//       <Pressable
//         style={styles.button}
//         onPress={() => router.push("/services/CustomerRateKg")}
//       >
//         <Text style={styles.buttonText}>Customer Rate KG</Text>
//       </Pressable>

//       <Pressable
//         style={styles.button}
//         onPress={() => router.push("/services/CustomerRateCbm")}
//       >
//         <Text style={styles.buttonText}>Customer Rate CBM</Text>
//       </Pressable>

//       <Pressable
//         style={styles.button}
//         onPress={() => router.push("/services/Summary")}
//       >
//         <Text style={styles.buttonText}>Summary</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f4f7",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 30,
//     color: "#333",
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#4e8cff",
//     paddingVertical: 15,
//     paddingHorizontal: 25,
//     borderRadius: 10,
//     marginVertical: 10,
//     width: "70%",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

//New
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const IMAGES = [
  "https://www.legalwiz.in/wp-content/uploads/How-to-start-import-export-business-in-india-600x322.jpg",
  "https://plus.unsplash.com/premium_photo-1661963559074-9655a9404f1a?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://ipqi.org/wp-content/uploads/2023/06/imports-and-exports-1024x684.webp",
  "https://ehishab.com/wp-content/uploads/2023/05/export-import-1-1.png",
];

const DRAWER_ITEMS = [
  { title: "Customer Rate KG", route: "/services/CustomerRateKg" },
  { title: "Customer Rate CBM", route: "/services/CustomerRateCbm" },
  { title: "Summary", route: "/services/Summary" },
];

const HOME_CARDS = [
  {
    title: "Customer Rate KG",
    icon: <MaterialIcons name="scale" size={28} color="#07a641ff" />,
    route: "/services/CustomerRateKg",
  },
  {
    title: "Customer Rate CBM",
    icon: <FontAwesome5 name="boxes" size={28} color="#07a641ff" />,
    route: "/services/CustomerRateCbm",
  },
  {
    title: "Summary",
    icon: <Ionicons name="document-text" size={28} color="#07a641ff" />,
    route: "/services/Summary",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@loggedUser");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // Fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % IMAGES.length;
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (route) => {
    setMenuOpen(false);
    router.push(route);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@loggedUser");
      setUser(null);
      router.replace("/(auth)/LoginScreens");
    } catch (error) {
      console.log("Error clearing user:", error);
    }
  };

  return (
    <ImageBackground style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>AppPro App</Text>

        <Pressable onPress={() => setProfileOpen(true)}>
          <Ionicons name="person-circle" size={32} color="#fff" />
        </Pressable>
      </View>

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={IMAGES}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.carouselImage} />
            )}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(ev) => {
              const index = Math.round(ev.nativeEvent.contentOffset.x / width);
              setCurrentIndex(index);
              currentIndexRef.current = index;
            }}
          />
          <View style={styles.dotContainer}>
            {IMAGES.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, { opacity: i === currentIndex ? 1 : 0.3 }]}
              />
            ))}
          </View>
        </View>

        {/* Cards */}
        <View style={styles.cardContainer}>
          {HOME_CARDS.map((card, i) => (
            <Pressable
              key={i}
              style={styles.card}
              onPress={() => navigateTo(card.route)}
            >
              {card.icon}
              <Text style={styles.cardText}>{card.title}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {/* Drawer */}
      <Modal visible={menuOpen} transparent animationType="slide">
        <View style={styles.menuOverlay}>
          <View style={styles.menuDrawer}>
            <Text style={styles.menuTitle}>Menu</Text>
            {DRAWER_ITEMS.map((item, i) => (
              <Pressable
                key={i}
                style={styles.menuItem}
                onPress={() => navigateTo(item.route)}
              >
                <Text style={styles.menuText}>{item.title}</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.menuClose}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={styles.menuCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal visible={profileOpen} transparent animationType="slide">
        <View style={styles.profileOverlay}>
          <View style={styles.profileCard}>
            <Ionicons name="person-circle" size={80} color="#07a641ff" />
            <Text style={styles.profileName}>Logged In User</Text>
            <Text style={styles.profileEmail}>Email: {user?.email}</Text>
            <Text style={styles.profileEmail}>Password: {user?.password}</Text>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>

            <Pressable onPress={() => setProfileOpen(false)}>
              <Text style={styles.closeProfile}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(3, 123, 27, 0.86)",
    marginBottom: 0,
  },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#015115ff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    paddingTop: 40,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  carouselContainer: { height: 200, marginBottom: 20 },
  carouselImage: {
    width: width - 40,
    height: 200,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  card: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
  },
  menuDrawer: {
    width: "65%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#07a641ff",
  },
  menuItem: { paddingVertical: 12 },
  menuText: { fontSize: 18, color: "#333" },
  menuClose: { marginTop: 20, alignSelf: "flex-start" },
  menuCloseText: { color: "red", fontSize: 16 },
  profileOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  profileName: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  profileEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#07a641ff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  closeProfile: { color: "red", marginTop: 10, fontSize: 16 },
});
