import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineDownloadDone } from "react-icons/md";

export default function Home() {
  const baseUrl = "https://hr-todo.sahda.ir";
  const [todo, setTodo] = useState("");
  const [uncompleted, setUncompleted] = useState([]);
  const ListFn = () => {
    let myList=
    uncompleted.map((item, index) => {
      return (
        <div
          className=" rounded-lg p-4 w-1/2 h-14 m-2 justify-between flex items-center bg-white"
          key={item.id}
        >
          <div>
            <h2>
              {index + 1}-{item.item}
            </h2>
          </div>
          <div className="flex gap-4">
            <MdDeleteForever
              onClick={() => deleteTask(item.id)}
              className=" text-red-600 text-2xl"
            />
            <MdOutlineDownloadDone
              onClick={() => editTask(item.id)}
              className=" text-gray-600 text-2xl"
            />
          </div>
        </div>
      );
    });
    return myList;
  };
  useEffect(() => {
    getTasks();
  }, []);
  const editTask = (id) => {
    let body = JSON.stringify({
      id,
      type: "2",
      sort: true,
    });

    let request = {
      method: "PUT",
      body,
    };

    fetch(`${baseUrl}/update.php`, request)
      .then((response) => response.text())
      .then((resualt) => {
        getTasks();
        console.log(resualt);
      })
      .catch((eror) => console.log(eror));
  };
  const deleteTask = (id) => {
    //اینجا به ارور 500 میخوردم فکر میکنم مشکل از سرور باشه
    let body = `{"id":${id},"type":2 }`;
    let request = {
      method: "DELETE",
      body,
    };

    fetch(`${baseUrl}/delete.php`, request)
      .then((response) => response.text())
      .then((resualt) => {
        console.log(resualt);
        getTasks();
      })
      .catch((error) => console.log("error", error));
  };
  const getTasks = () => {
    fetch(baseUrl, {
      method: "Get",
    })
      .then((response) => response.text())
      .then((resualt) => {
        const resualtObj = JSON.parse(resualt);
        if (resualtObj.uncompleted) {
          setUncompleted(resualtObj.uncompleted);
        }
      })
      .catch((eror) => console.log("error", eror));
  };

  const postTasks = () => {
    setTodo("");
    let body = JSON.stringify({
      item: todo,
    });
    let request = {
      method: "POST",
      body,
    };

    fetch(`${baseUrl}/create/task/`, request)
      .then((response) => response.text())
      .then((resualt) => {
        getTasks();

        console.log(resualt);
      })
      .catch((eror) => console.log("error", eror));
  };
  return (
    <div className=" bg-cyan-700 h-screen w-full">
      <div className="flex items-center flex-col">
        <div className="flex flex-col justify-evenly items-center p-5 rounded bg-white w-1/2 h-36 shadow-2xl">
          <div className=" -mt-5 w-full">
            <h2 className=" text-xl">type somthing to do:</h2>
          </div>
          <div className=" w-full flex justify-evenly">
            <input
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              className=" w-[79%] p-2 h-10 border-2 rounded-md border-cyan-700"
            />
            <button
              onClick={() => postTasks()}
              className=" w-[19%] rounded-md bg-sky-400 hover:text-white hover:bg-sky-600"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className=" flex w-full flex-col justify-center items-center">
            {ListFn()}
          </div>
        </div>
        <Link
          className="flex items-center p-2 justify-center rounded-2xl h-10 bg-sky-400"
          href="/Done"
        >
          click to see your done tasks
        </Link>
      </div>
    </div>
  );
}
