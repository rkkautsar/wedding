import React, { useState } from "react";

export const AddComment = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className="w-full">
      <form
        className="pb-8 mb-4 border-black border-opacity-20 border-b"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ content: comment, author: username });
          setUsername("");
          setComment("");
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Jon Snow"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            className="font-sans shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={2}
            placeholder="Tell me what you think 😊"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-dusty-blue text-blue-ink hover:bg-blue-ink hover:text-white font-bold py-2 px-4 rounded border border-transparent focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-gray-400"
            type="submit"
            disabled={comment.length === 0 || username.length === 0}
          >
            Add comment
          </button>
        </div>
      </form>
    </div>
  );
};
