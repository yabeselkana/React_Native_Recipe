import axios from "axios";

export const getAllRecipe = () => async (dispatch) => {
  try {
    const recipes = await axios.get(`http://172.20.10.5:7474/recipes`);
    const result = recipes.data.data;
    dispatch({ type: "GET_ALL_RECIPE", payload: result });
  } catch (err) {
    console.error(err.message);
  }
};

export const createRecipeActions = (recipes_title, recipes_ingredients, recipes_video, recipes_photo, users_id, setModalVisible) => async (dispatch) => {
  try {
    const users_id = await AsyncStorage.getItem("users_id");
    const formData = new FormData();
    formData.append("recipes_title", recipes_title);
    formData.append("recipes_ingredients", recipes_ingredients);
    formData.append("recipes_video", recipes_video);
    formData.append("users_id", users_id);
    if (recipes_photo) {
      formData.append("recipes_photo", {
        uri: recipes_photo,
        name: "recipes_photo.jpg",
        type: "image/jpeg",
      });
    }
    const res = await axios.post("http://172.20.10.5:7474/recipes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (recipes.data.message === "Create Product Success") {
      alert("Create recipe success");
    }
    const result = recipes.data.data;

    dispatch({ type: "CREATE_RECIPE", payload: result });
  } catch (err) {
    console.error(err.message);
  }
};
