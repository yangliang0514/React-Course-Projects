export default function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="">Friend's name</label>
      <input type="text" />
      <label htmlFor="">Image URL</label>
      <input type="text" />
      <button className="button">Add</button>
    </form>
  );
}
