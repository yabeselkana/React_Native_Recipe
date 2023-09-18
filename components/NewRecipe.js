import { useNavigation, useRouter } from "expo-router";
import React from "react";

import { StyleSheet, View, Image, Text, Pressable } from "react-native";

const NewRecipe = ({ recipes_title, recipes_id, recipes_video, recipes_photo, recipes_ingredients, getData }) => {
  const Detail = () => {
    route.navigate("Detail", {
      recipes_id,
      getData,
    });
  };

  const route = useNavigation();
  return (
    <Pressable onPress={Detail}>
      <View
        style={{
          marginRight: 15,
        }}
      >
        <Image
         source={recipes_photo === "null" || recipes_photo === null || recipes_photo === "" ? require("../assets/Group43.png") : { uri: recipes_photo }}
          defaultSource={require("../assets/ilustrasi-sate-kambing1.jpg")}
          style={{
            padding: 5,
            width: 140,
            height: 170,
            resizeMode: "cover",
            borderRadius: 15,
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text numberOfLines={2}  style= {styles.newRecipeText}>
            {`${recipes_title}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NewRecipe;

const styles = StyleSheet.create({
  newRecipeText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
