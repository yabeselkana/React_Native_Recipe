import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, VStack, Center, Input, Icon, Stack, Pressable, ZStack, Button, Heading, Box, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/routers";

const Logins = () => {
  const router = useNavigation();
  let [formData, setFormData] = useState({
    users_email: "",
    users_confirmpassword: "",
  });

  console.log(formData);

  const getToken = async () => {
    const dataUser = await AsyncStorage.getItem("token");
    console.log(dataUser);
    if (!dataUser) {
      router.navigate("MainAuth");
    } else {
      router.dispatch(StackActions.replace("NavButton"));
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  let onClick = async (e) => {
    try {
      axios
        .post("http://172.25.144.1:7474/users/login", {
          users_email: formData.users_email,
          users_confirmpassword: formData.users_confirmpassword,
        })
        .then((res) => {
          console.log(res);

          if (res.status === 201) {
            alert(res.data.message);
            AsyncStorage.setItem("token", res.data.data.token_user);
            AsyncStorage.setItem("users_id", res.data.data.users_id);
            router.dispatch(StackActions.replace("NavButton"));
          } else if (res.status === 200) {
            console.log(res);
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };
  const [show, setShow] = React.useState(false);
  return (
    <NativeBaseProvider>
      <Center h="100%">
        <Center>
          <VStack
            space={2}
            alignItems={{
              base: "center",
              md: "flex-start",
            }}
          ></VStack>
          <Box>
            <Pressable>{/* <Image source={require("../assets/Group-697-1.png")} style={styles.profileIcon} /> */}</Pressable>
            <VStack alignItems="center" mb="4">
              <Heading mb="2" color="yellow.400" fontWeight="700">
                Welcome !
              </Heading>
              <Text fontSize="sm" color="muted.400">
                Log in to your exiting account.
              </Text>
            </VStack>
          </Box>
          <Stack mt="1.5" pt="4" mb="2" space={4} w="100%" alignItems="center">
            <Input
              variant="filled"
              w={{
                base: "350",
              }}
              h={{
                base: "60",
              }}
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              placeholder="Email"
              value={formData.users_email}
              onChangeText={(text) => setFormData({ ...formData, users_email: text })}
              keyboardType="email-address"
            />

            <Input
              variant="filled"
              w={{
                base: "350",
              }}
              h={{
                base: "60",
              }}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>
              }
              placeholder="Password"
              value={formData.users_confirmpassword}
              onChangeText={(text) => setFormData({ ...formData, users_confirmpassword: text })}
              secureTextEntry
            />
            <Center>
              <Button onPress={onClick} style={styles.btn} w="350">
                CREATE
              </Button>
            </Center>

            <Text alignSelf="center" mt={2} fontSize="md" style={{ color: "#999999" }}>
              Don’t have an account?{" "}
              <Text onPress={() => router.navigate("Register")} style={{ color: "#EFC81A" }}>
                Sign Up
              </Text>
            </Text>
          </Stack>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
};

export default Logins;

const styles = StyleSheet.create({
  profileIcon: {
    padding: 20,
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 50,
    resizeMode: "contain",
  },

  btn: {
    alignItems: "center",
    backgroundColor: "#EFC81A",
    borderRadius: 10,
    margin: 12,
  },
});
