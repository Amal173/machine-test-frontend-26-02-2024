import React, { useEffect, useState } from 'react';
import './Dashbord.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, handleEditMode, showAddTaskModal, updateTaskStatus } from '../../Redux/Slice/taskSlice';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getStages, showAddStagesModal } from '../../Redux/Slice/stageSlice';
import AddStagesModal from '../AddStagesModal/AddStagesModal';

function Dashbord() {
    const dispatch = useDispatch();
    const { addTaskModal, tasks } = useSelector((state) => state.task);
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { stages, addStagesModal } = useSelector((state) => state.stage)
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        await dispatch(deleteTask(id));
        await dispatch(getTasks());
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleAddModal = () => {
        dispatch(showAddTaskModal(true));
    };

    const handleAddStageModal = () => {
        dispatch(showAddStagesModal(true));
    };

    useEffect(() => {
        dispatch(getStages())
    }, [dispatch])
    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);


    const handleEdit = (Id) => {
        setId(Id);
        dispatch(handleEditMode(true));
        dispatch(showAddTaskModal(true));
    };

    const handleDelete = (Id) => {
        console.log(Id);
        setId(Id);
        showModal();
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
        stages.map((item)=>{
            if(destination.droppableId===item.stage){
                newStatus=item.stage
            }
        })

        await dispatch(updateTaskStatus({ taskId, newStatus }));
        dispatch(getTasks());
    };


    return (
        <>
            <header>
                <div class="header-left">Kanban Board</div>
                <div class="header-right">
                    <button id="add-task-btn" onClick={handleAddStageModal}>Add Stages</button>
                    <button id="add-task-btn" onClick={handleAddModal}>Add Task</button>
                </div>
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <div class="kanban-board">
                    {stages?.map((item) => (
                        <Droppable droppableId={item.stage}>
                            {(provided) => (
                                <div
                                    className={`column ${item.stage}`}
                                    data-status={item.stage}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2>{item.stage}</h2>
                                    <div className="tasks" data-status={item.stage}>
                                        {tasks?.map((data, index) => (

                                            <>
                                                {data.status == item.stage &&
                                                    <Draggable key={data._id} draggableId={data._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                className='task'
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <h3>{data.title}</h3>
                                                                <p>{data.discription}</p>
                                                                <p><strong>DueDate :</strong> {data.dueDate}</p>
                                                                <p><strong>Created :</strong> {data.createdOn.slice(0, 16)}</p>
                                                                <button onClick={() => handleEdit(data._id)}>edit</button>
                                                                <button onClick={() => handleDelete(data._id)}>delete</button>
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
            {addTaskModal && <AddTaskModal id={id} />}
            {addStagesModal && <AddStagesModal />}
            <Modal
                title="Delete"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do You Want To Delete This Task</p>
            </Modal>
            <footer>
                <p>Kanban Board Application</p>
            </footer>
        </>
    );
}

export default Dashbord;
