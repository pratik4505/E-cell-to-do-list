import React from "react";
import { useState, useEffect } from "react";

import Model from "./components/Model";
import TaskForm from "./components/TaskForm";
import Description from "./components/Description";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isAddTask, setIsAddTask] = useState(false);
  const [screen, setScreen] = useState([false, false, false]);
  const [description, setDescription] = useState(false);
  const [sortBy, setSortBy] = useState(false);

  useEffect(() => {
    // Fetch data from JSON file (assuming it's in the public folder)
    // handleResize();
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const sortByCreateDate = () => {
    setSortBy(false);
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.createDate) - new Date(b.createDate);
    });
    setTasks(sortedTasks);
  };

  const sortByDueDate = () => {
    setSortBy(true);
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    setTasks(sortedTasks);
  };

  const completeTask = (createDate) => {
    const updatedTasks = tasks.map((task) =>
      task.createDate === createDate ? { ...task, isCompleted: true } : task
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (createDate) => {
    const updatedTasks = tasks.filter((task) => task.createDate !== createDate);
    setTasks(updatedTasks);
  };

  return (
    <React.Fragment>
      {isAddTask && (
        <Model closeDialog={() => setIsAddTask(false)}>
          <TaskForm closeDialog={() => setIsAddTask(false)} />
        </Model>
      )}
      <div
        className={
          `flex flex-col justify-center m-auto w-full sm:w-[90%] ` +
          `${description ? "" : "sm:w-[60%]"}`
        }
      >
        <header className="text-violet-800 text-4xl font-black whitespace-nowrap flex justify-center lg:justify-start ">
          TO-DO LIST
        </header>

        <div className=" flex  flex-col mx-auto justify-between gap-5 mt-5 w-[70%]  md:flex-row md:justify-end md:w-full">
          <div className="flex text-lg font-semibold rounded-2xl w-auto border-2 border-indigo-700 justify-center max-w-[294] md:max-w-full">
            <div
              className="text-violet-800 text-lg font-semibold whitespace-nowrap bg-indigo-100 justify-center items-stretch px-5 py-2 rounded-tl-2xl rounded-bl-2xl hidden md:block "
              aria-label="Sort by"
            >
              sort by
            </div>

            <div
              className={`text-black text-xl text-center font-semibold m-0 flex-grow px-2 py-2 rounded-tl-2xl rounded-bl-2xl md:rounded-none ${
                !sortBy ? "bg-slate-400" : ""
              }`}
              aria-label="Due date"
              onClick={() => sortByCreateDate()}
            >
              Date Created
            </div>

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

          <div
            onClick={() => setIsAddTask(true)}
            className="text-white text-lg font-semibold whitespace-nowrap bg-violet-800 self-stretch justify-center items-center  text-center py-2 rounded-2xl md:hidden lg:block md:px-12"
          >
            Create new task
          </div>
        </div>


     
        <div className="flex w-full  mt-4 pt-6 color-#E5E4FF h-screen">
          <div className={`flex w-full flex-col items-stretch  color-#E5E4FF `}>
            <div
              className={`flex w-full flex-col bg-indigo-100 justify-center p-3 rounded-tl-2xl rounded-tr-2xl ${
                !description ? "" : "border-r-2 border-black rounded-tr-8xl"
              }`}
            >
              <div className="flex items-center  justify-between m-2">
                <h2 className="text-black text-3xl font-bold self-stretch items-center">
                  Pending Tasks
                </h2>

                <div
                  onClick={() => setIsAddTask(true)}
                  className="text-white text-lg font-semibold whitespace-nowrap bg-violet-800 self-stretch justify-center items-center  px-16 py-2 rounded-2xl hidden md:block lg:hidden"
                >
                  Create new task
                </div>
              </div>

              <div className="overflow-scroll ">
                {tasks.map(
                  (task) =>
                    ((isPending && !task.isCompleted) ||
                      (!isPending && task.isCompleted)) && (
                      <div
                        className="bg-white self-stretch flex w-full flex-col items-stretch mt-3 py-5 px-2.5 rounded-2xl md:flex-row lg:flex-row md:justify-between"
                        key={task.createDate}
                        onClick={() => setDescription(task)}
                      >
                        <div className="text-black text-xl font-semibold whitespace-nowrap overflow-hidden ">
                          {task.title}
                        </div>
                        <div className="flex justify-between gap-5  items-center mt-4 md:mt-0 md:flex-col lg:flex-row">
                          {!task.isCompleted && (
                            <button
                              onClick={() => completeTask(task.createDate)}
                              className="text-lime-700 text-center text-lg font-semibold whitespace-nowrap bg-lime-50 grow items-stretch px-8 py-2 rounded-md"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={deleteTask}
                            className="text-red-800 text-center text-lg font-semibold whitespace-nowrap bg-rose-200 grow justify-center items-stretch px-11 py-2 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>

            <footer className="bg-violet-50 bg-opacity-90 flex items-stretch justify-between gap-5 pr-12 rounded-none border-t-black border-t border-solid">
              <div
                onClick={() => setIsPending(true)}
                className={`text-black text-center text-xl font-bold whitespace-nowrap grow justify-center items-stretch px-14 py-5 ${
                  isPending ? "bg-slate-400" : ""
                }`}
              >
                Pending
              </div>

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

          {window.innerWidth>=769&&description && <Description data={description} border={true} />}
        </div>

      </div>
     
        {window.innerWidth<769&&description && (
          <Model closeDialog={() => setDescription(null)}>
            <Description data={description} border={false} closeDialog={() => setDescription(null)} />
          </Model>
        )}
     
    </React.Fragment>
  );
}

export default App;
