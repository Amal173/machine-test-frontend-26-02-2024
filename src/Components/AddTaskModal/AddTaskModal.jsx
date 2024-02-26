import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateTask, UpdateTask, getSingleTask, getTasks, showAddTaskModal } from '../../Redux/Slice/taskSlice'
import { useForm } from 'react-hook-form';
import './AddTaskModal.css'

function AddTaskModal({ id }) {
    const dispatch = useDispatch()
    const { singleTask } = useSelector((state) => state.task)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const { editMode } = useSelector((state) => state.task)

    useEffect(()=>{
    if (editMode === true) {
        setValue("title", singleTask.title)
        setValue("status", singleTask.status)
        setValue("dueDate", singleTask.dueDate)
        setValue("discription", singleTask.discription)
    }

},[editMode,singleTask,setValue])
    useEffect(() => {
        dispatch(getSingleTask(id))
    }, [dispatch,id])


    const onSubmit = async (data) => {
        console.log(data);
        if (editMode === true) {
    
            await dispatch(UpdateTask({id,data}))
        }else{
            await dispatch(CreateTask(data))

        }

        await dispatch(getTasks())
        dispatch(showAddTaskModal(false))
    };



    const handleClose = () => {
        dispatch(showAddTaskModal(false))
    }
    return (
        <div id="add-task-modal" class="modal">

            <div class="modal-content">
                <span class="close-button" onClick={handleClose}>&times;</span>
                {editMode? <h2>Edit Task</h2>: <h2>Add New Task</h2>}
               
                <form id='add-task-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        id="task-title"
                        placeholder="Task Title"
                        required
                        name='title'
                        {...register("title")}
                    />
                    <input className='date-picker'
                        type="date"
                        id="task-title"
                        required
                        {...register("dueDate")}
                    />
                    <textarea
                        id="task-description"
                        placeholder="Task Description"
                        required
                        {...register("discription")}
                    ></textarea>
                    <select id="column-select"  {...register("status")} >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>

    )
}

export default AddTaskModal