"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data.students || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Students
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and view all registered students.
            </p>
          </div>

          {/* Total Students */}
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
              {users.length}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total Students
              </p>

              <p className="text-sm font-semibold text-slate-800">
                Registered
              </p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Student List
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                All student records
              </p>
            </div>
          </div>

          {loading ? (
            /* Loading */
            <div className="flex h-64 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />
                Loading students...
              </div>
            </div>
          ) : users.length === 0 ? (
            /* Empty State */
            <div className="flex h-64 flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-6 w-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 19a4 4 0 00-8 0m8 0h4m-4 0H7m8-10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                No students found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                There are currently no student records available.
              </p>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      #
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Age
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Grade
                    </th>

                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      City
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="group transition-colors hover:bg-slate-50"
                    >
                      {/* Number */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                            {user.name?.charAt(0)?.toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              Student
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {user.email}
                        </span>
                      </td>

                      {/* Age */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {user.age}
                        </span>
                      </td>

                      {/* Grade */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                          Grade {user.grade}
                        </span>
                      </td>

                      {/* City */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            className="h-4 w-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M12 21s7-5.686 7-12A7 7 0 005 9c0 6.314 7 12 7 12z"
                            />
                            <circle
                              cx="12"
                              cy="9"
                              r="2"
                              strokeWidth={1.8}
                            />
                          </svg>

                          {user.city}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {!loading && users.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {users.length}
                </span>{" "}
                {users.length === 1 ? "student" : "students"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
