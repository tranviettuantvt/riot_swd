import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function ProfileUser() {
  const [profile, setProfile] = useState();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log("error");
      }
    };
    getProfile();
  }, []);

  return (
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              src={profile?.photoURL}
            />
            <span class="font-weight-bold">{profile?.displayName}</span>
            <span class="text-black-50">{profile?.email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">View Your Profile </h4>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">ID</label>
                <input
                  readOnly
                  type="text"
                  class="form-control"
                  placeholder="enter phone number"
                  value={profile?.uid}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter address line 1"
                  value={profile?.displayName}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter address line 2"
                  value={profile?.email}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Role</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter address line 2"
                  value={
                    profile?.authorization === 0
                      ? "User"
                      : profile?.authorization === 1
                      ? "Contributor"
                      : "Admin"
                  }
                />
              </div>
              <div class="col-md-12">
                <label class="labels">BMI</label>
                <input
                  readOnly
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={profile?.bmi}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">TDEE</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={profile?.tdee}
                />
              </div>
            </div>

            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="button">
                Favourite recipe
              </button>
              <button class="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
              <Link to="/">
                <button class="btn btn-primary profile-button" type="button">
                  Home Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
