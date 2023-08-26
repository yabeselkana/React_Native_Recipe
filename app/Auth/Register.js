import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box, Center, Heading, VStack, Input, Icon, Stack, Pressable, ZStack, Button, useToast, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { Snackbar } from "react-native-paper";
const Register = () => {
  const router = useNavigation();
  const toast = useToast();
  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  let [formData, setFormData] = useState({
    users_name: "",
    users_email: "",
    users_phone: "",
    users_password: "",
    users_confirmpassword: "",
  });

  console.log(formData);

  let onClick = async (e) => {
    if (formData.users_password !== formData.users_confirmpassword) {
      setErrorMessages("Please check your password!");
      setIsLoading(false);
    } else {
      axios
        .post("http://172.25.144.1:7474/users/register", {
          users_name: formData.users_name,
          users_email: formData.users_email,
          users_phone: formData.users_phone,
          users_password: formData.users_password,
          users_confirmpassword: formData.users_confirmpassword,
        })

        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            alert(response.data.message);
          } else if (response.status === 200) {
            alert(response.data[0].message);
          } else if (response.status === 201) {
            setIsSuccess(true);
          }
        })
        .catch((error) => {
          setErrorMessages(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const [shows, setShow] = React.useState(false);
  return (
    <NativeBaseProvider>
      <Center style={{ marginTop: 120 }}>
        <Box>
          <VStack alignItems="center" mb="4">
            <Heading mb="2" color="yellow.400" fontWeight="700">
              Let’s Get Started !
            </Heading>
            <Text fontSize="lg" color="muted.400">
              Create new account to access all feautures
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
            placeholder="Username"
            value={formData.users_name}
            onChangeText={(text) => setFormData({ ...formData, users_name: text })}
          />
          <Input
            variant="filled"
            w={{
              base: "350",
            }}
            h={{
              base: "60",
            }}
            InputLeftElement={<Icon as={<MaterialIcons name="mail" />} size={5} ml="2" color="muted.400" />}
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
            InputLeftElement={<Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="muted.400" />}
            placeholder="Phone"
            value={formData.users_phone}
            onChangeText={(text) => setFormData({ ...formData, users_phone: text })}
            keyboardType="phone-pad"
          />
          <Input
            variant="filled"
            w={{
              base: "350",
            }}
            h={{
              base: "60",
            }}
            InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
            placeholder="Password"
            value={formData.users_password}
            onChangeText={(text) => setFormData({ ...formData, users_password: text })}
            secureTextEntry
          />
          <Input
            variant="filled"
            w={{
              base: "350",
            }}
            h={{
              base: "60",
            }}
            InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
            placeholder="Confirm Password"
            value={formData.users_confirmpassword}
            onChangeText={(text) => setFormData({ ...formData, users_confirmpassword: text })}
            secureTextEntry
          />
          <Button onPress={onClick} style={styles.btn} w="350">
            <Text style={styles.buttonText}>{isLoading ? "Loading..." : "CREATE"}</Text>
          </Button>

          <Text alignSelf="center" mt={2} fontSize="md" style={{ color: "#999999" }}>
            Already have account?{" "}
            <Text onPress={() => router.navigate("Login")} style={{ color: "#EFC81A" }}>
              Log in Here
            </Text>
          </Text>
          <Snackbar visible={isSuccess} style={{ backgroundColor: "#79C079" }} onDismiss={() => router.navigate("Login")} duration={2000}>
            Register success, please login
          </Snackbar>
          <Snackbar
            visible={Boolean(errorMessages)}
            style={{ backgroundColor: "#CB3837" }}
            onDismiss={() => setErrorMessages(null)}
            action={{
              label: "X",
              onPress: () => {
                setErrorMessages(null);
              },
            }}
          >
            {errorMessages}
          </Snackbar>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Register;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: "#EFC81A",
    borderRadius: 10,
    margin: 12,
  },

  buttonText: {
    textAlign: "center",
    padding: 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
