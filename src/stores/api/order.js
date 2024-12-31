import axios from "axios";
import { postOrderItem } from "../../config";

export async function createOrder(payload) {
  return await axios.post(postOrderItem, payload);
}
