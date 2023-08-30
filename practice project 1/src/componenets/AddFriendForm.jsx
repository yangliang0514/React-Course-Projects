import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";

export default function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const id = uuidv4();

    onAddFriend({ id, name, image: `${image}?=${id}`, balance: 0 });
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="name">Friend's name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <label htmlFor="image">Image URL</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
