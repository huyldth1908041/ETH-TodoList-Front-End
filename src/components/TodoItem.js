import {toast} from "react-hot-toast";
import {useState} from "react";
import useTodoListHandler from "../hooks/useTodoListHandler";

const TodoItem = ({content, id, completed}) => {
    const [isExec, setIsExec] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [updateContent, setUpdateContent] = useState(content)
    const {toggleComplete, deleteTask, updateTask} = useTodoListHandler()

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

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
    const handleEditTask = async e => {
        e.preventDefault()
        if(!updateContent) {
            toast.error("Please enter task content" )
            return
        }
        const updatePromise = new Promise(async (resolve, reject) => {
            try {
                setIsExec(true)
                const txReceipt = await updateTask(id, updateContent)
                resolve(txReceipt)
                setIsEditing(false)
            } catch (err) {
                console.error(err)
                reject(err.message)
            } finally {
                setIsExec(false)
            }
        })

        await toast.promise(updatePromise, {
            loading: 'Updating  task...',
            success: <b>Updated task success</b>,
            error: (err) => <b>Could not update task: {err}</b>,
        })
    }
    return (
        <div>
            {
                isEditing ? (
                    <form onSubmit={handleEditTask}>
                        <input
                            type="text"
                            value={updateContent}
                            onChange={(e) => setUpdateContent(e.target.value)}/>
                        <button className="trash-btn" type="button" onClick={toggleEdit} disabled={isExec}>
                            <i className="fas fa-times"/>
                        </button>
                        <button className="edit-btn" type="submit" disabled={isExec}>
                            <i className="fas fa-save"/>
                        </button>
                    </form>
                ) : (
                    <div className="todo">
                        <li className={completed ? "todo-item completed" : "todo-item"}>{content}</li>

                        <button className="complete-btn" onClick={handleToggle} disabled={isExec}>
                            <i className="fas fa-check"/>
                        </button>
                        <button className="edit-btn" onClick={toggleEdit} disabled={isExec}>
                            <i className="fas fa-pen"/>
                        </button>
                        <button className="trash-btn" onClick={handleDelete} disabled={isExec}>
                            <i className="fas fa-trash"/>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default TodoItem