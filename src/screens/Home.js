import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Employe from "../components/Employe";
import Canteen from "../components/Canteen";

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [user_type, setUserType] = useState(null);


  useEffect(() => {
    const getUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        console.log("user:", user);

        setUser(user);
        setUserType(user.user_type);
      }
    }
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      {
        user_type === true ? (
          <Employe
          user={user}
          navigation = {navigation}
          />
        ) : (
          <Canteen
          user={user}
          navigation = {navigation}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    margin: 8,
    flexBasis: "48%", // Adjust based on your design
  },
  selectedCard: {
    borderColor: "blue",
    borderWidth: 2,
  },
  list: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Home;

