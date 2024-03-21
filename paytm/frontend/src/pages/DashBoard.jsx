import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export const DashBoard = () => {
  return (
    <div className="m-2">
      <AppBar />
      <Balance value={"10,000"} />
      <Users />
    </div>
  );
};