import { useEffect, useState } from "react";
import moment from "moment";
import { message } from "antd";
import { banUser, getAllUsers, unbanUser } from "../../api/admin";

const User = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const banHandler = async (userId) => {
    try {
      const response = await banUser(userId);
      if (response.isSuccess) {
        message.success(response.message);
        getUsers();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const unbanHandler = async (userId) => {
    try {
      const response = await unbanUser(userId);
      if (response.isSuccess) {
        message.success(response.message);
        getUsers();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2 text-center">User List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              <>
                {users.map((user) => (
                  <tr
                    className="odd:bg-white  even:bg-gray-100  border-b "
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left "
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4"> {user.email} </td>
                    <td className="px-6 py-4">
                      {" "}
                      {user.role === "admin" ? (
                        <span className="text-blue-600 font-medium">
                          {" "}
                          {user.role}{" "}
                        </span>
                      ) : (
                        <span className="font-semibold"> {user.role} </span>
                      )}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "active" && (
                        <span className="bg-green-600 text-xs p-1 rounded-md text-white">
                          {" "}
                          {user.status}{" "}
                        </span>
                      )}
                      {user.status === "banned" && (
                        <span className="bg-red-600 text-xs p-1 rounded-md text-white">
                          {" "}
                          {user.status}{" "}
                        </span>
                      )}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "active" ? (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline me-4"
                          onClick={() => {
                            banHandler(user._id);
                          }}
                        >
                          Ban User
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline me-4"
                          onClick={() => {
                            unbanHandler(user._id);
                          }}
                        >
                          Unban User
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default User;
