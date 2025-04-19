// src/pages/CreateHackathon.jsx
import React, { useState } from "react";

const CreateHackathon = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission (e.g., create hackathon logic)
    console.log("Hackathon created:", { title, description });
  };

  return (
    <div>
      <h1 className="text-3xl">Create a New Hackathon</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg">Title</label>
          <input
            type="text"
            id="title"
            className="mt-2 p-2 w-full border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg">Description</label>
          <textarea
            id="description"
            className="mt-2 p-2 w-full border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Create Hackathon
        </button>
      </form>
    </div>
  );
};

export default CreateHackathon;
