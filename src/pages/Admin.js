import React from "react";
import { Link, Outlet } from "react-router-dom";

function Admin() {
  return (
    <div>
      <nav>
        <Link to="allRecipe"><button className="manageItem">Manage All Recipe</button></Link>
        <Link to="allUser"><button className="manageItem">Manage All User</button></Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Admin;
