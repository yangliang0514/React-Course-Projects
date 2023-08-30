import Friend from "./Friend";

export default function FriendsList({ data }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}
