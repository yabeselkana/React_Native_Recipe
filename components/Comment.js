import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import UpdateRecipe from "./Modal/UpdateRecipe";
import { useNavigation } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { AntDesign, Feather, Foundation, Ionicons } from "@expo/vector-icons";
const Comment = ({ comment_id, comment_text, users_photo }) => {
  const navigation = useNavigation();

  const DeleteComment = async () => {
    axios
      .delete(`http://172.20.10.2:7474/likeds/${likeds_id}`)
      .then((result) => {
        console.log(result);
        alert("Delete Like");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.popularCard}>
        <Image source={users_photo === "null" || users_photo === null || users_photo === "" ? require("../assets/user.jpg") : { uri: recipes_photo }} style={styles.popularImage} />
        <View>
          <Text style={styles.popularText} numberOfLines={1}>
            {comment_text}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  popularCard: {
    padding: 10,
    width: 350,
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
    borderRadius: 50,
  },
  item: {
    marginBottom: 6,
    marginLeft: 90,
  },
  delete: {
    marginBottom: 20,
    marginRight: 1,
  },
});
