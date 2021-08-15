import {toast} from "react-hot-toast";
import {useState} from "react";
import useTodoListHandler from "../hooks/useTodoListHandler";

const TodoItem = ({content, id, completed}) => {
    const [isExec, setIsExec] = useState(false)
    const {toggleComplete, deleteTask} = useTodoListHandler()
    const handleToggle = async () => {
        const toggleCompletePromise = new Promise(async (resolve, reject) => {
            try {
                setIsExec(true)
                const txReceipt = await toggleComplete(id)
                resolve(txReceipt)
            } catch (err) {
                console.error(err)
                reject(err.message)
            } finally {
                setIsExec(false)
            }
        })

        await toast.promise(toggleCompletePromise, {
            loading: 'Updating  task...',
            success: <b>Updated task success</b>,
            error: (err) => <b>Could not update task: {err}</b>,
        })
    }

    const handleDelete = async () => {
        const deleteTaskPromise = new Promise(async (resolve, reject) => {
            try {
                setIsExec(true)
                const txReceipt = await deleteTask(id)
                resolve(txReceipt)
            } catch (err) {
                console.error(err)
                reject(err.message)
            } finally {
                setIsExec(false)
            }
        })

        await toast.promise(deleteTaskPromise, {
            loading: 'Deleting  task...',
            success: <b>Deleted task success</b>,
            error: (err) => <b>Could not delete task: {err}</b>,
        })
    }
    return (
        <div className="todo">
            <li className={completed ? "todo-item completed" : "todo-item"}>{content}</li>

            <button className="complete-btn" onClick={handleToggle} disabled={isExec}>
                <i className="fas fa-check"/>
            </button>
            <button className="trash-btn" onClick={handleDelete} disabled={isExec}>
                <i className="fas fa-trash"/>
            </button>
        </div>
    )
}

export default TodoItem