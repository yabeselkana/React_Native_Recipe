import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Box, Button, Center, Container, Icon, Image, Input, NativeBaseProvider } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";

const UpdateRecipe = ({ route, navigation }) => {
  const { recipes_title, recipes_id, recipes_video, recipes_photo, recipes_ingredients, getData } = route.params;

  const [title, setTitle] = useState(recipes_title);
  const [ingredients, setingredients] = useState(recipes_ingredients);
  const [photo, setphoto] = useState(null);
  const [video, setVideo] = useState(recipes_video);
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setphoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("recipes_title", title);
      formData.append("recipes_ingredients", ingredients);
      formData.append("recipes_video", video);
      if (photo) {
        formData.append("recipes_photo", {
          uri: photo,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }
      const recipes = await axios.put(`http://172.20.10.5:7474/recipes/${recipes_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (recipes.data.statusCode === 200) {
        setModalVisible(false);
        alert("Update Recipe Success");
        getData();
        navigation.goBack();
      }
      const result = recipes.data.data;
      dispatch({ type: "UPDATE_RECIPE", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
        <View style={{ flex: 1, marginTop: 20 }}>
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize: 25, fontWeight: "700", color: "#EEC302", marginVertical: 20 }}>Update Your Recipe</Text>
          </View>
          <Box mt={18}>
            <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, width: 350, height: 60 }}>
              {photo && <Image source={{ uri: photo }} style={{ width: 50, height: 50 }} />}
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
              placeholder="Title"
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
          </Box>
          <Box mt={18}>
            <Input backgroundColor="#FFFFFF" borderRadius={5} w={350} h={200} style={{ paddingBottom: 160 }} placeholder="ingredients" value={ingredients} onChangeText={(value) => setingredients(value)} />
          </Box>
          <Box mt={18}>
            <Input
              backgroundColor="#FFFFFF"
              borderRadius={10}
              w={350}
              h={60}
              InputLeftElement={<Icon as={<FeatherIcon name="video" />} size={7} ml="5" color="muted.500" />}
              placeholder="Masukan Url Video"
              value={video}
              onChangeText={setVideo}
            />
          </Box>

          <Button width={320} mt={5} style={{ backgroundColor: "#EFC81A" }} borderRadius={7} onPress={handleSubmit}>
            Update
          </Button>
        </View>
      </Center>
    </NativeBaseProvider>
  );
};

export default UpdateRecipe;

const styles = StyleSheet.create({});
