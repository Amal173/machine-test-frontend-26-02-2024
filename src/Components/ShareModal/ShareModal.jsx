import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Divider, Button, Modal, Input, List, Avatar } from 'antd';
import { CreateSharedProject, showShareProjectModal } from '../../Redux/Slice/sharedProjectSlice';
import { useSelector } from 'react-redux';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { fetchUserData } from '../../Redux/Slice/userSlice';
import { CreateSharedTask } from '../../Redux/Slice/shareTaskSlice';

function ShareModal({ id, type }) {
    console.log(type);
    const dispatch = useDispatch()
    const { shareModalVisible } = useSelector((state) => state.SharedProject);
    const { user } = useSelector((state) => state.user)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    console.log(typeof selectedUsers);
    const handleCancel = () => {
        dispatch(showShareProjectModal(false))
    }

    const handleShareTask = () => {
        if (type === "project") {
            dispatch(CreateSharedProject({ sharedTo: selectedUsers, projectId: id, sharedFrom: localStorage.getItem("userId") }))

        } else {
            dispatch(CreateSharedTask({ sharedTo: selectedUsers, taskId: id, sharedFrom: localStorage.getItem("userId") }))
        }  
    }
    const handleUserSelect = (users) => {
        if (type === "project") {
            if (!selectedUsers.some((i) => i._id === users._id)) {
                setSelectedUsers([...selectedUsers, users]);
            }
        } else {
            setSelectedUsers([users]);
        }   
    }

    const handleSearch = (value) => {
        setTimeout(() => {
        }, "1000");
        setSearchQuery(value);

    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchUserData({ search: searchQuery, projectid: id, id: localStorage.getItem("userId") }))
        }, "1000");
    }, [dispatch, searchQuery])

    return (
        <div>
            <Modal
                title={"share " + type}
                visible={shareModalVisible}
                onCancel={() => handleCancel()}
                footer={[
                    <Button key="cancel" onClick={() => handleCancel()}>Cancel</Button>,
                    <Button key="share" type="primary" onClick={() => handleShareTask()}>Share</Button>
                ]}
            >

                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={user.user}
                    renderItem={(users) => (
                        <List.Item onClick={() => handleUserSelect(users)}>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={users.username}
                                description={users.email}
                            />
                        </List.Item>
                    )}
                />
                <Divider />
                <p>Selected Users:</p>
                <List
                    itemLayout="horizontal"
                    dataSource={selectedUsers}
                    renderItem={(user) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={user.username}
                                description={user.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    )
}

export default ShareModal