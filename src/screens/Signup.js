import React, { useState } from "react";
import { StyleSheet, View, Image, Text  , ScrollView} from "react-native";
import { Button, Input } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { supabase } from "../../initSupabase";


const PlaceholderImage = require("../../assets/canteen.jpg");
const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("employee"); 

  const signUpWithEmail = async () => {
    setLoading(true);
   
    try{
      if (!email || !password || !role || !name) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        alert("Password must be atleast 6 characters");
        setLoading(false);
        return;
      }
      let user_type;
      if (role === "employee") {
        user_type  = true;
      }
      if (role === "canteen") {
        user_type = false;
      }
      const {data  , error}  = await supabase
      .from('User')
      .insert([
        {email: email.trim().toLowerCase()
        , password: password, user_type: user_type , name: name}
      ]);

      if (error) {
        alert(error.message);
        return;
      }
      alert("User created successfully");
      navigation.navigate("Login");
      console.log(email, password, role);
      setLoading(false);
    }catch(err){
      console.log(err);
      alert("An error occurred. Please try again");
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <View>
        <Text style={styles.signup}>Sign Up</Text>
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Name"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
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
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
  <RNPickerSelect
    placeholder={{ label: "Select Role", value: null }}
    onValueChange={(value) => setRole(value)}
    items={[
      { label: "Employee", value: "employee" },
      { label: "Canteen", value: "canteen" },
    ]}
    value={role} 
    sstyle={{
      inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, 
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, 
      },
    }}
  />
</View>
      <View style={styles.verticallySpacedButton}>
        <Button
        
          title="Create Account"
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
  image: {
    width: "auto",
    height: 250,
    borderRadius: 18,
  },
  signup: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  verticallySpacedButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
  },
});

export default Signup;
