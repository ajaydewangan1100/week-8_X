import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function getMe() {
    try {
      const res = await axios.get("http://localhost:3444/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        navigate("/dashboard");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      //   navigate("/signin");
    }
  }
  token && getMe();

  return (
    <div className="h-screen w-full flex justify-center ">
      <div className="flex flex-col justify-center h-full">
        <div className="flex gap-3 flex-col  p-12 shadow-md rounded-lg border">
          <h1 className="font-semibold text-gray-600 text-2xl">
            Welcome to money transfer portal!
          </h1>
          <div className="flex justify-between">
            <Link
              className="pointer text-gray-100 bg-blue-600 px-3 py-1 rounded-md font-semibold mt-3 cursor-pointer"
              to={"/dashboard"}
            >
              Go to DashBoard
            </Link>
            <Link
              className="pointer text-blue-600 font-semibold mt-3 cursor-pointer"
              to={"/signin"}
            >
              Signin/Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
