import { Link } from "react-router-dom";

export default function Balance({ value }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="font-bold text-lg">Your balance :</div>
        <div className="font-semibold ml-4 text-lg">Rs {value}</div>
      </div>
      <div>
        <Link
          onClick={() => {
            localStorage.removeItem("token");
          }}
          className="pointer text-gray-100 bg-blue-600 px-3 py-1 rounded-md font-semibold mt-3 cursor-pointer"
          to={"/"}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
