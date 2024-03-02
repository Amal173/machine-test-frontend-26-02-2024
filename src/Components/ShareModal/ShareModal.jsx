import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Collapse, Divider, Button, Modal, Input, List, Avatar } from 'antd';
import { showShareProjectModal } from '../../Redux/Slice/projectSlice';
import { useSelector } from 'react-redux';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { fetchUserData } from '../../Redux/Slice/userSlice';

function ShareModal() {
    const dispatch = useDispatch()
    const { shareModalVisible } = useSelector((state) => state.project);
    const { user } = useSelector((state) => state.user)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    console.log(selectedUsers);
    const handleCancel = () => {
        dispatch(showShareProjectModal(false))
    }
    const handleShareTask = () => {
    }
    const handleUserSelect = (users) => {

        setSelectedUsers([...selectedUsers, users]);

    }
    const handleSearch = (value) => {
        setSearchQuery(value);
        //  search logic
    };

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

    return (
        <div>
            <Modal
                title="Share Task"
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