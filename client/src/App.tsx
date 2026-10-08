import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import NoticeCard from "./components/NoticeCard";
import type { Notice } from "./types";

function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Part C.1 : when the page opens, load the notices from MongoDB via the API
  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data: Notice[]) => setNotices(data))
      .catch(() => setError("Could not load notices from the server."));
  }, []);

  // Part C.2 : save the new notice in MongoDB and show it in the list
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not add the notice.");
        return;
      }
      setNotices((prev) => [data as Notice, ...prev]);
      setTitle("");
      setMessage("");
    } catch {
      setError("Could not reach the server.");
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Department Notice Board</h1>
        <p>Department of Computer Science and Engineering</p>
      </header>

      <form className="notice-form" onSubmit={handleAdd}>
        <h2>Add a Notice</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Add</button>
      </form>

      <section>
        <h2>Notices</h2>
        {notices.length === 0 && <p className="empty">No notices yet.</p>}
        {notices.map((n) => (
          <NoticeCard key={n._id} title={n.title} message={n.message} />
        ))}
      </section>
    </div>
  );
}

export default App;
