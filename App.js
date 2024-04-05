import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./initSupabase";
import { AuthContext } from "./AuthContext";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Signup from "./src/screens/Signup";
import CanteenDetails from "./src/screens/CanteenDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const authContext = useMemo(() => ({
    signIn: async (data) => {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("user");
        setUser(null);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  }), []);

  const restoreUser = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const userObject = JSON.parse(userString);
        const { data, error } = await supabase
          .from("User")
          .select("*")
          .eq("email", userObject.email)
          .eq("password", userObject.password);
        if (error) {
          console.error("Error restoring user:", error);
        }
        if (data.length > 0) {
          setUser({
            email: data[0].email,
            password: data[0].password,
            user_type: data[0].user_type,
          });
        }
      }
    } catch (error) {
      console.error("Error restoring user:", error);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Canteen Details" component={CanteenDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    justifyContent: "start",
  },
});