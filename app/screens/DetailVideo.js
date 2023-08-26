import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { NativeBaseProvider } from "native-base";
import axios from "axios";
// import YoutubeIframe from "react-native-youtube-iframe";
const DetailVideo = ({ route }) => {
  const { id, getData } = route.params;

  const [data, setData] = useState("");

  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    axios
      .get(`http://172.25.144.1:7474/recipes/${id}`)
      .then((response) => {
        setData(response.data.data[0]);
        console.log(response.data.data[0].recipes_video);
        console.log(response.data.data[0].recipes_title);
      })
      .catch((error) => console.log(error));
  };

  console.log(id);
  return (
    <NativeBaseProvider>
      <View style={styles.header}>
        <Pressable onPress={() => router.goBack()} style={{ marginRight: 20 }}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.headerText}>Video</Text>
      </View>
      <View>{/* <YoutubeIframe height={300} width={400} videoId={data.recipes_video} webViewStyle={{ opacity: 0.99 }} /> */}</View>
    </NativeBaseProvider>
  );
};

export default DetailVideo;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    color: "#000",
    fontSize: 20,
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
