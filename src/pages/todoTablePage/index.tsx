import {useEffect, useState} from 'react';
import { IToDosListState, IUserListState, IUserToDosArray} from "../../shared/types/types.ts";
import getToDos from "../../shared/api/getToDos";
import getUsers from "../../shared/api/getUsers";
import styles from "./todoTablePage.module.css"
import {useNavigate} from "react-router-dom";
import {page} from "../../shared/constants/navigation";

export function TodoTablePage() {
    const navigate = useNavigate();
    const [toDosList, setToDosList] = useState<IToDosListState>(
        {
            list: [],
            isLoading: true
        }
    );
    const [usersList, setUsersList] = useState<IUserListState>(
        {
            list: [],
            isLoading: true
        }
    );

    useEffect(() => {
        Promise.all([getUsers(), getToDos()])
            .then(([users, toDos]) => {
                setUsersList({
                    list: users,
                    isLoading: false
                })
                setToDosList({
                    list: toDos,
                    isLoading: false
                })
            })
            .catch(error => {
                navigate(page.errorPage, {
                    state: {
                        error: error
                    },
                })
            })
    }, [])

    const findUsersToDo = (userID: number, userName: string) => {
        const userToDo = toDosList.list.filter(todo => {
            return todo.userId == userID
        })
        return {
            name: userName,
            ID: userID,
            userToDosUncomplete: userToDo.filter(todo => !todo.completed).map((todo) => (
                {userId: todo.userId, completed: todo.completed, id: todo.id})),
            usersToDosComplete: userToDo.map(todo => (
                {userId: todo.userId, completed: todo.completed, id: todo.id}
            ))
        }
    }
    const getUserToDosArray = (usersList: IUserListState) => {
        const userToDosArray: Array<IUserToDosArray> = [];
        usersList.list.forEach(user => {
            const userToDo = findUsersToDo(user.id, user.username);
            userToDosArray.push(userToDo);
        });
        return userToDosArray;
    }

    return (
        <section className={styles.table__container}>
            {usersList.isLoading && toDosList.isLoading ? <p>Загружаю данные</p> : <table className={styles.table__tab}>
                <caption>Тестовое задание</caption>
                <thead>
                <tr>
                    <th className={styles.table__tab}>Имя</th>
                    <th className={styles.table__tab}>Список незаконченных задач</th>
                    <th className={styles.table__tab}>Задач всего</th>
                </tr>
                </thead>
                <tbody>
                {getUserToDosArray(usersList).map((user) => (
                    <tr>
                        <td className={styles.table__tab}>
                            {user.name}
                        </td>
                        <td className={styles.table__tab}>
                            {user.userToDosUncomplete.length}
                        </td>
                        <td className={styles.table__tab}>
                            {user.usersToDosComplete.length}
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>}
            <p>p.s. сделал 3 столбца т.к. нет связи, чтобы спросить о том какой каунт todo выводить: выполненные или
                все</p>
            <p>p.s. №2 На всякий случай добавил обработчик ошибок с переадресацией на заглушку ошибки и вынес логику из App</p>
        </section>
    );
}

export default TodoTablePage;
