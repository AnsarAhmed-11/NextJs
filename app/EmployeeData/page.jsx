"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/employees");
        // setUsers(res.data.emp);
        console.log("this is res data", res.data);
      } catch (err) {
        console.log("error is here",err);
      }
    };

    fetchData();
  }, []);

  console.log("users", users);

  return (
    <div>
      <h1>Employee Data</h1>

      {users === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="user-data">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;