import { getMenu, getOrder } from "../services/apiRestaurant";

export async function menuLoader() {
  return await getMenu();
}

export async function orderLoader({ params }) {
  return await getOrder(params.id);
}
