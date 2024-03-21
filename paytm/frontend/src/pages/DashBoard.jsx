import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const [balance, setBalance] = useState();
  const navigate = useNavigate();

  async function getBalance() {
    try {
      const res = await axios.get(
        "http://localhost:3444/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res?.data?.balance) {
        navigate("/signin");
      }
      setBalance(res.data.balance);
    } catch (error) {
      navigate("/signin");
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    balance && (
      <div className="m-2">
        <AppBar />
        <div className="m-8">
          <Balance value={balance} />
          <Users />
        </div>
      </div>
    )
  );
};
