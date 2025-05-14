// Inventory.jsx
import React, { useState, useMemo } from "react";
import UserTable from "../components/table/UserTable";
import Topbar from "./Topbar";

const Inventory = () => {
  return (
    <div className="bg-white shadow rounded-lg pb-4">
      <Topbar />
      <UserTable className="min-w-full" />
    </div>
  );
};

export default Inventory;
