"use client";

import { getCookie } from "utils";

const Dashboard = () => {
  const user = getCookie("user");
  return (
      <>
      <p>Welcome, {user?.name}</p>
      {/* Other dashboard content */}
      </>
  );
};

export default Dashboard;
