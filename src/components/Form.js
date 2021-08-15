import {useState} from "react";
import {toast} from "react-hot-toast";
import useTodoListHandler from "../hooks/useTodoListHandler";


const Form = () => {
    const [content, setContent] = useState("")
    const {createTask} = useTodoListHandler()
    const [isExec, setIsExec] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault()
        if(!content) {
            toast.error("Please enter task content")
            return
        }
        const createTaskPromise = new Promise(async (resolve, reject) => {
            try {
                setIsExec(true)
                const txReceipt = await createTask(content)
                resolve(txReceipt)
            } catch (err) {
                console.error(err)
                reject(err.message)
            } finally {
                setIsExec(false)
                setContent("")
            }
        })

        await toast.promise(createTaskPromise,   {
            loading: 'Creating new task...',
            success: <b>Saved task success</b>,
            error: (err) => <b>Could not saved task: {err}</b>,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="todo-input" value={content} onChange={e => setContent(e.target.value)} disabled={isExec}/>
            <button className="todo-button" type="submit" onClick={handleSubmit} disabled={isExec}>
                <i className="fas fa-plus-square"/>
            </button>
        </form>
    )
}
export default Form