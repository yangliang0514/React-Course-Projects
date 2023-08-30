import FriendsList from "./componenets/FriendsList";
import data from "../public/data";
import AddFriendForm from "./componenets/AddFriendForm";
import Button from "./componenets/Button";
import SplitBillForm from "./componenets/SplitBillForm";
import { useState } from "react";

export default function App() {
  const [addOpen, setAddOpen] = useState(false);
  const [friends, setFriends] = useState(data);
  const [selectedFriend, setSelectFriend] = useState(null);

  function showAddFriend() {
    setAddOpen((open) => !open);
    setSelectFriend(null);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setAddOpen(false);
  }

  function handleSelect(friend) {
    setSelectFriend(friend);
    setAddOpen(false);
  }

  function handleUpdateBalance(newFriend) {
    setFriends((friends) =>
      friends.map((friend) => {
        if (friend.id === newFriend.id) {
          setSelectFriend(newFriend);
          return newFriend;
        }
        return friend;
      })
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
        {addOpen && (
          <AddFriendForm
            onAddFriend={handleAddFriend}
            closeAddForm={() => setAddOpen(false)}
          />
        )}
        <Button onClick={showAddFriend}>
          {addOpen ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBillForm
          friend={selectedFriend}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}
