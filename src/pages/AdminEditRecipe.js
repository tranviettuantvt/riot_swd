import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import { getRecipeById, updateRecipe } from "../api/RecipeService";

function AdminEditRecipe({
  trigger,
  setTrigger,
  editId,
  setShowEdit,
  showedit,
}) {
  const [initialRecipe, setInitialRecipe] = useState({
    user_id: "",
    title: "",
    step: "",
    material: "",
    origin: "",
    time: "",
    healthy: "",
    image: "",
  });

  const handleInputEdit = (event) => {
    const { name, value } = event.target;
    setInitialRecipe({ ...initialRecipe, [name]: value });
  };

  const getRecipeByIdd = (id) => {
    getRecipeById(id)
      .then((res) => setInitialRecipe(res.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (editId) getRecipeByIdd(editId);
  }, [editId]);

  const handleEditRecipe = (e) => {
    e.preventDefault();
    updateRecipe(editId, initialRecipe)
      .then((res) => {
        setTrigger(!trigger);
        setShowEdit(false);
      })
      .catch((e) => console.log(e));
  };
  {
    return (
      <div className="model_box">
        <Modal
          show={showedit}
          onHide={() => setShowEdit(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Record</Modal.Title>
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
                  onChange={handleInputEdit}
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
                  onChange={handleInputEdit}
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  readOnly
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Nhap title"
                  name="user_id"
                  value={initialRecipe.user_id}
                  onChange={handleInputEdit}
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
                  onChange={handleInputEdit}
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nguon goc"
                  name="origin"
                  value={initialRecipe.origin}
                  onChange={handleInputEdit}
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Thoi gian nau"
                  value={initialRecipe.time}
                  onChange={handleInputEdit}
                  name="time"
                />
              </div>
              <div class="form-group mt-3">
                <select
                  class="form-control"
                  name="healthy"
                  value={initialRecipe.healthy}
                  onChange={handleInputEdit}
                >
                  <option value="0" selected>
                    Normal
                  </option>
                  <option value="1">Healthy</option>
                </select>
              </div>
              <div class="form-group mt-3">
                <textarea
                  class="form-control"
                  cols="30"
                  rows="10"
                  value={initialRecipe.step}
                  onChange={handleInputEdit}
                  name="step"
                ></textarea>
              </div>

              <button
                onClick={handleEditRecipe}
                type="submit"
                class="btn btn-success mt-4"
              >
                Edit Record
              </button>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Model Box Finsihs */}
      </div>
    );
  }
}

export default AdminEditRecipe;
