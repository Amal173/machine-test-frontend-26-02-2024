import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProjectAddModal from '../ProjectAddModal/ProjectAddModal';
import { deleteProject, getProject, showProjectAddModal } from '../../Redux/Slice/projectSlice';
import { Card } from 'antd';
import { Button, Modal } from 'antd';
import './Project.css'
import { useNavigate } from 'react-router-dom';

function Project() {
    const dispatch = useDispatch()
    const [id, setId] = useState()
    const navigate=useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projects, projectAddModal } = useSelector((state) => state.project);
    console.log(id);

    const handleAddProject = () => {
        dispatch(showProjectAddModal(true))
    }
    const handleEdit = (id) => {
        setId(id)
        dispatch(showProjectAddModal(true))
    }
    const handleDelete = (id) => {
        setId(id)
        setIsModalOpen(true);

    }

    const handleNavigate=(id)=>{
        navigate('/kanbanbord',{state:{id:id}})
    }

    const handleOk = async () => {
        setIsModalOpen(false);
        await dispatch(deleteProject(id))
        dispatch(getProject())
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(getProject())
    }, [dispatch])
    console.log(projectAddModal);
    return (
        <div>
            <header>
                <div class="header-left"><h2>Jira</h2></div>
                <div class="header-right">
                    <button id="add-task-btn" onClick={handleAddProject}>Add project</button>
                    {/* <button id="add-task-btn" onClick={handleAddModal}>Add Task</button> */}
                </div>
            </header>
            <div className="body">
                <Card title="Projects">
                    {projects?.map((item) => (
                        <Card type="inner" className='card' title={item.title} extra={<div><button onClick={() => handleEdit(item._id)}>edit</button>  <button onClick={() => handleDelete(item._id)}>delete</button>  <button onClick={()=>handleNavigate(item._id)}>More</button></div>}>
                            {item.type}
                        </Card>

                    ))}
                </Card>
            </div>
            {projectAddModal && <ProjectAddModal id={id}/>}
            <Modal title="Delete ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to delete </p>

            </Modal>
        </div>
    )
}

export default Project