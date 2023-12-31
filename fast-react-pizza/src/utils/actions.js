import { redirect } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";

const phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export async function createOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};

  if (!phoneRegex.test(order.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  // the createOrder function in the apiRestaurant will return the newly created order object
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
