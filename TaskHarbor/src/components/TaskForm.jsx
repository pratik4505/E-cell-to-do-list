import React from "react";

function TaskForm() {
  return (
    <form className="bg-white flex max-w-[390px] flex-col items-stretch pl-7 pr-4 pt-9 pb-6 rounded-2xl">
      <header className="text-violet-800 text-4xl font-semibold">New Task</header>
      <div className="text-black text-xl font-light whitespace-nowrap bg-indigo-100 justify-center mt-10 pl-6 pr-16 py-6 rounded-2xl items-start">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="input"
          placeholder="Title"
          aria-label="Title"
          aria-required="true"
        />
      </div>
      <div className="text-black text-xl font-light whitespace-nowrap bg-indigo-100 aspect-square mt-2 pl-6 pr-16 pt-7 pb-64 rounded-2xl items-start">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          id="description"
          className="input"
          placeholder="Description..."
          aria-label="Description"
          aria-required="true"
          rows="4"
        ></textarea>
      </div>
      <div className="bg-indigo-100 flex items-center justify-between gap-3.5 mt-2 pl-6 rounded-2xl">
        <div className="text-black text-xl font-light grow whitespace-nowrap my-auto">
          Due on: 15-11-2023
        </div>
        <button className="button bg-neutral-500 pl-5 pr-8 py-6 rounded-none">
          Change
        </button>
      </div>
      <div className="bg-indigo-100 flex items-center justify-between gap-5 mt-2 pl-7 rounded-2xl">
        <div className="text-black text-xl font-light my-auto">No image...</div>
        <button className="button bg-neutral-500 px-3 py-6 rounded-none">
          Add image
        </button>
      </div>
      <div className="flex items-center justify-between gap-5 mt-8 px-0.5">
       
        <button className="button bg-violet-800 pl-12 pr-10 py-6 rounded-2xl">
          Save
        </button>
      </div>
    </form>
  );
}

export default TaskForm;