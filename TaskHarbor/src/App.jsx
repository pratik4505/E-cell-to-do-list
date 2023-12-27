import React, { useState, useEffect } from "react";

import Model from "./components/Model";
import TaskForm from "./components/TaskForm";
import Description from "./components/Description";

function App() {
  // State variables to manage tasks, modal visibility, and sorting
  const [tasks, setTasks] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isAddTask, setIsAddTask] = useState(false);
  const [description, setDescription] = useState(null);
  const [sortBy, setSortBy] = useState(false);

  // Fetch tasks data from a JSON file when the component mounts
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to sort tasks by creation date
  const sortByCreateDate = () => {
    setSortBy(false);
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.createDate) - new Date(b.createDate);
    });
    setTasks(sortedTasks);
  };

  // Function to sort tasks by due date
  const sortByDueDate = () => {
    setSortBy(true);
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    setTasks(sortedTasks);
  };

  // Function to mark a task as completed
  const completeTask = (createDate) => {
    const updatedTasks = tasks.map((task) =>
      task.createDate === createDate ? { ...task, isCompleted: true } : task
    );

    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (createDate) => {
    const updatedTasks = tasks.filter((task) => task.createDate !== createDate);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex w-full justify-center h-844">
      {/* Modal for adding a new task */}
      {isAddTask && (
        <Model closeDialog={() => setIsAddTask(false)}>
          <TaskForm closeDialog={() => setIsAddTask(false)} />
        </Model>
      )}

      {/* Main content container */}
      <div
        className={
          `flex flex-col justify-center m-auto  sm:w-[90%] ` +
          `${description ? "" : ' sm:w-[60%]'}`
        }
      >
        {/* Header */}
        <header className="text-violet-800 text-4xl font-black whitespace-nowrap flex justify-center lg:justify-start">
          TO-DO LIST
        </header>

        {/* Sorting options */}
        <div className=" flex  flex-col mx-auto justify-between gap-5 mt-5 w-[70%]  md:flex-row md:justify-end md:w-full">
          <div className="flex text-lg font-semibold rounded-2xl w-auto border-2 border-indigo-700 justify-center max-w-[294] md:max-w-full">
            <div
              className="text-violet-800 text-lg font-semibold whitespace-nowrap bg-indigo-100 justify-center items-stretch px-5 py-2 rounded-tl-2xl rounded-bl-2xl hidden md:block "
              aria-label="Sort by"
            >
              sort by
            </div>

            {/* Sort by Date Created */}
            <div
              className={`text-black text-xl text-center font-semibold m-0 flex-grow px-2 py-2 rounded-tl-2xl rounded-bl-2xl md:rounded-none ${
                !sortBy ? "bg-slate-400" : ""
              }`}
              aria-label="Due date"
              onClick={() => sortByCreateDate()}
            >
              Date Created
            </div>

            {/* Sort by Due Date */}
            <div
              className={`text-black text-xl font-semibold text-center m-0 px-2 py-2 rounded-tr-2xl rounded-br-2xl flex-grow ${
                sortBy ? "bg-slate-400" : ""
              }`}
              onClick={() => sortByDueDate()}
              aria-label="Due date"
            >
              Due date
            </div>
          </div>

          {/* Button to create a new task */}
          <div
            onClick={() => setIsAddTask(true)}
            className="text-white text-lg font-semibold whitespace-nowrap bg-violet-800 self-stretch justify-center items-center  text-center py-2 rounded-2xl md:hidden lg:block md:px-12"
          >
            Create new task
          </div>
        </div>

        {/* Task List and Details */}
        <div className="flex w-full  mt-4 pt-6 color-#E5E4FF  ">
          <div className={`flex w-full flex-col   color-#E5E4FF min-h-full`}>
            {/* Task List */}
            <div
              className={`flex w-full flex-col bg-indigo-100 justify-center p-3 rounded-tl-2xl rounded-tr-2xl ${
                !description ? "" : "border-r-2 border-black rounded-tr-8xl"
              }`}
            >
              <div className="flex items-center  justify-between m-2 ">
                <h2 className="text-black text-3xl font-bold self-stretch items-center">
                  Pending Tasks
                </h2>

                {/* Button to create a new task (visible on larger screens) */}
                <div
                  onClick={() => setIsAddTask(true)}
                  className="text-white text-lg font-semibold whitespace-nowrap bg-violet-800 self-stretch justify-center items-center  px-16 py-2 rounded-2xl hidden md:block lg:hidden"
                >
                  Create new task
                </div>
              </div>

              {/* Task List */}
              <div className="overflow-y-scroll scrollbar">
                {tasks.map(
                  (task) =>
                    ((isPending && !task.isCompleted) ||
                      (!isPending && task.isCompleted)) && (
                      <div
                        className="bg-white self-stretch flex w-full flex-col items-stretch mt-3 py-5 px-2.5 rounded-2xl md:flex-row lg:flex-row md:justify-between"
                        key={task.createDate}
                      >
                        {/* Task Title (Clickable to show details) */}
                        <div
                          onClick={() => setDescription(task)}
                          className="text-black text-xl font-semibold whitespace-nowrap overflow-hidden "
                        >
                          {task.title}
                        </div>

                        {/* Task Actions (Complete and Delete) */}
                        <div className="flex justify-between gap-2 items-center mt-4 md:mt-0 md:flex-col lg:flex-row">
  {/* Complete Task Button */}
  {!task.isCompleted && (
    <button
      onClick={() => completeTask(task.createDate)}
      className="text-lime-700 text-center text-lg font-semibold whitespace-nowrap bg-lime-50 grow items-stretch px-3 sm:px-4 md:px-8 py-2 rounded-md"
    >
      Complete
    </button>
  )}
  {/* Delete Task Button */}
  <button
    onClick={() => deleteTask(task.createDate)}
    className="text-red-800 text-center text-lg font-semibold whitespace-nowrap bg-rose-200 grow justify-center items-stretch px-3 sm:px-4 md:px-11 py-2 rounded-md"
  >
    Delete
  </button>
</div>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Footer to switch between Pending and Completed Tasks */}
            <footer className="bg-violet-50 bg-opacity-90 flex items-stretch justify-between gap-5 rounded-none border-t-black border-t border-solid">
              {/* Button to show Pending Tasks */}
              <div
                onClick={() => setIsPending(true)}
                className={`text-black text-center text-xl font-bold whitespace-nowrap grow justify-center items-stretch px-14 py-5 ${
                  isPending ? "bg-slate-400" : ""
                }`}
              >
                Pending
              </div>

              {/* Button to show Completed Tasks */}
              <div
                onClick={() => setIsPending(false)}
                className={`text-black text-center text-xl font-bold whitespace-nowrap grow justify-center items-stretch px-14 py-5 ${
                  !isPending ? "bg-slate-400" : ""
                }`}
              >
                Completed
              </div>
            </footer>
          </div>

          {/* Description of a Task (visible on larger screens) */}
          {window.innerWidth >= 769 && description && (
            <Description data={description} border={true} />
          )}
        </div>

      </div>

      {/* Description of a Task (visible on smaller screens) */}
      {window.innerWidth < 769 && description && (
        <Model closeDialog={() => setDescription(null)}>
          <Description
            data={description}
            border={false}
            closeDialog={() => setDescription(null)}
          />
        </Model>
      )}
    </div>
  );
}

export default App;
