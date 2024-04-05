import React from "react";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutButton = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      alert("Logged out successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
