import { CreateProject, UpdateProject, getOneProject, getProject, showProjectAddModal } from '../../Redux/Slice/projectSlice';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'

function ProjectAddModal({ id }) {

    const dispatch = useDispatch()
    const { Project } = useSelector((state) => state.project)
    const userId = localStorage.getItem('userId')

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        setValue("userId", localStorage.getItem("userId"))
        if (id) {
            setValue("title", Project.title)
            setValue("type", Project.type)
        }

    }, [id, Project, setValue])


    useEffect(() => {
        dispatch(getOneProject(id))
    }, [dispatch, id])

    const onSubmit = async (data) => {

        if (id) {

            await dispatch(UpdateProject({ id, data }))
        } else {
            await dispatch(CreateProject(data))

        }
        await dispatch(getProject(userId))
        dispatch(showProjectAddModal(false))
    };


    const handleClose = () => {
        dispatch(showProjectAddModal(false))
    }

    return (
        <div id="add-task-modal" class="modal">
            <div class="modal-content">
                <span class="close-button" onClick={handleClose}>&times;</span>
                {id ? <h2>edit project</h2> : <h2>Add New project</h2>}
                <form id='add-task-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        name='title'
                        {...register("title")}
                    />
                    <input
                        type="text"
                        placeholder="type"
                        required
                        name='type'
                        {...register("type")}
                    />
                    {id ? <button type="submit">edit project</button> : <button type="submit">Add project</button>}

                </form>
            </div>
        </div>
    )
}

export default ProjectAddModal