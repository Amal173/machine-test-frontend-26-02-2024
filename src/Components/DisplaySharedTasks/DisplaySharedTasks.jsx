import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import './DisplaySharedTasks.css'
import { getSharedTasks } from '../../Redux/Slice/shareTaskSlice';
function DisplaySharedTasks() {
  const dispatch = useDispatch();
  const { sharedTasks, loading, error } = useSelector((state) => state.SharedTask);

  // Fetch shared tasks on component mount
  useEffect(() => {
    dispatch(getSharedTasks(localStorage.getItem('userId')));
  }, [dispatch]);

  // Render shared tasks with appropriate loading/error states
  return (
    <div className="shared-tasks-container">
      {loading && <p>Loading shared tasks...</p>}
      {error && <p>Error fetching shared tasks: {error.message}</p>}
      {sharedTasks.length > 0 && (
        <ul className="shared-tasks-list">
          {sharedTasks.map((task) => (
            <li key={task.id} className="shared-task-item">
              <p className="task-title">{task.title}</p>
              <div className="task-actions">
                <button type="button" className="mark-complete">
                  <IoMdCheckmark />
                </button>
                <button type="button" className="delete-task">
                  <IoMdClose />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {sharedTasks.length === 0 && !loading && !error && (
        <p>No shared tasks found.</p>
      )}
    </div>
  );
}

export default DisplaySharedTasks;
