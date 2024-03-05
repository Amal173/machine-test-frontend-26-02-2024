import { deleteProject, getProject, showProjectAddModal, showuserAddModal } from '../../Redux/Slice/projectSlice';
import ProjectAddModal from '../ProjectAddModal/ProjectAddModal';
import AddUserForm from '../AddUserForm/AddUserForm';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card, Modal, Space } from 'antd';
import Cookies from 'js-cookie';
import ShareModal from '../ShareModal/ShareModal';
import { getSharedProjects, showShareProjectModal } from '../../Redux/Slice/sharedProjectSlice';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, } from 'antd';
import './Project.css'

function Project() {

    const dispatch = useDispatch()
    const [id, setId] = useState()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projects, projectAddModal, userAddMoodal } = useSelector((state) => state.project);
    const { shareModalVisible, sharedProjects } = useSelector((state) => state.SharedProject);
    const project = [...sharedProjects, ...projects]
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')


    const handleMenuClick = (e) => {
        switch (e.key) {
            case "create User":
                dispatch(showuserAddModal(true))
                break;
            case "Add project":
                dispatch(showProjectAddModal(true))
                break;
            case "Shared Tasks":
                navigate('/shared-tasks', { state: { id: userId } })
                break;
        }
        console.log('click', e.key);
    };

    const items = [

        {
            label: 'Add project',
            key: 'Add project',
            icon: <UserOutlined />,
        },
        {
            label: 'Shared Tasks',
            key: 'Shared Tasks',
            icon: <UserOutlined />,
        },
    ];

    if (role === "Admin") {
        items.unshift({
            label: 'create User',
            key: 'create User',
            icon: <UserOutlined />,
        })

    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


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
            <header>
                <div class="header-left"><h2>Project Management</h2></div>
                <div class="header-right">
                    <Dropdown.Button menu={menuProps} placement="bottom" className='profile-btn' icon={<UserOutlined />}>
                        <h2>{username}</h2>
                    </Dropdown.Button>
                </div>
            </header>
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