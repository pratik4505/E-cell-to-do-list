import React, { useState } from "react";

function TaskForm(props) {
  // State variables for date and image
  const [dueDate, setDueDate] = useState(Date("15/11/2023"));
  const [image, setImage] = useState(null); // Change this to the actual type you'll use for image data

  // Event handlers for updating state variables
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleImageChange = (event) => {
    // Handle image upload and set the appropriate state
    // For simplicity, assuming a file input for image
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <form className="bg-white flex flex-col justify-between items-stretch p-3 rounded-2xl h-full">
      <header className="text-violet-800 text-4xl font-semibold mb-6">
        New Task
      </header>

      <input
        className="text-black text-xl font-light whitespace-nowrap bg-indigo-100 mt-2 p-3 rounded-2xl"
        type="text"
        id="title"
        placeholder="Title"
        aria-label="Title"
        aria-required="true"
      />

      <textarea
        id="description"
        className="text-black text-xl font-light whitespace-nowrap bg-indigo-100 mt-4 p-3 rounded-2xl"
        placeholder="Description..."
        aria-label="Description"
        aria-required="true"
        rows="4"
      ></textarea>

<div className="flex items-end justify-between mt-4 rounded-2xl bg-indigo-100">
  {/* Your date input */}
  <input
    className="text-black text-xl font-light whitespace-nowrap"
    type="date"
    id="dueDate"
    placeholder="Due Date"
    aria-label="Due Date"
    value={dueDate}
    onChange={handleDueDateChange}
    style={{ display: "none" }} // hide the default date input
  />

  {/* Your custom-styled "Choose Date" button */}
  <label
    htmlFor="dueDate"
    className="custom-date-input button bg-neutral-500 p-3 rounded-r-2xl ml-auto"
  >
    Choose Date
  </label>
</div>


      <div className="flex items-end justify-between mt-4 rounded-2xl bg-indigo-100">
        {/* Your file input */}
        <input
          className="text-black text-xl font-light whitespace-nowrap"
          type="file"
          id="image"
          accept="image/*"
          placeholder="No Image"
          aria-label="Image"
          onChange={handleImageChange}
          style={{ display: "none" }} // hide the default file input
        />

        {/* Your custom-styled "Choose File" button */}
        <label
          htmlFor="image"
          className="custom-file-input button bg-neutral-500 p-3 rounded-r-2xl ml-auto "
        >
          Choose File
        </label>
      </div>

      <div className="flex items-center justify-between mt-4 flex-grow">
        <button
          className=" py-4 w-[48%] font-medium border border-transparent rounded-md hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500"
          onClick={() => {
            props.closeDialog();
          }}
        >
          Cancel
        </button>
        <button className="w-[48%] py-4 font-medium text-white bg-violet-800 border border-transparent rounded-md hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500">
          Save
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
