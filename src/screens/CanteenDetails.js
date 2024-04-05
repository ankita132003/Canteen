import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {useRoute} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../initSupabase";

const CanteenDetails = () => {
  const route = useRoute();
  
  const navigation = useNavigation();
  const [selectedCanteen, setSelectedCanteen] = useState(null);

  const canteens = [
    {
      id: 1,
      name: "Breakfast",
    },
    {
      id: 2,
      name: "Lunch",
    },
    {
      id: 3,
      name: "Dinner",
    },
  ];

  const handleCanteenPress = async(id) => {
    setSelectedCanteen(id);
    navigation.navigate("Canteen Details", { canteenId: id });
  };

  const handleBooking = async(meal) => {
    const canteen = route.params.canteenId;
    console.log(canteen);
    const userInfo  = await AsyncStorage.getItem("user");
    const user = JSON.parse(userInfo);

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();


    //  if greater than 10am, and boking breskfast then   book for tommorow
    if (currentHour > 10 && meal.id === 1) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // if greater than 6pm, and booking lunch then book for tommorow
    if (currentHour > 18 && meal.id === 2) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // if greater than 10pm, and booking dinner then book for tommorow
    if (currentHour > 22 && meal.id === 3) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(currentDate);

    //  current data is in the format of 2021-09-01

    const bookingDate = currentDate.toISOString().split("T")[0];
    console.log(bookingDate);

 
    const { data, error } = await supabase
      .from("Meal")
      .insert([{ employee_id: user.id, canteen_id: canteen, meal_type: meal.id
        , reservation_date: bookingDate
      }]);

    if (error) {
      alert("Error booking canteen." , error);
      return;
    }
    navigation.navigate("Home");
    alert(`Booking confirmed for ${meal.name} in canteen for  ${bookingDate}.`);
  };

  const renderCanteenItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCanteenPress(item.id)}>
      <Card style={[styles.card, selectedCanteen === item.id && styles.selectedCard]}>
        <Card.Content>
          <Title>{item.name}</Title>
          <TouchableOpacity onPress={() => handleBooking(item)} style={styles.bookingButton}>
            <Text>Book {item.name}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Choose Your Meal </Text>
      </View>
      <FlatList
        data={canteens}
        renderItem={renderCanteenItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
    flexBasis: "100%", // Adjust based on your design
  },
  selectedCard: {
    borderColor: "blue",
    borderWidth: 2,
  },
  bookingButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "lightblue",
    alignItems: "center",
    borderRadius: 5,
  },
  text:{
    fontSize:26,
    fontWeight:'bold',
    marginBottom:10,
    fontStyle: 'italic'
  }
});

export default CanteenDetails;
