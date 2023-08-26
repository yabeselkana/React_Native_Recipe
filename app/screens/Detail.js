import React from "react";
import { StyleSheet, useColorScheme, ScrollView, View, Image, Text, Pressable, useWindowDimensions } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import { Link, useNavigation, useSearchParams } from "expo-router";
import { isColor } from "react-native-reanimated";
import { Icon, Tab } from "@rneui/themed";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Box, Button, Center, HStack, NativeBaseProvider, TextArea } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Comment from "../../components/Comment";

const Detail = ({ route }) => {
  const { recipes_id, getData } = route.params;
  const roter = useNavigation();

  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? isColor.darker : isColor.lighter,
  };

  const [user, setUser] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    getDataid();
    getComment();
  }, []);

  const getDataid = async () => {
    axios
      .get(`http://172.25.144.1:7474/recipes/${recipes_id}`)
      .then((response) => {
        setData(response.data.data[0]);
        console.log(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fffff" }}>
      <Text style={styles.ingredient}>{data?.recipes_ingredients}</Text>
    </View>
  );

  const [comment, setComment] = useState("");
  const hendelComment = async () => {
    try {
      const dataUser = await AsyncStorage.getItem("users_id");
      const com = {
        recipes_id: recipes_id,
        comment_text: comment,
        users_id: dataUser,
      };
      const comments = await axios.post("http://172.25.144.1:7474/comments", com);
      if (comments.data.statusCode === 201) {
        setComment("");
        alert("Comment Recipe Success");
        console.log(comments);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const [dataCommet, setDataCommet] = useState([{}]);

  const getComment = async () => {
    axios
      .get(`http://172.25.144.1:7474/comments/${recipes_id}`)
      .then((res) => {
        setDataCommet(res.data.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const SecondRoute = () => (
    <NativeBaseProvider>
      <Pressable
        onPress={() => {
          roter.navigate("DetailVideo", {
            id: recipes_id,
          });
        }}
      >
        <View style={{ backgroundColor: "#fffff" }}>
          <HStack style={{ margin: 10, marginTop: 10, padding: 1, borderRadius: 20, backgroundColor: "#FAF7ED" }}>
            <View
              style={{
                backgroundColor: "#EFC81A",
                width: 50,
                height: 50,
                margin: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeatherIcon name="play" size={26} color={"white"} />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginTop: 20,
                fontWeight: 500,
                color: "#666666",
              }}
            >
              Step 1
            </Text>
          </HStack>
        </View>
      </Pressable>
      <Center>
        <View>
          <Box mt={18}>
            <TextArea backgroundColor="#FAF7ED" borderRadius={15} w={390} h={150} placeholder="Comment:" value={comment} onChangeText={(value) => setComment(value)} />
          </Box>
          <Button width={390} mt={5} style={{ backgroundColor: "#EFC81A" }} borderRadius={7} onPress={hendelComment}>
            Comment
          </Button>
        </View>
      </Center>
      <View>
        <Text style={{ padding: 30 }}>Comment:</Text>
      </View>
      <Center>
        <ScrollView style={{ padding: 10 }}>
          {dataCommet?.map((item) => {
            return <Comment comment_id={item.comment_id} comment_text={item.comment_text} users_photo={item.users_photo} />;
          })}
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Ingredients" },
    { key: "second", title: "Video Step" },
  ]);
  const { username } = useSearchParams();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
      <View>
        <Image
          source={data.recipes_photo === "null" || data.recipes_photo === null || data.recipes_photo === "" ? require("../../assets/ilustrasi-sate-kambing1.jpg") : { uri: data.recipes_photo }}
          style={{
            width: "100%",
            height: 400,
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            position: "absolute",
            margin: 20,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 6,
            paddingBottom: 6,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 100,
          }}
        >
          <Pressable
            onPress={() => {
              roter.goBack();
            }}
          >
            <Icon name="arrow-left" size={30} color="#fff" />
          </Pressable>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text numberOfLines={2} style={styles.recipeName}>
            {data?.recipes_title}
          </Text>
          {/* <Text style={styles.recipeAuthor}>By Chef Abdullah Al-Karim</Text> */}
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <TabBar {...props} indicatorStyle={{ backgroundColor: "yellow" }} style={{ backgroundColor: "wihte" }} labelStyle={{ color: "black" }} />}
      />
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  recipeName: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    marginLeft: 20,
    marginBottom: 35,
    fontSize: 35,
    fontWeight: "bold",
  },
  recipeAuthor: {
    marginLeft: 20,
    marginBottom: 30,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  recipeDetail: {
    marginTop: -20,
    padding: 25,
    paddingBottom: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
  navbar: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 30,
  },
  navbarText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  },
  navbarTextActive: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#EFC81A",
  },
  ingredient: {
    backgroundColor: "#FAF7ED",
    color: "black",
    fontSize: 18,
    fontWeight: "500",
    height: 400,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
});
