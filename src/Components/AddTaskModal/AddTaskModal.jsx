import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateTask, UpdateTask, getSingleTask, getTasks, showAddTaskModal } from '../../Redux/Slice/taskSlice'
import { useForm } from 'react-hook-form';
import './AddTaskModal.css'
import { getStages } from '../../Redux/Slice/stageSlice';

function AddTaskModal({ id,projectId }) {
    const dispatch = useDispatch()
    const { singleTask ,editMode} = useSelector((state) => state.task)
    const { stages } = useSelector((state) => state.stage)
 
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(()=>{
        setValue("projectId", projectId)
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

    useEffect(() => {
        dispatch(getStages({id:projectId}))
    }, [dispatch])


    const onSubmit = async (data) => {
        console.log(data);
        if (editMode === true) {
    
            await dispatch(UpdateTask({id,data}))
        }else{
            await dispatch(CreateTask(data))

        }

        await dispatch(getTasks({id:projectId}))
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
                    {stages.map((data)=>(
                        <option value={data._id}>{data.stage}</option>
                    ))}
                    </select>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>

    )
}

export default AddTaskModal