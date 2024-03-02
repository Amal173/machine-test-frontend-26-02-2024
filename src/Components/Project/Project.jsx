import { deleteProject, getProject, showProjectAddModal, showShareProjectModal, showuserAddModal } from '../../Redux/Slice/projectSlice';
import ProjectAddModal from '../ProjectAddModal/ProjectAddModal';
import AddUserForm from '../AddUserForm/AddUserForm';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card, Modal ,Space} from 'antd';
import Cookies from 'js-cookie';
import './Project.css'
import ShareModal from '../ShareModal/ShareModal';

function Project() {

    const dispatch = useDispatch()
    const [id, setId] = useState()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projects, projectAddModal, userAddMoodal,shareModalVisible } = useSelector((state) => state.project);
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')


    const handleAddProject = () => {
        dispatch(showProjectAddModal(true))
    }

    const handleAdduser = () => {
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
        dispatch(getProject())
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleShare = () => {
        dispatch(showShareProjectModal(true))
    };


    useEffect(() => {
        dispatch(getProject(userId))
        if (!Cookies.get("AuthToken")) {
            navigate('/')
        }
    }, [dispatch,navigate,userId])


    return (
        <div>
            <header>
                <div class="header-left"><h2>Project Management</h2></div>
                <div class="header-right">
                    {role == "Admin" ? <button id="add-task-bt" onClick={handleAdduser}>create User</button> : null}
                    <button id="add-task-btn" onClick={handleAddProject}>Add project</button>
                    <h2>{username}</h2>
                    <AccountCircleIcon />
                </div>
            </header>
            <div className="body"  >
                <Card title="Projects">
                    {projects?.map((item) => (
                        <Card type="inner" className='card' title={item.title}
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
            <ShareModal />
            <Modal title="Delete ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to delete </p>
            </Modal>
        </div>
    )
}

export default Project