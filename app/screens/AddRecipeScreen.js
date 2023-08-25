import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Box, Button, Center, Container, Icon, Image, Input, NativeBaseProvider, TextArea } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "expo-router";

const AddRecipeScreen = ({ navigation }) => {
  const [recipes_title, setRecipes_title] = useState("");
  const [recipes_ingredients, setRecipes_ingredients] = useState("");
  const [recipes_photo, setRecipes_photo] = useState(null);
  const [recipes_video, setRecipes_video] = useState("");
  const route = useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setRecipes_photo(result.assets[0].uri);
    }
  };

  console.log(recipes_photo);

  const handleSubmit = async () => {
    try {
      const users_id = await AsyncStorage.getItem("users_id");
      const formData = new FormData();
      formData.append("recipes_title", recipes_title);
      formData.append("recipes_ingredients", recipes_ingredients);
      formData.append("recipes_video", recipes_video);
      formData.append("users_id", users_id);
      if (recipes_photo) {
        formData.append("recipes_photo", {
          uri: recipes_photo,
          name: "recipes_photo.jpg",
          type: "image/jpeg",
        });
      }
      const res = await axios.post("http://172.20.10.5:7474/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRecipes_title(""), setRecipes_ingredients(""), setRecipes_video("");
      alert("Succes");
      route.goBack;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
        <View style={{ flex: 1, marginTop: 20 }}>
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize: 25, fontWeight: "700", color: "#EEC302", marginVertical: 20 }}>Add Your Recipe</Text>
          </View>
          <Box mt={18}>
            {recipes_photo && <Image source={{ uri: recipes_photo }} style={{ width: 50, height: 50 }} />}
            <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, width: 350, height: 60 }}>
              <TouchableOpacity onPress={pickImage} style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
                <Icon as={<FeatherIcon name="image" />} size={7} ml="5" color="muted.500" />
                <Text style={{ marginLeft: 10, fontSize: 13, fontWeight: "200" }}>Add Image</Text>
              </TouchableOpacity>
            </View>
          </Box>
          <Box mt={30}>
            <Input
              backgroundColor="#FFFFFF"
              borderRadius={5}
              w={350}
              h={60}
              InputLeftElement={<Icon as={<FeatherIcon name="book-open" />} size={7} ml="5" color="muted.500" />}
              value={recipes_title}
              placeholder="Title"
              onChangeText={setRecipes_title}
            />
          </Box>
          <Box mt={18}>
            <TextArea backgroundColor="#FFFFFF" borderRadius={5} w={350} h={200} style={{ paddingBottom: 160 }} placeholder="Description" value={recipes_ingredients} onChangeText={setRecipes_ingredients} />
          </Box>
          <Box mt={18}>
            <Input
              backgroundColor="#FFFFFF"
              borderRadius={10}
              w={350}
              h={60}
              InputLeftElement={<Icon as={<FeatherIcon name="video" />} size={7} ml="5" color="muted.500" />}
              placeholder="Masukan Url Video"
              value={recipes_video}
              onChangeText={setRecipes_video}
            />
          </Box>

          <Button width={350} mt={5} style={{ backgroundColor: "#EFC81A" }} borderRadius={7} onPress={handleSubmit}>
            CREATE
          </Button>
        </View>
      </Center>
    </NativeBaseProvider>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({});
