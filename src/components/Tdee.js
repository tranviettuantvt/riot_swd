import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function Tdee() {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("0");
  const [activityLevel, setActivityLevel] = useState("0");
  const [tdee, setTdee] = useState();
  const [bmi, setBmi] = useState();
  const [status, setStatus] = useState("");
  const [range, setRange] = useState("");
  const {currentUser}=useContext(AuthContext)
  const [save, setSave]=useState(false)

  const SetStatusRange = (bmiValue) => {
    if (bmiValue < 18.5) {
      setStatus("Thiếu Cân");
      setRange("Dưới18.5");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatus("Khỏe mạnh");
      setRange("18.5–24.9");
    } else if (bmiValue > 25 && bmiValue < 29.9) {
      setStatus("Thừa Cân");
      setRange("25–29.9");
    } else if (bmiValue >= 30) {
      setStatus("Béo phì");
      setRange("Trên 30");
    }
  };

  function calculateTDEE(e) {
    e.preventDefault();
    const bmiValue = (weight / Math.pow(height / 100, 2)).toFixed(2);
    const bmr =
      gender === "0"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    const activityFactor = getActivityFactor(activityLevel);
    const tdee = Math.round(bmr * activityFactor);
    setTdee(tdee);
    setBmi(bmiValue);
    SetStatusRange(bmiValue);
    setWeight("")
    setHeight("")
    setAge("")
    setGender("0")
    setActivityLevel("0")
  }

  function getActivityFactor(activityLevel) {
    switch (activityLevel) {
      case "0":
        return 1.2;
      case "1":
        return 1.375;
      case "2":
        return 1.55;
      case "3":
        return 1.725;
      case "4":
        return 1.9;
      default:
        return 1.2;
    }
  }

  const SaveTdee=async() => {
    await updateDoc(doc(db,"users", currentUser.uid ), {
      tdee,
      bmi
    })
    setSave(true)
    alert('Save Success')
  }
  return (
    <div className="container" style={{ padding: "3.5rem" }}>
      <h2
        className="text-center text-success mb-4"
        style={{ color: "#022559" }}
      >
        HOW STRONG YOU ARE ?
      </h2>

      <a className="tdee-button" type="button" href="#tdeeCal">
        <i class="fa-solid fa-film"></i>
      </a>
      <div className="tdee" id="tdeeCal">
        <form class="row gx-5 gy-4">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              id="weight"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              id="height"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              id="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div class="col-md-6">
            <select
              id="gender"
              class="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option selected value="0">
                Male
              </option>
              <option value="1">Female</option>
            </select>
          </div>

          <div class="col-md-12">
            <select
              id="Activity"
              class="form-select"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option selected value="0">
                Sedentary (little to no exercise + work a desk job)
              </option>
              <option value="1">
                Lightly Active (light exercise 1-3 days / week){" "}
              </option>
              <option value="2">
                Moderately Active (moderate exercise 3-5 days / week)
              </option>
              <option value="3">
                Very Active (heavy exercise 6-7 days / week){" "}
              </option>
              <option value="4">
                Extremely Active (very heavy exercise, hard labor job, training
                2x / day)
              </option>
            </select>
          </div>

          <div class="col-md-12 text-center mt-5">
            <button
              type="submit"
              class="btn btn-success d-block"
              style={{ width: "100%", padding: "4px 0", fontSize: "1.6rem" }}
              onClick={(e) =>
                calculateTDEE(e, weight, height, age, gender, activityLevel)
              }
            >
              Calculate TDEE
            </button>
          </div>
        </form>
      </div>

      {tdee && (
        <div className="tdee-result">
          <div
            className=""
            style={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <h5 style={{ marginBottom: "16px" }}>
              The estimated TDEE or body weight maintenance energy requirement
              is <span style={{ color: "#198754" }}>{tdee}</span> Calories per
              day.
            </h5>
            <span>
              BMI Score: <span  style={{ color: "#198754" }}> {bmi} ({status})</span>,  Healthy BMI Range: <span  style={{ color: "#198754" }}>{range}</span> kg/m2
            </span>
            <button onClick={SaveTdee} className="tdee-buttonn">Save</button>
            {save && <p style={{color:"#198754"}}>Save Successfully</p> }
          </div>
          <img src="./img/bmi.PNG" alt="" />
        </div>
      )}
    </div>
  );
}

export default Tdee;
