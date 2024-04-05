import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogoutButton from "./Logout";
import { supabase } from "../../initSupabase";

const Canteen = ({ user, navigation }) => {
  const [breakfastCount, setBreakfastCount] = useState(0);
  const [lunchCount, setLunchCount] = useState(0);
  const [dinnerCount, setDinnerCount] = useState(0);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
        const { data, error } = await supabase
          .from("Meal")
          .select("*")
          .eq("canteen_id", user.id)
          .eq("reservation_date", today);
        if (error) {
          console.error("Error fetching meals:", error.message);
        } else {
          console.log("Meals:", data);
          const breakfast = data.filter((meal) => meal.meal_type == 1).length;
          const lunch = data.filter((meal) => meal.meal_type == 2).length;
          const dinner = data.filter((meal) => meal.meal_type ==3).length;
          setBreakfastCount(breakfast);
          setLunchCount(lunch);
          setDinnerCount(dinner);
        }
      } catch (error) {
        console.error("Error fetching meals:", error.message);
      }
    };
    if (user) {
      getMeals();
    }
  }, [user]);
  

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Canteen {user.name}</Text>
      <LogoutButton navigation={navigation} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>
            Breakfast Today - {breakfastCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Lunch Today - {lunchCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Dinner Today - {dinnerCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Canteen;
