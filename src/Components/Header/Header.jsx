import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showProjectAddModal, showuserAddModal } from '../../Redux/Slice/projectSlice';

function Header() {
    const dispatch = useDispatch()
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

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
            case "Home":
                navigate('/project', { state: { id: userId } })
                break;
            case "Log Out":
                navigate('/', { state: { id: userId } })
                localStorage.clear()
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
        {
            label: 'Home',
            key: 'Home',
            icon: <UserOutlined />,
        },
        {
            label: 'Log Out',
            key: 'Log Out',
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
    }



    return (
        <header>
            <div class="header-left"><h2>Project Management</h2></div>
            <div class="header-right">
                <Dropdown.Button menu={menuProps} placement="bottom" className='profile-btn' icon={<UserOutlined />}>
                    {username}
                </Dropdown.Button>
            </div>
        </header>
    )
}

export default Header