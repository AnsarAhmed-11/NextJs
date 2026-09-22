"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/employees");
        setUsers(res.data.employees);
      } catch (err) {
        console.log("error is here",err);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1 className="text-2xl">Employee Data</h1>
      {users === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="user-data">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Job</th>
                <th>Salary</th>
                <th>Hire Date</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.emp_id}>
                  <td>{index + 1}</td>
                  <td>{user.emp_name}</td>
                  <td>{user.job}</td>
                  <td>{user.salary}</td>
                  <td>{user.hire_date}</td>
                </tr>
              ))}P
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;