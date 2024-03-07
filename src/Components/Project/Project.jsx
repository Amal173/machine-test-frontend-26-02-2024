import { deleteProject, getProject, showProjectAddModal, showuserAddModal } from '../../Redux/Slice/projectSlice';
import ProjectAddModal from '../ProjectAddModal/ProjectAddModal';
import AddUserForm from '../AddUserForm/AddUserForm';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card, Modal, Space } from 'antd';
import Cookies from 'js-cookie';
import ShareModal from '../ShareModal/ShareModal';
import { getSharedProjects, showShareProjectModal } from '../../Redux/Slice/sharedProjectSlice';

import './Project.css'
import Header from '../Header/Header';

function Project() {

    const dispatch = useDispatch()
    const [id, setId] = useState()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projects, projectAddModal, userAddMoodal } = useSelector((state) => state.project);
    const { shareModalVisible, sharedProjects } = useSelector((state) => state.SharedProject);
    const project = [...sharedProjects, ...projects]
    const userId = localStorage.getItem('userId')

    const handleShareTask = () => {
        dispatch(showuserAddModal(true))
    }

    const handleEdit = (id) => {
        setId(id)
        dispatch(showProjectAddModal(true))
    }

    const handleDelete = (id) => {
        setId(id)
        setIsModalOpen(true);
    }

    const handleNavigate = (id) => {
        navigate('/kanbanbord', { state: { id: id } })
    }

    const handleOk = async () => {
        setIsModalOpen(false);
        await dispatch(deleteProject(id))
        dispatch(getProject(userId))
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleShare = (id) => {
        setId(id)
        dispatch(showShareProjectModal(true))
    };


    useEffect(() => {
        dispatch(getProject(userId))
        if (!Cookies.get("AuthToken")) {
            navigate('/')
        }
    }, [dispatch, navigate, userId])
    useEffect(() => {
        dispatch(getSharedProjects(userId))

    }, [dispatch, userId])


    return (
        <div>
            <Header />
            <div className="body"  >
                <Card title="Projects">
                    {project?.map((item) => (
                        <Card type="inner" className='card' title={item.userId === userId ? item.title : item.title + " 🔗 shared"}
                            extra={<div>
                                <Space>
                                    <button className='edit-btn' onClick={() => handleEdit(item._id)}>edit</button>
                                    <button className='delete-btn' onClick={() => handleDelete(item._id)}>delete</button>
                                    <button className='more-btn' onClick={() => handleNavigate(item._id)}>More</button>
                                    <button className='share-btn' onClick={() => handleShare(item._id)}>share</button>
                                </Space>
                            </div>}>
                            {item.type}
                        </Card>
                    ))}
                </Card>
            </div>
            {projectAddModal && <ProjectAddModal id={id} />}
            {userAddMoodal && <AddUserForm />}
            {shareModalVisible && <ShareModal id={id} type={"project"} />}
            <Modal title="Delete ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to delete </p>
            </Modal>
        </div>
    )
}

export default Project