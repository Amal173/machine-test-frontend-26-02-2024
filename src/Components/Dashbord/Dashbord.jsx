import React, { useEffect, useState } from 'react';
import './Dashbord.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, handleEditMode, showAddTaskModal, updateTaskStatus } from '../../Redux/Slice/taskSlice';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Dashbord() {
    const dispatch = useDispatch();
    const { addTaskModal, tasks } = useSelector((state) => state.task);
    const [id, setId] = useState(null);
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        console.log(id);
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

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch,tasks]);

    useEffect(() => {
        setTodo(tasks.filter((i) => i.status === "todo"));
        setProgress(tasks.filter((i) => i.status === "in-progress"));
        setDone(tasks.filter((i) => i.status === "done"));
    }, [tasks]);

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

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
    
        if (!destination) {
            return;
        }
    
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
    
        const taskId = draggableId;

        let newStatus;
        switch (destination.droppableId) {
            case 'todo':
                newStatus = 'todo';
                break;
            case 'in-progress':
                newStatus = 'in-progress';
                break;
            case 'done':
                newStatus = 'done';
                break;
            default:
                newStatus = 'unknown';
        }

        dispatch(updateTaskStatus({taskId, newStatus}));
    };
    

    return (
        <>
            <header>
                <div class="header-left">Kanban Board</div>
                <div class="header-right">
                    <button id="add-task-btn" onClick={handleAddModal}>Add Task</button>
                </div>
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <div class="kanban-board">
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div
                                className="column todo"
                                data-status="todo"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2>To Do</h2>
                                <div className="tasks" data-status="todo">
                                    {todo.map((todo, index) => (
                                        <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className='task'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h3>{todo.title}</h3>
                                                    <p>{todo.discription}</p>
                                                    <p><strong>DueDate :</strong> {todo.dueDate}</p>
                                                    <p><strong>Created :</strong> {todo.createdOn.slice(0, 16)}</p>
                                                    <button onClick={() => handleEdit(todo._id)}>edit</button>
                                                    <button onClick={() => handleDelete(todo._id)}>delete</button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                    

                    <Droppable droppableId="in-progress">
                        {(provided) => (
                            <div
                                className="column in-progress"
                                data-status="in-progress"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2>In Progress</h2>
                                <div className="tasks" data-status="in-progress">
                                    {progress.map((progress, index) => (
                                        <Draggable key={progress._id} draggableId={progress._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className='task'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h3>{progress.title}</h3>
                                                    <p>{progress.discription}</p>
                                                    <p><strong>DueDate :</strong> {progress.dueDate}</p>
                                                    <p><strong>Created :</strong> {progress.createdOn.slice(0, 16)}</p>
                                                    <button onClick={() => handleEdit(progress._id)}>edit</button>
                                                    <button onClick={() => handleDelete(progress._id)}>delete</button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                    
                    <Droppable droppableId="done">
                        {(provided) => (
                            <div
                                className="column done"
                                data-status="done"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2>Done</h2>
                                <div className="tasks" data-status="done">
                                    {done.map((done, index) => (
                                        <Draggable key={done._id} draggableId={done._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className='task'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h3>{done.title}</h3>
                                                    <p>{done.discription}</p>
                                                    <p><strong>DueDate :</strong> {done.dueDate}</p>
                                                    <p><strong>Created :</strong> {done.createdOn.slice(0, 16)}</p>
                                                    <button onClick={() => handleEdit(done._id)}>edit</button>
                                                    <button onClick={() => handleDelete(done._id)}>delete</button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            {addTaskModal && <AddTaskModal id={id} />}
            <Modal
                title="Title"
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
