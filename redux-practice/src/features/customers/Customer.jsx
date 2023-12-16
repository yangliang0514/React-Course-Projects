import { useSelector } from "react-redux";

function Customer() {
  // this is a redux hook that has access to the store object
  // and also creates a subscription to the state (re-renders this component on state change)
  const customerName = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
