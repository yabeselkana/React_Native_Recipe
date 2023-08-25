import React from "react";
import { StyleSheet, useColorScheme, ScrollView, View, Image, Text, Pressable, useWindowDimensions } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";

import { Link, useNavigation, useSearchParams } from "expo-router";
import { isColor } from "react-native-reanimated";
import { Icon, Tab } from "@rneui/themed";
// import YoutubeIframe from "react-native-youtube-iframe";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Detail = ({ route }) => {
  const { recipes_id, getData } = route.params;
  const roter = useNavigation();
  const [ingredients, SetIngredients] = React.useState(true);
  const [video, SetVideo] = React.useState(false);
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? isColor.darker : isColor.lighter,
  };

  const [user, setUser] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    axios
      .get(`http://172.20.10.5:7474/recipes/${recipes_id}`)
      .then((response) => {
        setData(response.data.data[0]);
        console.log(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fffff" }}>
      <Text style={styles.ingredient} key={index}>
        {data?.recipes_ingredients}
      </Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fffff" }}>
      <Text>elkana</Text>
    </View>
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
          source={require("../../assets/resep-mie-aceh-tumis.jpg")}
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
        renderTabBar={(props) => <TabBar {...props} indicatorStyle={{ backgroundColor: "yellow" }} style={{ backgroundColor: "wihte", borderRadius: "5" }} labelStyle={{ color: "black" }} />}
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
    padding: 20,
  },
});
