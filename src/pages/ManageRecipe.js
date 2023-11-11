import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {
  createRecipe,
  findRecipeByUserId,
  removeRecipe,
} from "../api/RecipeService";
import { Link } from "react-router-dom";
import EditRecipe from "./EditRecipe";

function ManageRecipe() {
  const { currentUser } = useContext(AuthContext);
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

  // Get recipe by User Id
  const getRecipeByUserId = (id) => {
    findRecipeByUserId(id)
      .then((res) => setManageRecipe(res.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (currentUser.uid) getRecipeByUserId(currentUser.uid);
  }, [currentUser, trigger]);

  // Add recipe
  const handleInputAdd = (event) => {
    const { name, value } = event.target;
    setInitialRecipe({ ...initialRecipe, [name]: value });
    console.log(initialRecipe);
  };
  const handleAddRecipe = (e) => {
    e.preventDefault();
    let data = {
      user_id: currentUser.uid,
      title: initialRecipe.title,
      step: initialRecipe.step,
      material: initialRecipe.material,
      origin: initialRecipe.origin,
      time: initialRecipe.time,
      healthy: initialRecipe.healthy,
      image: initialRecipe.image,
    };
    console.log("data:", data);
    createRecipe(data)
      .then((res) => {
        setInitialRecipe({ ...res.data });
        handleClose();
        setTrigger(!trigger);
        setInitialRecipe({
          user_id: "",
          title: "",
          step: "",
          material: "",
          origin: "",
          time: "",
          healthy: "",
          image: "",
        });
      })
      .catch((e) => console.log(e));
  };

  // handle Delete recipe
  const handleDeleteRecipe = (id) => {
    removeRecipe(id)
      .then((res) => setTrigger(!trigger))
      .catch((e) => console.log(e));
  };

  // handle trigger edit modal
  const handleEdit = (id) => {
    setIdRecEdit(id);
    setShowEdit(true);
  };

  const breakline = (texts) => {
    const text = texts;
    const steps = text.split("Bước ").filter((step) => step !== "");
    return steps.map((step, index) => <li key={index}>{step.trim()}</li>);
  };
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
              <b>Manage your Recipe</b>
            </h2>
          </div>
          <div class="col-sm-2 offset-sm-2  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Recipe
            </Button>
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
                  <th style={{ width: "6%" }}>Title </th>
                  <th style={{ width: "15%" }}>material</th>
                  <th style={{ width: "4%" }}>origin </th>
                  <th style={{ width: "7%" }}>time </th>
                  <th style={{ width: "5%" }}>Healthy</th>
                  <th>step</th>
                  <th style={{ width: "3%" }}></th>
                </tr>
              </thead>
              <tbody>
                {manageRecipe &&
                  manageRecipe.map((recipe) => (
                    <tr>
                      <td>
                        <img
                          style={{ width: "100%" }}
                          src={recipe.image}
                          alt=""
                        />
                      </td>
                      <td style={{ wordWrap: "break-word" }}>{recipe.title}</td>
                      <td>{recipe.material}</td>
                      <td>{recipe.origin}</td>
                      <td>{recipe.time}</td>
                      <td>{recipe.healthy == 0 ? "Normal" : "Healthy"}</td>
                      <td>{breakline(recipe.step)}</td>
                      <td>
                        <span
                          onClick={() => handleEdit(recipe.ingredient_id)}
                          class="edit"
                          title="Edit"
                          data-toggle="tooltip"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </span>
                        <span
                          class="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                          onClick={() =>
                            handleDeleteRecipe(recipe.ingredient_id)
                          }
                        >
                          <i class="fa-solid fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box add ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Nhap URL anh"
                    name="image"
                    value={initialRecipe.image}
                    onChange={handleInputAdd}
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Nhap title"
                    name="title"
                    value={initialRecipe.title}
                    onChange={handleInputAdd}
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Nguyen lieu"
                    name="material"
                    value={initialRecipe.material}
                    onChange={handleInputAdd}
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nguon goc"
                    name="origin"
                    value={initialRecipe.origin}
                    onChange={handleInputAdd}
                  />
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Thoi gian nau"
                    value={initialRecipe.time}
                    onChange={handleInputAdd}
                    name="time"
                  />
                </div>
                <div class="form-group mt-3">
                  {/* <input
                    type="text"
                    class="form-control"
                    placeholder="Do kho"
                    value={initialRecipe.healthy}
                    onChange={handleInputAdd}
                    name="healthy"
                  /> */}
                  <select
                    class="form-control"
                    name="healthy"
                    value={initialRecipe.healthy}
                    onChange={handleInputAdd}
                  >
                    <option value="0" selected>
                      Normal
                    </option>
                    <option value="1">Healthy</option>
                  </select>
                </div>
                <div class="form-group mt-3">
                  <textarea
                    placeholder="Nhap ro cac Buoc"
                    class="form-control"
                    cols="30"
                    rows="10"
                    value={initialRecipe.step}
                    onChange={handleInputAdd}
                    name="step"
                  ></textarea>
                </div>

                <button
                  onClick={handleAddRecipe}
                  type="submit"
                  class="btn btn-success mt-4"
                >
                  Add Record
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
        {/* model box edit */}
        <EditRecipe
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

export default ManageRecipe;
