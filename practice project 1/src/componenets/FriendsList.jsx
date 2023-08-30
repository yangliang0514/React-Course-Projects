import Friend from "./Friend";

export default function FriendsList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          isSelected={selectedFriend?.id === friend.id}
        />
      ))}
    </ul>
  );
}
