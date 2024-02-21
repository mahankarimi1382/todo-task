import React, { useEffect, useState } from "react";
import { baseUrl } from "../api/hello";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineDownloadDone } from "react-icons/md";
function index() {
  const [completed, setcompleted] = useState([]);

  const getTasks = () => {
    fetch(baseUrl, {
      method: "Get",
    })
      .then((res) => res.text())
      .then((res) => {
        const resualt = JSON.parse(res);
        if (resualt.completed) {
          setcompleted(resualt.completed);
        }
      })
      .catch((err) => console.log("error", err));
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className=" bg-cyan-700 h-screen w-full flex justify-center items-center">
      <div className=" w-full flex items-center justify-center flex-col">
        {completed.map((item, index) => {
          console.log(item.item);
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
                <MdOutlineDownloadDone className=" text-green-600 text-2xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default index;
