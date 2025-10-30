import React, { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle, UserX, ToggleLeft, ToggleRight } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    img: "",
    audio: "",
    mood: "",
  });
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    plan: "Free",
    active: true,
    loggedIn: false,
  });
  const [editSong, setEditSong] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/allSongs")
      .then((res) => res.json())
      .then(setSongs)
      .catch(console.error);
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      await fetch(`https://melodia-data-5.onrender.com/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("All fields are required!");
      return;
    }

    const userData = {
      ...newUser,
      id: Date.now().toString(),
      email: newUser.email.toLowerCase(),
    };

    const res = await fetch("https://melodia-data-5.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    setUsers([...users, data]);
    setNewUser({
      username: "",
      email: "",
      password: "",
      role: "user",
      plan: "Free",
      active: true,
      loggedIn: false,
    });
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleSaveUserEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://melodia-data-5.onrender.com/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      });
      const updated = await res.json();
      setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      setEditUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const handleToggleActive = async (user) => {
    const updated = { ...user, active: !user.active };
    await fetch(`https://melodia-data-5.onrender.com/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !user.active }),
    });
    setUsers(users.map((u) => (u.id === user.id ? updated : u)));
  };

  const handleToggleLoggedIn = async (user) => {
    const updated = { ...user, loggedIn: !user.loggedIn };
    await fetch(`https://melodia-data-5.onrender.com/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loggedIn: !user.loggedIn }),
    });
    setUsers(users.map((u) => (u.id === user.id ? updated : u)));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this song?")) {
      await fetch(`https://melodia-data-5.onrender.com/allSongs/${id}`, {
        method: "DELETE",
      });
      setSongs(songs.filter((s) => s.id !== id));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const songData = {
      id: Date.now().toString(),
      title: newSong.title,
      artist: newSong.artist,
      img: newSong.img.startsWith("/songs/")
        ? newSong.img
        : `/songs/trending/photo/${newSong.img}`,
      audio: newSong.audio.startsWith("/songs/")
        ? newSong.audio
        : `/songs/trending/song/${newSong.audio}`,
      mood: newSong.mood,
    };

    const res = await fetch("https://melodia-data-5.onrender.com/allSongs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(songData),
    });

    const data = await res.json();
    setSongs([...songs, data]);
    setNewSong({ title: "", artist: "", img: "", audio: "", mood: "" });
  };

  const handleEditSong = (song) => setEditSong(song);

  const handleSaveEditSong = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://melodia-data-5.onrender.com/allSongs/${editSong.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editSong),
      });
      const updated = await res.json();
      setSongs(songs.map((s) => (s.id === updated.id ? updated : s)));
      setEditSong(null);
    } catch (error) {
      console.error("Error updating song:", error);
      alert("Failed to update song");
    }
  };

  return (
    <div className="p-6 md:ml-64 bg-[#0D0D0D] min-h-screen text-[#EAEAEA]">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Users</h2>
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Plan</th>
              <th className="p-2 text-left">Active</th>
              <th className="p-2 text-left">Logged In</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-700">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.role}</td>
                <td className="p-2">{u.plan}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleToggleActive(u)}
                    className={`p-1 rounded ${
                      u.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {u.active ? <ToggleRight /> : <ToggleLeft />}
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleToggleLoggedIn(u)}
                    className={`p-1 rounded ${
                      u.loggedIn ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {u.loggedIn ? "🟢" : "🔴"}
                  </button>
                </td>
                <td className="p-2 flex justify-center gap-3">
                  <button
                    onClick={() => handleEditUser(u)}
                    className="p-2 bg-blue-600 rounded hover:bg-blue-500"
                    title="Edit User"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="p-2 bg-red-600 rounded hover:bg-red-500"
                    title="Remove User"
                  >
                    <UserX size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <PlusCircle /> Add New User
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            />
            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={newUser.plan}
              onChange={(e) =>
                setNewUser({ ...newUser, plan: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
              <option value="Pro">Pro</option>
            </select>
            <button
              onClick={handleAddUser}
              className="bg-green-600 hover:bg-green-500 p-2 rounded text-white"
            >
              Add User
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">All Songs</h2>
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Artist</th>
              <th className="p-2 text-left">Mood</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} className="border-t border-gray-700">
                <td className="p-2">{song.title}</td>
                <td className="p-2">{song.artist}</td>
                <td className="p-2">{song.mood}</td>
                <td className="p-2 flex justify-center gap-3">
                  <button
                    onClick={() => handleEditSong(song)}
                    className="p-2 bg-blue-600 rounded hover:bg-blue-500"
                    title="Edit Song"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="p-2 bg-red-600 rounded hover:bg-red-500"
                    title="Delete Song"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <PlusCircle /> Add New Song
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Image filename (eg: image.jpeg)"
            value={newSong.img}
            onChange={(e) => setNewSong({ ...newSong, img: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Audio filename (eg: song.mp3)"
            value={newSong.audio}
            onChange={(e) => setNewSong({ ...newSong, audio: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Mood"
            value={newSong.mood}
            onChange={(e) => setNewSong({ ...newSong, mood: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-500 p-2 rounded text-white"
          >
            Add Song
          </button>
        </div>
      </section>

      {editSong && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-[#1E1E1E] p-6 rounded-lg w-[400px]">
            <h2 className="text-xl mb-4 font-semibold">Edit Song</h2>
            <form onSubmit={handleSaveEditSong} className="flex flex-col gap-3">
              <input
                type="text"
                value={editSong.title}
                onChange={(e) =>
                  setEditSong({ ...editSong, title: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                value={editSong.artist}
                onChange={(e) =>
                  setEditSong({ ...editSong, artist: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                value={editSong.mood}
                onChange={(e) =>
                  setEditSong({ ...editSong, mood: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              />
              <div className="flex justify-between mt-3">
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditSong(null)}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-[#1E1E1E] p-6 rounded-lg w-[400px]">
            <h2 className="text-xl mb-4 font-semibold">Edit User</h2>
            <form onSubmit={handleSaveUserEdit} className="flex flex-col gap-3">
              <input
                type="text"
                value={editUser.username}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              />
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              />
              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <select
                value={editUser.plan}
                onChange={(e) =>
                  setEditUser({ ...editUser, plan: e.target.value })
                }
                className="p-2 rounded bg-gray-800 text-white"
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
              </select>

              <div className="flex items-center gap-2">
                <label>Active:</label>
                <input
                  type="checkbox"
                  checked={editUser.active}
                  onChange={(e) =>
                    setEditUser({ ...editUser, active: e.target.checked })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <label>Logged In:</label>
                <input
                  type="checkbox"
                  checked={editUser.loggedIn}
                  onChange={(e) =>
                    setEditUser({ ...editUser, loggedIn: e.target.checked })
                  }
                />
              </div>

              <div className="flex justify-between mt-3">
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 