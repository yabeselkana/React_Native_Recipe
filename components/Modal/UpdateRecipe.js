import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React from "react";
import { Modal, Button, Input, FormControl, HStack, Center, NativeBaseProvider, Box, Icon, TextArea } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const UpdateRecipe = ({ recipes_title, recipes_id, recipes_video, recipes_photo, recipes_ingredients }) => {
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

  return (
    <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} animationType="slide">
        <Modal.Content>
          <Modal.CloseButton />
          <View style={styles.modalView}>
            <Text fontSize={20}>Update</Text>
            <Text mt={3}>Title</Text>
            <Input value={title} onChangeText={(value) => setTitle(value)} />
            <Text mt={3}>Ingredients</Text>
            <TextArea value={ingredients} onChangeText={(value) => setingredients(value)} />
            <Text mt={3}>Url Video</Text>
            <Input value={video} onChangeText={(value) => setVideo(value)} />
            <Text mt={3}>Picture</Text>
            <Button mt={3} onPress={pickImage} backgroundColor={"transparent"}>
              <FeatherIcon name="camera" size={20} color={"black"} />
            </Button>
          </View>
        </Modal.Content>
      </Modal>
      <HStack space="4" justifyContent="center" alignItems="center">
        <Button
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <MaterialIcons name="edit" size={30} style={{ backgroundColor: "white" }} />
        </Button>
      </HStack>
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <UpdateRecipe />
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
