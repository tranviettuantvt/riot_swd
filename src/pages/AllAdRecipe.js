import { getAuth, getAdditionalUserInfo } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllRecipes, removeRecipe } from "../api/RecipeService";
import AdminEditRecipe from "./AdminEditRecipe";
import AdminRecipeItem from "./AdminRecipeItem";

function AllAdRecipe() {
  const [show, setShow] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [manageRecipe, setManageRecipe] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [initialRecipe, setInitialRecipe] = useState({
    user_id: "",
    title: "",
    step: "",
    material: "",
    origin: "",
    time: "",
    healthy: "0",
    image: "",
  });

  const [idRecEdit, setIdRecEdit] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get all recipes
  const retrieveRecipe = () => {
    getAllRecipes()
      .then((res) => {
        setManageRecipe(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveRecipe();
  }, [trigger]);

  //  handle Edit reipce
  const handleEdit = (id) => {
    setIdRecEdit(id);
    setShowEdit(true);
  };

  //  handle delete recipe
  return (
    <div class=" ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <Link to="/">
              <button>Home Page</button>
            </Link>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Manage All Recipe </b>
            </h2>
          </div>
          <div class="col-sm-2 offset-sm-2  mt-5 mb-4 text-gred">
            <Link to="/manage">
              <Button variant="primary">Go to your Recipe</Button>
            </Link>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive " style={{ padding: 0 }}>
            <table
              class="table table-striped table-hover table-bordered"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Image</th>
                  <th style={{ width: "7%" }}>Title</th>
                  <th style={{ width: "5%" }}>Author</th>
                  <th style={{ width: "15%" }}>material</th>
                  <th style={{ width: "4%" }}>origin </th>
                  <th style={{ width: "5%" }}>time </th>
                  <th style={{ width: "6%" }}>Healthy</th>
                  <th>step</th>
                  <th style={{ width: "3%" }}></th>
                </tr>
              </thead>
              <tbody>
                {manageRecipe &&
                  manageRecipe.map((recipe) => (
                    <AdminRecipeItem
                      handleEdit={handleEdit}
                      trigger={trigger}
                      setTrigger={setTrigger}
                      {...recipe}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box add ---> */}
        <AdminEditRecipe
          trigger={trigger}
          setTrigger={setTrigger}
          editId={idRecEdit}
          showedit={showedit}
          setShowEdit={setShowEdit}
        />
      </div>
    </div>
  );
}

export default AllAdRecipe;
