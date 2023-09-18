import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { Center, NativeBaseProvider } from "native-base";
import axios from "axios";
// import YoutubeIframe from "react-native-youtube-iframe";
const DetailVideo = ({ route }) => {
  const { id, getData } = route.params;

  const [data, setData] = useState("");
  const roter = useNavigation();
  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    axios
      .get(`http://172.20.10.2:7474/recipes/${id}`)
      .then((response) => {
        setData(response.data.data[0]);
        const videoLink = response.data.data[0].recipes_video;
        const videoSlice = videoLink.slice(17);
        console.log(videoLink);
        console.log(videoSlice);
      })
      .catch((error) => console.log(error));
  };

  console.log(id);
  return (
    <NativeBaseProvider>
      <View style={styles.header}>
        <Pressable onPress={() => roter.goBack()} style={{ marginRight: 20 }}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.headerText}>Video</Text>
      </View>
      <Center flex={1} px={3}>
        {/* <View style={{ margin: 5 }}>
          <YoutubeIframe
            height={300}
            width={400}
            videoId={link}
            webViewStyle={{ opacity: 0.99 }}
          />
        </View> */}
        {/* <Text style={{ paddingTop: 20, fontSize: 30 }}>{data}</Text> */}
      </Center>
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
