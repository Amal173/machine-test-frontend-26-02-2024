import { deleteTask, getTasks, handleEditMode, showAddTaskModal, updateTaskStatus } from '../../Redux/Slice/taskSlice';
import { deleteStage, getStages, showAddStagesModal } from '../../Redux/Slice/stageSlice';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddStagesModal from '../AddStagesModal/AddStagesModal';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Modal, Spin, Collapse } from 'antd';
import './Dashbord.css';
import ShareModal from '../ShareModal/ShareModal';
import { showShareProjectModal } from '../../Redux/Slice/sharedProjectSlice';

function Dashbord() {

    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate()
    const projectId = location?.state?.id
    const [id, setId] = useState(null);
    const [type, setType] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { addTaskModal, tasks, spinning } = useSelector((state) => state.task);
    const { stages, addStagesModal } = useSelector((state) => state.stage)
    const { shareModalVisible } = useSelector((state) => state.SharedProject)



    if (!projectId) {
        navigate('/')
    }

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        if (type === "stage") {
            await dispatch(deleteStage(id));
            await dispatch(getStages({ id: projectId }))
        } else {
            await dispatch(deleteTask(id));
            dispatch(getTasks({ id: projectId }));
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleAddModal = () => {
        dispatch(showAddTaskModal(true));
    };

    const handleAddStageModal = () => {
        dispatch(showAddStagesModal(true));
    };

    useEffect(() => {
        dispatch(getStages({ id: projectId }))
    }, [dispatch])



    useEffect(() => {
        dispatch(getTasks({ id: projectId }));
    }, [dispatch]);


    const handleEdit = (Id) => {
        setId(Id);
        dispatch(handleEditMode(true));
        dispatch(showAddTaskModal(true));
    };

    const handleDelete = ({ Id, type }) => {
        setId(Id);
        setType(type)
        showModal();
    };
    const handleShare = (Id) => {
        setId(Id);
        dispatch(showShareProjectModal(true))
    };

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        const taskId = draggableId
        let newStatus;
        stages.map((item) => {
            if (destination.droppableId === item._id) {
                newStatus = item._id
                console.log(item._id, "item._id id");
            }
        })
        await dispatch(updateTaskStatus({ taskId, newStatus }));
        dispatch(getTasks({ id: projectId }));
    };

    const handleStageEditModal = (id) => {
        setId(id)
        dispatch(showAddStagesModal(true));
    }
    const handleExit = () => {
        navigate('/project')
    }

    return (
        <>
            <header>
                <div class="header-left">
                    <i class="fa-solid fa-circle-left" onClick={handleExit}></i>
                    <h2>Kanban Board</h2></div>
                <div class="header-right">
                    <button id="add-task-btn" onClick={handleAddStageModal}>Add Stages</button>
                    <button id="add-task-btn" onClick={handleAddModal}>Add Task</button>
                
                </div>
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <div class="kanban-board">
                    {stages?.map((item) => (
                        <Droppable droppableId={item._id}>
                            {(provided) => (
                                <div
                                    className={`column ${item.stage}`}
                                    data-status={item._id}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className='action-buttons'>
                                        <EditFilled onClick={() => handleStageEditModal(item._id)} />
                                        <DeleteFilled onClick={() => handleDelete({ Id: item._id, type: "stage" })} />
                                    </div>
                                    <h2>{item.stage}</h2>
                                    <div className="tasks" data-status={item._id}>
                                        {tasks?.map((data, index) => (
                                            <>
                                                {data.status == item._id &&
                                                    <Draggable key={data._id} draggableId={data._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                className='task'
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Collapse size="large">
                                                                    <Collapse.Panel key="1" header={
                                                                        <div className='head'>
                                                                            {<span>{data.title}</span>}
                                                                        </div>
                                                                    }>
                                                                        <p>{data.discription}</p>
                                                                        <p><strong>DueDate :</strong> {data.dueDate}</p>
                                                                        <p><strong>Created :</strong> {data.createdOn.slice(0, 16)}</p>
                                                                        <button className='action-btn' onClick={() => handleEdit(data._id)}>edit</button>
                                                                        <button className='action-btn' onClick={() => handleDelete({ Id: data._id, type: "task" })}>delete</button>
                                                                        <button className='action-btn' onClick={() => handleShare(data._id)}>Share</button>
                                                                    </Collapse.Panel>
                                                                </Collapse>
                                                            </div>

                                                        )}
                                                    </Draggable>}
                                            </>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            {addTaskModal && <AddTaskModal id={id} projectId={projectId} />}
            {addStagesModal && <AddStagesModal id={id} projectId={projectId} />}
            {shareModalVisible && <ShareModal id={id} type={"task"} />}

            <Modal
                title="Delete"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do You Want To Delete </p>
            </Modal>
            <Spin spinning={spinning} fullscreen />
            <footer>
                <p>Kanban Board Application</p>
            </footer>
        </>
    );
}

export default Dashbord;
