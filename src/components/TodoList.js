import TodoItem from "./TodoItem";
import {useCallback, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {toast} from "react-hot-toast";
import useTodoListHandler from "../hooks/useTodoListHandler";
import {TODOLIST_CONTRACT_EVENTS} from "../contractPort/constants";


const TodoList = () => {
    const [todoList, setTodoList] = useState([])
    const {getListTasks, addEventListener, removeAllEventListeners} = useTodoListHandler()
    const {active} = useWeb3React()
    const fetchListTask = useCallback(async () => {
        const fetchTaskPromise = new Promise(async (resolve, reject) => {
            try {
                const list = await getListTasks()
                setTodoList(list)
                resolve()
            } catch (err) {
                reject(err.message)
            }
        })
        await toast.promise(fetchTaskPromise,   {
            loading: 'Fetching list task...',
            success: <b>Fetch success</b>,
            error: (err) => <b>Could not fetch tasks: {err}</b>,
        })
    }, [getListTasks])
    useEffect(() => {
        if (!active) {
            return
        }
        //fetch for firs time
        fetchListTask()
        //subscribe for event
        addEventListener(TODOLIST_CONTRACT_EVENTS.TASK_CREATED, async () => {
            await fetchListTask()
        })
        addEventListener(TODOLIST_CONTRACT_EVENTS.TASK_COMPLETED, async () => {
            await fetchListTask()
        })
        addEventListener(TODOLIST_CONTRACT_EVENTS.TASK_DELETED, async () => {
            await fetchListTask()
        })
        addEventListener(TODOLIST_CONTRACT_EVENTS.TASK_UPDATED, async () => {
            await fetchListTask()
        })
        return () => {
            removeAllEventListeners()
        }
    }, [active, fetchListTask, addEventListener, removeAllEventListeners])
    return (
        <div className="todo-container">
            {
                active ? (
                    <ul className="todo-list">
                        {
                            todoList.map(item => {
                                return <TodoItem {...item} key={item.id}/>
                            })
                        }
                    </ul>
                ) : (
                    <div>Please connect to wallet !</div>
                )
            }
        </div>
    )
}

export default TodoList