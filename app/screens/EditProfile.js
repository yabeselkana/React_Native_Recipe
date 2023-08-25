import { StyleSheet, useColorScheme, ScrollView, View, Text, TextInput, Pressable, TouchableHighlight, KeyboardAvoidingView, Image, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useSearchParams } from "expo-router";
import { Icon } from "@rneui/themed";
import { Snackbar } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Box, Center, NativeBaseProvider } from "native-base";

const EditProfile = ({ route, navigation }) => {
  const { users_id, users_name, users_phone, getData } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useNavigation();

  const [name, setName] = useState(users_name);
  const [phone, setPhone] = useState(users_phone);
  const [photo, setphoto] = useState(null);
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
      formData.append("users_name", name);
      formData.append("users_phone", phone);

      if (photo) {
        formData.append("users_photo", {
          uri: photo,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }
      const recipes = await axios.put(`http://172.20.10.5:7474/users/profile/${users_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (recipes.data.statusCode === 200) {
        setModalVisible(false);
        alert("Profile Success");
        getData();
        navigation.goBack();
      }
      const result = recipes.data.data;
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Pressable onPress={() => router.goBack()} style={{ marginRight: 20 }}>
            <Icon name="chevron-left" size={30} color="#EEC302" />
          </Pressable>
          <Text style={styles.nameText}>Edit Profile</Text>
        </View>
        <Center>
          <Box mt={18}>
            <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, width: 380, height: 60 }}>
              {photo && <Image source={{ uri: photo }} style={{ width: 50, height: 50 }} />}
              <TouchableOpacity onPress={pickImage} style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
                <Icon as={<FeatherIcon name="image" />} size={7} ml="5" color="muted.500" />
                <Text style={{ marginLeft: 10, fontSize: 13, fontWeight: "200" }}>Add Image Pfofile</Text>
              </TouchableOpacity>
            </View>
          </Box>
        </Center>

        <TextInput style={styles.inputActive} placeholder="Name" name="fullname" value={name} onChangeText={(value) => setName(value)} />
        <TextInput style={styles.inputActive} placeholder="Phone Number" name="phoneNumber" keyboardType="numeric" value={phone} onChangeText={(value) => setPhone(value)} />
        <TouchableHighlight underlayColor="white" onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Save Profile"}</Text>
          </View>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  nameText: {
    color: "#000",
    fontSize: 20,
  },
  profileIcon: {
    padding: 20,
    margin: 20,
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: "contain",
    alignSelf: "center",
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputActive: {
    height: 50,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#EFC81A",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#EFC81A",
    borderRadius: 10,
    margin: 12,
  },
  buttonText: {
    textAlign: "center",
    padding: 12,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
