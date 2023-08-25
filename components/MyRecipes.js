import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import UpdateRecipe from "./Modal/UpdateRecipe";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
const MyRecipes = ({ recipes_title, recipes_id, recipes_video, recipes_photo, recipes_ingredients, getData }) => {
  const navigation = useNavigation();
  const openUpdateRecipeModal = () => {
    navigation.navigate("UpdateRecipe", {
      recipes_title,
      recipes_id,
      recipes_video,
      recipes_photo,
      recipes_ingredients,
      getData,
    });
  };

  const handleDelete = async () => {
    try {
      axios
        .delete(`http://172.20.10.5:7474/recipes/${recipes_id}`)
        .then((result) => {
          alert("Delete Recipe ");
          getData();
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {}
  };
  return (
    <>
      <View style={styles.popularCard}>
        <Image source={recipes_photo === "null" || recipes_photo === null || recipes_photo === "" ? require("../assets/Group43.png") : { uri: recipes_photo }} style={styles.popularImage} />
        <View>
          <Text style={styles.popularText} numberOfLines={1}>
            {/* {recipe?.title} */}
            {recipes_title}
          </Text>
          <Text>spicy, salted</Text>
        </View>
        <Pressable style={styles.item} onPress={openUpdateRecipeModal}>
          <MaterialIcons name="edit" size={30} style={{ backgroundColor: "white" }} />
        </Pressable>
        <Pressable style={styles.delete} onPress={handleDelete}>
          <MaterialIcons name="delete" size={30} style={{ backgroundColor: "white" }} />
        </Pressable>
      </View>
    </>
  );
};

export default MyRecipes;

const styles = StyleSheet.create({
  popularCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    gap: 20,
    zIndex: 1,
  },
  popularText: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "800",
    color: "black",
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  item: {
    marginBottom: 6,
    marginLeft: 90,
    flexDirection: "row",
    color: "#EEC302",
  },
  delete: {
    marginBottom: 20,
    marginRight: 1,
  },
});
