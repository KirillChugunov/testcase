import {useEffect, useState} from 'react';
import {IToDosListState, IUserListState} from "../shared/types/types.ts";
import getToDos from "../shared/api/getToDos";
import getUsers from "../shared/api/getUsers";
import styles from "../App/App.module.css"

export function App() {
    const [toDosList, setToDosList] = useState<IToDosListState>(
        {
            list: [],
            isLoading: false
        }
    );
    const [usersList, setUsersList] = useState<IUserListState>(
        {
            list: [],
            isLoading: false
        }
    );

    // const [ isError, setError ] = useState<IErrorState>({
    //         isError: false,
    //         errorCode: " "
    //     }
    // )
    const getToDosList = () => {
        setToDosList(({...toDosList, isLoading: true}))
        return getToDos()
    }
    const getUsersList = () => {
        setUsersList({...usersList, isLoading: true});
        return getUsers()
    }


    useEffect(() => {
        Promise.all([getUsersList(), getToDosList()])
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
    }, [])

    const findUserToDo = (userID: number, userName?: string) => {
        const userToDo = toDosList.list.filter(todo => {
            return todo.userId == userID
        })
        return {
            name: userName,
            ID: userID,
            userToDosUncomplete: userToDo.filter(todo => !todo.completed),
            usersToDosComplete: userToDo
        }
    }


    const userToDosArray = usersList.list.map(user => {
        return findUserToDo(user.id, user.username)
    })
    console.log(userToDosArray);
    return (
        <section className={styles.table__container}>
            <table className={styles.table__tab}>
                <caption>Тестовое задание</caption>
                <thead>
                <tr>
                    <th className={styles.table__tab} >Имя</th>
                    <th className={styles.table__tab}>Список незаконченных задач</th>
                    <th className={styles.table__tab}>Задач всего</th>
                </tr>
                </thead>
                <tbody>
                {userToDosArray.map((user) => (
                    <tr>
                        <td className={styles.table__tab}>
                            {user.name}
                        </td>
                        <td className={styles.table__tab}>
                            {user.userToDosUncomplete.length}
                        </td >
                        <td className={styles.table__tab}>
                            {user.usersToDosComplete.length}
                        </td >
                    </tr>
                ))
                }
                </tbody>
            </table>
            <p>p.s. сделал 3 столбца т.к. нет связи, чтобы спросить о том какой каунт todo выводить: выполненные или все</p>
        </section>
    );
}

{/*<div className={styles.table__row}>*/
}
{/*    <p className={styles.table__tab} key={user.ID}>{user.name}</p>*/
}
{/*    <p className={styles.table__tab} key={index}>{user.userToDos.length}</p>*/
}
{/*</div>*/
}
export default App;
