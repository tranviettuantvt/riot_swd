import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteUser = async (id) => {
    // Delete user from Firestore
    await deleteDoc(doc(db, "users", id));

    // delete user in authentication
    const auth = getAuth();
    deleteUser(auth, id)
      .then(() => console.log("User deleted."))
      .catch((error) => console.error("Error deleting user:", error));

    setTrigger(!trigger);
  };

  // Fetch all user in firebase
  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        allUsers.push(doc.data());
      });
      setUsers(allUsers);
    };

    getUsers();
  }, [trigger]);
  return (
    <div>
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
                <b>All Users</b>
              </h2>
            </div>
            <div class="col-sm-2 offset-sm-2  mt-5 mb-4 text-gred">
              {/* <Button variant="primary" onClick={handleShow}>
                Add New Student
              </Button> */}
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
                    <th style={{ width: "5%" }}>User_ID</th>
                    <th style={{ width: "15%" }}>Avatar </th>
                    <th style={{ width: "5%" }}>Name</th>
                    <th style={{ width: "10%" }}>Email </th>
                    <th style={{ width: "7%" }}>Role </th>
                    <th style={{ width: "4%" }}>BMI</th>
                    <th style={{ width: "4%" }}>TDEE</th>
                    <th style={{ width: "3%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr>
                        <td style={{ wordWrap: "break-word" }}>{user.uid}</td>
                        <td>
                          <img
                            style={{ width: "100%" }}
                            src={user.photoURL}
                            alt=""
                          />
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.authorization == 0
                            ? "User"
                            : user.authorization == 1
                            ? "Contributor"
                            : "Admin"}
                        </td>
                        <td>{user.bmi}</td>
                        <td>{user.tdee}</td>
                        <td>
                          <span
                            class="delete"
                            title="Delete"
                            data-toggle="tooltip"
                            style={{ color: "red" }}
                            onClick={() => handleDeleteUser(user.uid)}
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
          {/* model box edit */}
        </div>
      </div>
    </div>
  );
}

export default AllUser;

// <div className="model_box">
//   <Modal
//     show={show}
//     onHide={handleClose}
//     backdrop="static"
//     keyboard={false}
//   >
//     <Modal.Header closeButton>
//       <Modal.Title>Add Record</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <form>
//         <div class="form-group">
//           <input
//             type="text"
//             class="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Nhap URL anh"
//             name="image"
//             value={initialRecipe.image}
//             onChange={handleInputAdd}
//           />
//         </div>
//         <div class="form-group mt-3">
//           <input
//             type="text"
//             class="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Nhap title"
//             name="title"
//             value={initialRecipe.title}
//             onChange={handleInputAdd}
//           />
//         </div>
//         <div class="form-group mt-3">
//           <input
//             type="text"
//             class="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Nguyen lieu"
//             name="material"
//             value={initialRecipe.material}
//             onChange={handleInputAdd}
//           />
//         </div>
//         <div class="form-group mt-3">
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Nguon goc"
//             name="origin"
//             value={initialRecipe.origin}
//             onChange={handleInputAdd}
//           />
//         </div>
//         <div class="form-group mt-3">
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Thoi gian nau"
//             value={initialRecipe.time}
//             onChange={handleInputAdd}
//             name="time"
//           />
//         </div>
//         <div class="form-group mt-3">
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Do kho"
//             value={initialRecipe.rate}
//             onChange={handleInputAdd}
//             name="rate"
//           />
//         </div>
//         <div class="form-group mt-3">
//           <textarea
//             class="form-control"
//             cols="30"
//             rows="10"
//             value={initialRecipe.step}
//             onChange={handleInputAdd}
//             name="step"
//           ></textarea>
//         </div>

//         <button
//           onClick={handleAddRecipe}
//           type="submit"
//           class="btn btn-success mt-4"
//         >
//           Add Record
//         </button>
//       </form>
//     </Modal.Body>

//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleClose}>
//         Close
//       </Button>
//     </Modal.Footer>
//   </Modal>

//   {/* Model Box Finsihs */}
// </div>
