import React from "react";
import { useState, useEffect } from "react";
import fs from "fs";
function App() {
  const [tasks, setTasks] = useState([]);
  const [isPending, setIsPending] = useState(true);
  

  useEffect(() => {
    // Fetch data from JSON file (assuming it's in the public folder)
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {setTasks(data);  })
      .catch((error) => console.error("Error fetching data:", error));

      
  }, []);

  

  const sortByCreateDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.createDate) - new Date(b.createDate);
    });
    setTasks(sortedTasks);
  };

  const sortByDueDate = () => {
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
  }

  console.log(tasks);
  return (
    <div className="bg-white flex max-w-[480px] w-full flex-col items-stretch mx-auto pt-10">
      <header className="text-violet-800 text-4xl font-black whitespace-nowrap">
        TO-DO LIST
      </header>

      <div className="self-center flex w-[487px] flex-col max-w-full items-stretch justify-between gap-5 mt-5 max-md:flex-wrap max-md:mt-10">
        <div
          className="flex justify-between gap-0 text-lg font-semibold 
          whitespace-nowrap  items-stretch px-5 py-2
         rounded-2xl border-indigo-800"
        >
          <div
            className="text-violet-800 text-lg font-semibold whitespace-nowrap bg-indigo-100 justify-center items-stretch px-5 py-4 rounded-2xl"
            aria-label="Sort by"
          >
            sort by
          </div>

          <div
            className="text-black text-xl font-semibold self-center my-auto"
            aria-label="Due date"
          onClick={()=>sortByCreateDate}>
            Date Created
          </div>

          <div
            className="text-black text-xl font-semibold self-center my-auto"
            onClick={()=>sortByDueDate}
            aria-label="Due date"
          >
            Due date
          </div>
        </div>

        <div className=" text-white  text-lg font-semibold whitespace-nowrap bg-violet-800 self-stretch justify-center items-center mt-4 px-16 py-2 rounded-2xl">
          Create new task
        </div>
      </div>

      <div className="flex w-full flex-col items-stretch mt-4 pt-6 color-#E5E4FF">
        <div className="flex w-full flex-col pl-3 p-2 bg-indigo-100">
          <div className="flex space-x-1">
            <h2 className="text-black text-3xl font-bold self-stretch">
              Pending Tasks
            </h2>
            <div className="text-white text-lg font-semibold whitespace-nowrap bg-violet-800 self-stretch justify-center items-center mt-4 px-16 py-2 rounded-2xl">
              Create new task
            </div>
          </div>

          {tasks.map(
            (task) =>
              ((isPending && !task.isCompleted) ||
                (!isPending && task.isCompleted)) && (
                <div
                  className="mx-1 bg-white self-stretch flex w-full flex-col items-stretch mt-3 pt-4 pb-2.5 px-2.5 rounded-2xl"
                  key={task.createDate}
                >
                  <div className="text-black text-xl font-semibold whitespace-nowrap overflow-hidden line-clamp-3">
                    {task.title}
                  </div>
                  <div onClick={()=>completeTask(task.createDate)} className="flex justify-between gap-5 mt-7 items-start">
                   {!task.isCompleted&& <button className="text-lime-700 text-center text-lg font-semibold whitespace-nowrap bg-lime-50 grow items-stretch pt-3.5 pb-1.5 px-9 rounded-md">
                      Complete
                    </button>}
                    <button onClick={deleteTask} className="text-red-800 text-center text-lg font-semibold whitespace-nowrap bg-rose-200 grow justify-center items-stretch px-12 py-3 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>

        <footer className="bg-violet-50 bg-opacity-90 flex items-stretch justify-between gap-5 pr-12 rounded-none border-t-black border-t border-solid">
          <div
            onClick={() => setIsPending(true)}
            className="text-black text-center text-xl font-bold whitespace-nowrap bg-slate-400 grow justify-center items-stretch px-14 py-5"
          >
            Pending
          </div>
          <div
            onClick={() => setIsPending(false)}
            className="text-black text-center text-xl font-semibold my-auto"
          >
            Completed
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
