import { useState, useEffect } from "react";

export function Main() {
  const [showForm, setShowForm] = useState(false);
  const [list, setlist] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function show() {
      try {
        const res = await fetch("http://localhost:3000/todo", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) {
          console.log("couldn t get data");
          return;
        }
        const data = await res.json();
        if (!ignore) setlist(data);
      } catch (error) {
        console.log("Server Error", error);
      }
    }

    show();
    return () => { ignore = true; };
  }, [reload]);

  return (
    <div>
      <div className="sidecontainer">
        <div className="sidecontainerbuttons">
          <button>Today</button>
          <button>Upcoming</button>
          <button onClick={() => setShowForm(true)}>Create todo</button>
        </div>
      </div>

      <div className="maincontainer">
        {showForm && (
          <Createtask
            onback={() => setShowForm(false)}
            onCreated={() => setReload((r) => r + 1)}
          />
        )}

        {!showForm && list.map((t) => (
          <Showtask key={t.id} task={t.task} date={t.date} />
        ))}
      </div>
    </div>
  );
}

function Createtask({ onback, onCreated }) {
  return (
    <form className="formcreatetodo" onSubmit={(e) => handletask(e, onback, onCreated)}>
      <div>
        <label htmlFor="task">Task:</label>
        <input id="task" name="task" type="text" placeholder="Task" required />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input id="date" name="date" type="date" required />
      </div>
      <div className="buttonsform">
        <button type="submit">Submit</button>
        <button type="button" onClick={onback}>Back</button>
      </div>
    </form>
  );
}

async function handletask(e, onback, onCreated) {
  e.preventDefault();
  const form = e.target;
  const data = {
    task: form.task.value,
    date: form.date.value,
  };
  try {
    const res = await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return console.log("Error:", result.message);
    }
    console.log(result.message);
    onCreated();   // Main refetches the list
    onback();      // close the form
  } catch (error) {
    console.log("An Error occured", error);
  }
}

function Showtask({ task, date }) {
  return (
    <div className="card">
      <p>{task}</p>
      <p>{date ? new Date(date).toLocaleDateString() : "no date"}</p>
      <input type="checkbox" name="completed" />
      <button>
        <img src="bin-delete-garbage-svgrepo-com.svg" alt="bin"/>
      </button>
    </div>
  );
}