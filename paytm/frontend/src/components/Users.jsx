import { useState } from "react";
import { Button } from "./Button";

export default function Users() {
  const [users, setUsers] = useState([
    {
      firstName: "Ajay",
      lastName: "Dew",
      _id: 100,
    },
  ]);
  return (
    <div className="mx-3">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 rounded border border-slate-200"
        />
      </div>
      <div>
        {users.map((u) => (
          <User user={u} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between" key={user._id}>
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full font-bold text-gray-700">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
