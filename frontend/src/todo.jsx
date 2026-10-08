import { useState, useEffect } from "react";

export function Main({logout}) {
  const [showForm, setShowForm] = useState(false);
  const [list, setlist] = useState([]);
  const [reload, setReload] = useState(0);
  const [filter, setFilter] = useState("today");
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
        if(res.status === 401){
          logout()
        }
        const data = await res.json();
        if (!ignore) setlist(data);
      } catch (error) {
        console.log("Server Error", error);
        
      }
    }

    show();
    return () => { ignore = true; };
  }, [reload,logout]);

    async function remove(id) {
    try {
      const res = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) {
        console.log("couldnt delete it");
        return;
      }
      setlist((old) => old.filter((t) => t.id !== id));
    } catch (error) {
      console.log("an Error happened", error);
  
    }
  }
  const today = new Date().toLocaleDateString("en-CA");

  const visible = list.filter((t) =>
    filter === "today" ? t.date === today : t.date > today
  );

  return (
    <div className="mainlayout">
      <div className="sidecontainer">
        <div className="sidecontainerbuttons">
          <button
            className={filter === "today" ? "active" : ""}
            onClick={() => { setFilter("today"); setShowForm(false); }}
          >
            Today
          </button>
          <button
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => { setFilter("upcoming"); setShowForm(false); }}
          >
            Upcoming
          </button>
          <button className="create" onClick={() => setShowForm(true)}>Create todo</button>
          <button className="logout" onClick={logout}>Log out</button>
        </div>
      </div>

      <div className="maincontainer">
        {showForm && (
          <Createtask
            onback={() => setShowForm(false)}
            onCreated={() => setReload((r) => r + 1)}
          />
        )}

        {!showForm && (
          <>
            <h2>{filter === "today" ? "Today" : "Upcoming"}</h2>
            {visible.length === 0 && <p className="empty">Nothing here yet.</p>}
            {visible.map((t) => (
              <Showtask
                key={t.id}
                task={t.task}
                date={t.date}
                onremove={() => remove(t.id)}
              />
            ))}
          </>
        )}
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
    onCreated();  
    onback();      
  } catch (error) {
    console.log("An Error occured", error);
  }
}

function Showtask({ task, date, onremove }) {
  return (
    <div className="card">
      <p>{task}</p>
      <p>{date ? new Date(date + "T00:00:00").toLocaleDateString() : "no date"}</p>
      <input type="checkbox" name="completed" />
      <button onClick={onremove}>
        <img src="/bin-delete-garbage-svgrepo-com.svg" alt="bin" />
      </button>
    </div>
  );
}


