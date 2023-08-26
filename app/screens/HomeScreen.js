import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { Searchbar, Snackbar } from "react-native-paper";
import NewRecipe from "../../components/NewRecipe";
import Populer from "../../components/Populer";
import { useNavigation } from "expo-router";
import axios from "axios";
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useNavigation();
  const onChangeSearch = (query) => setSearchQuery(query);

  const [isOnProgress, setIsOnProgress] = React.useState(false);
  const handleFeatureOnProgress = () => {
    setIsOnProgress(true);
  };

  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    axios
      .get(`http://172.20.10.2:7474/recipes`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{ padding: 15 }}>
            <Searchbar
              style={{ marginBottom: 23 }}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>

          <Snackbar
            visible={isOnProgress}
            style={{ backgroundColor: "#CB3837" }}
            onDismiss={() => setIsOnProgress(false)}
            duration={1000}
            action={{
              label: "X",
              onPress: () => {
                setIsOnProgress(false);
              },
            }}
          >
            Sorry, this feature is on progress!
          </Snackbar>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleText}>New Recipes</Text>
          </View>
          <ScrollView
            horizontal
            style={{
              marginBottom: 3,
              padding: 4,
            }}
          >
            {data?.map((item) => {
              return (
                <NewRecipe
                  recipes_title={item.recipes_title}
                  recipes_id={item.recipes_id}
                  users_id={item.users_id}
                  recipes_photo={item.recipes_photo}
                  getData={getDataid}
                />
              );
            })}
          </ScrollView>

          {/* End of New Recipes  */}
          {/* Popular Recipes */}
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleText}>Popular Recipes</Text>
            <TouchableOpacity onPress={() => router.navigate("MoreScreen")}>
              <Text style={{ paddingRight: 20 }}>More Info</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginBottom: 30 }}>
            {data?.map((item) => {
              return (
                <Populer
                  recipes_title={item.recipes_title}
                  recipes_id={item.recipes_id}
                  users_id={item.users_id}
                  recipes_photo={item.recipes_photo}
                  getData={getDataid}
                />
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  titleText: {
    paddingLeft: 20,
    fontFamily: "",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    width: 75,
    height: 75,
  },
  iconText: {
    marginTop: 5,
    fontFamily: "Airbnb Cereal",
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  popularText: {
    padding: 10,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "800",
    color: "black",
  },
  popularCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    gap: 20,
  },
});
