import {request} from "../baseApi";

const getUsers = () => request("users")

export default getUsers