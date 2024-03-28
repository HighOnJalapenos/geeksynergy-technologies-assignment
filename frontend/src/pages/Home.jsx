import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [isLoggedIn, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/users/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <header className="bg-blue-400 text-white p-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div>GEEKSYNERGY TECHNOLOGIES</div>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-400 rounded px-3 py-1"
          >
            Log Out
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-4">
        <section>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profession
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.profession}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/edituser/${user._id}`)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
