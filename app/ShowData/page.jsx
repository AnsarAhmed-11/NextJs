"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");

        setUsers(res.data.students);

        console.log("this is res data", res.data.students);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log("students", users);

  return (
    <div>
      <h1>Users Data</h1>

      {users.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="user-data">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Grade</th>
                <th>City</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.grade}</td>
                  <td>{user.city}</td>
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