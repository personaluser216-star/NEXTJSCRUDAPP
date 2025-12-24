"use client";

import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course`);
      const result = await res.json();
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/course/${id}`, {
        method: "DELETE",
      });
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      {data.map((item) => (
        <div
          key={item._id}
          className="border border-black rounded flex justify-between mb-3"
        >
          <div className="font-xl font-bold border-r border-black px-4 py-2 w-1/4">
            {item.course}
          </div>

          <div className="px-4 py-2 border-r border-black w-2/4">
            {item.description}
          </div>

          <div className="flex gap-3 justify-center px-2 items-center w-1/4">
            <Link href={`/edit/${item._id}`}>
              <FaEdit className="text-xl text-blue-600 cursor-pointer" />
            </Link>

            <MdDelete
              onClick={() => handleDelete(item._id)}
              className="text-xl text-red-600 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </>
  );
}
