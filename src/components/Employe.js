import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet  , FlatList , TouchableOpacity} from "react-native";
import LogoutButton from "./Logout";
import { supabase } from "../../initSupabase";
import { Card, Title } from "react-native-paper";

const Employee = ({ user, navigation }) => {
  const [canteens, setCanteens] = useState([]); 
  const [selectedCanteen, setSelectedCanteen] = useState(null);

  const handleCanteenPress = (id) => {
    setSelectedCanteen(id);
    navigation.navigate("Canteen Details", { canteenId: id });
  };

  const handleBooking = (meal) => {
    // Perform booking logic here
    alert(`Booking confirmed for ${meal} in canteen.`);
  };


  useEffect(() => {
    const getCanteens = async () => {
      try {
        const { data, error } = await supabase
          .from("User")
          .select("*")
          .eq("user_type", false);

        if (error) {
          console.error("Error fetching canteens:", error.message);
          alert("Error fetching canteens");
        } else {
          console.log("Canteens:", data);
          setCanteens(data);
        }
      } catch (error) {
        console.error("Error fetching canteens:", error.message);
        alert("Error fetching canteens");
      }
    };

    getCanteens();
  }, [user]);


  const renderCanteenItem = ({ item }) => {
    if (!item) {
      return <Text>Loading...</Text>;
    }
    return (
      <TouchableOpacity onPress={() => handleCanteenPress(item.id)}>
      <Card style={[styles.card, selectedCanteen === item.id && styles.selectedCard]}>
        <Card.Content>
          <Title>{item.name}</Title>
          <TouchableOpacity onPress={() => handleBooking(item.name)} style={styles.bookingButton}>
            <Text>Book {item.name}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </TouchableOpacity>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user ? user.name : "Employee"}</Text>
      <View >
        
      {canteens.length > 0 ? (
        <FlatList
          data={canteens}
          renderItem={renderCanteenItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      </View>
      <LogoutButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontStyle:'italic'
  },
  card:{
    marginBottom: 15,
  }
});

export default Employee;
