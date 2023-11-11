import React from "react";

function Reason() {
  return (
    <div className="reason">
      <div className="container">
        <div className="itemList-title text-center mb-5">
          <h4 className="text-success mb-1">About us</h4>
          <h2 style={{ color: "#022559" }}>WHY CHOOSE US</h2>
        </div>
        <div className="row">
          <div className="img-item col-md-6">
            <img src="./img/item4.jpg" class="card-img-top rounded" alt="..." />
          </div>
          <div className="col-md-5 ms-3">
            <h2 style={{ color: "#022559" }}>Best Food In The Country</h2>
            <p className="mt-3">
              A hamburger is minced meat which has been shaped into a flat
              circle. Hamburgers are fried or grilled and then eaten, often in a
              bread roll.
            </p>
            <p>
              A hamburger is minced meat which has been shaped into a flat
              circle. Hamburgers are fried or grilled and then eaten, often in a
              bread roll.
            </p>
            <p>
              A hamburger is minced meat which has been shaped into a flat
              circle. Hamburgers are fried or grilled and then eaten, often in a
              bread roll.
            </p>
            <div className="reason-descrip">
              <span><i class="fa-solid fa-truck-fast me-1"></i> Hello & Smile</span>
              <span><i class="fa-solid fa-truck-fast me-1"></i> Hello & Smile</span>
              <span><i class="fa-solid fa-truck-fast me-1"></i> Hello & Smile</span>
            </div>
            <a href="#" class="btn btn-success">
              Contact with Contributor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reason;
