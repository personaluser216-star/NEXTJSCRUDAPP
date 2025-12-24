"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const {id} = useParams();

  const[course,setCourse] = useState("");
  const[description,setDescription] = useState("")

  useEffect(()=>
  {
    const fetchData = async () =>
    {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course/${id}`);
      if(!res.ok)
        return;

      const result = await res.json();

      setCourse(result?.data?.course || "");
      setDescription(result?.data?.description || "");

    };
    if(id) fetchData()
  },[id])

  const handleUpdate = async(e)=>
  {
    e.preventDefault();
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course, description }),
    });
    router.push("/");
  }
  return (
    <div className="p-12 flex items-center justify-center bg-gray-100">
      <form 
      onSubmit={handleUpdate}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
        
        <h2 className="text-2xl font-bold text-center">Edit Course</h2>

        {/* Course Title */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Course Name</label>
          <input
            type="text"
            value={course}
            onChange={(e)=>setCourse(e.target.value)}
            placeholder="Enter course name"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Description</label>
          <textarea
            placeholder="Enter course description"
            rows="4"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          update Course
        </button>
      </form>
    </div>
  );
};

export default page;
