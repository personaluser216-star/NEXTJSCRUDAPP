"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
    const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      
      setCourse("");
      setDescription("");
      router.push("/")
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="p-12 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Course</h2>

        {/* Course Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Course Name</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default page;
