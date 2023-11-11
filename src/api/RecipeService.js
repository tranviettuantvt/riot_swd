import http from "../http-common";

const getAllRecipes = () => {
  return http.get("/recipes/all");
};

const getRecipeById = (id) => {
  return http.get(`/recipes/${id}`);
};

const createRecipe = (data) => {
  return http.post("/recipes", data);
};

const updateRecipe = (id, data) => {
  return http.put(`/recipes/${id}`, data);
};

const removeRecipe = (id) => {
  return http.delete(`/recipes/${id}`);
};

const findRecipeByTitle = (title) => {
  return http.get(`/recipes?title=${title}`);
};

const findRecipeByUserId=(userId) => {
  return http.get(`/recipes/userId/${userId}`)
} 

export {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  removeRecipe,
  findRecipeByTitle,
  findRecipeByUserId
};
