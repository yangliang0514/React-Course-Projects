import FriendsList from "./componenets/FriendsList";
import friends from "../public/data";
import FormAddFriend from "./componenets/FormAddFriend";
import Button from "./componenets/Button";
import FormSplitBill from "./componenets/FormSplitBill";

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList data={friends} />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
