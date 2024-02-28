import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CreateProject, UpdateProject, getOneProject, getProject, showProjectAddModal } from '../../Redux/Slice/projectSlice';

function ProjectAddModal({id}) {

    const dispatch = useDispatch()
    const { Project} = useSelector((state) => state.project)
    console.log(Project);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(()=>{
    if (id) {
        setValue("title", Project.title)
        setValue("type", Project.type)
    }

},[id,Project,setValue])


    useEffect(() => {
        dispatch(getOneProject(id))
    }, [dispatch,id])

    const onSubmit = async (data) => {
        console.log(data,"hkhhggvkhgvkhgv");
      
        if (id) {
    
            await dispatch(UpdateProject({id,data}))
        }else{
            await dispatch(CreateProject(data))

        }

        await dispatch(getProject())
        dispatch(showProjectAddModal(false))
    };



    const handleClose = () => {
        dispatch(showProjectAddModal(false))
    }

  return (
    <div id="add-task-modal" class="modal">
    <div class="modal-content">
        <span class="close-button" onClick={handleClose}>&times;</span>
       <h2>Add New project</h2>
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
            <button type="submit">Add project</button>
        </form>
    </div>
</div>
  )
}

export default ProjectAddModal