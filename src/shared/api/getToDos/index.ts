import {request} from "../baseApi";

const getToDos = () => request("todos")

export default getToDos