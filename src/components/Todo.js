import { useState, useEffect } from "react";
import styles from "./Todo.module.css";
import Pagination from "./Pagination";

const Todo = () => {
  const [task, setTask] = useState("");
  const [emptyHanlder, setEmptyHanlder] = useState("");
  const [date, setDate] = useState("");
  const today = new Date();

  // <<----wORKING --------------->>>>>
  //setting a current page usuall equals to 1..
  const [currentPage, setCurrentPage] = useState(1);
  //how many data we have to show in per page..
  const dataPerPage = 5;

  //date
  let message;
  let isSubmitDisabled = false;
  if (date) {
    const dateObject = new Date(date);
    if (dateObject.toDateString() === today.toDateString()) {
      message = "Today and the selected date are same";
    } else if (dateObject > today) {
      message = "";
    } else {
      message =
        "The selected date is in the past. You have already completed the task. ";
      isSubmitDisabled = true;
    }
  }

  //task array and storing it in localStorage..
  const [TODO_DUMMY, setTodoDummy] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("TODO_DUMMY");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });

  //setting the tasks in localStorage
  useEffect(() => {
    localStorage.setItem("TODO_DUMMY", JSON.stringify(TODO_DUMMY));
  }, [TODO_DUMMY]);

  //handler to add items..
  const addHandler = (e) => {
    e.preventDefault();
    // console.log(task);

    if (task.trim() !== "" && date.trim() !== "") {
      setTodoDummy([
        ...TODO_DUMMY,
        {
          id: TODO_DUMMY.length + 1,
          task: task,
          date: new Date().toLocaleDateString(),
          complete: date,
        },
      ]);
    } else {
      setEmptyHanlder("kindly add a task");
    }

    setTask("");
    setDate("");
  };

  //handler deleteItem
  const deleteItemHandler = (id) => {
    setTodoDummy(TODO_DUMMY.filter((TODO_DUMMY) => TODO_DUMMY.id !== id));
  };

  //startIndex ==> where we have to start so bascially we are taking currentPage - 1 because index start with zero
  //and multiplity wiht data how much data we want to present..
  const startIndex = (currentPage - 1) * dataPerPage;
  //endIndex ==> what is the end index for the page that starting which is actually 0 and the data per page..
  const endIndex = startIndex + dataPerPage;
  //currentData==> how much data of array we have to show like from 0 to where so slice is used startIndex, endIndex...
  const currentData = TODO_DUMMY.slice(startIndex, endIndex);

  //now we are handling per page by setting our currentpage value because as we click on next the page must change..
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(currentData);
  return (
    <div>
      <div className={styles.headings}>
        <span>Todo App</span>
      </div>

      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.heading}>
            <span>What to do next?</span>
          </div>
        </div>
        <form onSubmit={addHandler}>
          <div>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={styles.input}
            />
          </div>

          <div>
            <div className={styles.flex} style={{ margin: "2rem" }}>
              <div className={styles.text}>
                <span>When you Gonna finish it?</span>
              </div>
              <div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.date}
                />
              </div>
            </div>
            <div>
              <button disabled={isSubmitDisabled} className={styles.btn}>
                Add
              </button>
            </div>
          </div>
        </form>
        {date && <span className={styles.subText}>{message}</span>}
        {task.trim() !== "" ? (
          ""
        ) : (
          <span className={styles.subText}>{emptyHanlder} </span>
        )}
        {currentData.length === 0 ? (
          <div style={{ height: "100%", background: "#9B84FF" }}></div>
        ) : (
          <div>
            {currentData.map((list) => {
              return (
                <div key={Math.random()} className={styles.List}>
                  <div style={{ padding: "2rem 2rem" }}>
                    <span className={styles.mainText}>{list.task}</span>
                  </div>
                  <div className={styles.changeDiv}>
                    <div>
                      <span className={styles.mainTexts}>{list.complete}</span>
                    </div>
                    <div>
                      <button
                        onClick={() => deleteItemHandler(list.id)}
                        className={styles.btn2}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Pagination
          dataPerPage={dataPerPage}
          totalData={TODO_DUMMY.length}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Todo;
