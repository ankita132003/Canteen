import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView  , StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../../initSupabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaceholderImage = require("../../assets/canteen.png");



const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkUserLoggedIn() {
      const userString = await AsyncStorage.getItem("user");
      console.log("userString:", userString);
      if (userString) {
        navigation.navigate("Home");
      }
    }
    checkUserLoggedIn();
  }, [navigation]);

  const signInWithEmail = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", email.trim().toLowerCase())
        .eq("password", password);
      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      if (data.length === 0) {
        alert("Invalid email or password");
        setLoading(false);
        return;
      }
      alert("Login successful");
      await AsyncStorage.setItem("user", JSON.stringify(data[0]));
      navigation.navigate("Home");
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred. Please try again");
      setLoading(false);
    }
    console.log("email:", email, "password:", password);
  };

  const signUpWithEmail = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <View>
        <Text style={styles.login}>Login</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  image: {
    width: "auto",
    height: 250,
    borderRadius: 18,
  },
  login: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
});

export default Login;
