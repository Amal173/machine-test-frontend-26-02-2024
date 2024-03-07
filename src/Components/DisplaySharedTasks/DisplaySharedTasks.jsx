import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import './DisplaySharedTasks.css'
import { getSharedTasks } from '../../Redux/Slice/shareTaskSlice';
import Header from '../Header/Header';
function DisplaySharedTasks() {
  const dispatch = useDispatch();
  const { sharedTasks, loading, error } = useSelector((state) => state.SharedTask);

  useEffect(() => {
    dispatch(getSharedTasks(localStorage.getItem('userId')));
  }, [dispatch]);

  return (
    <>
      <Header />
        <h1>Shared Tasks</h1>
      <div className="shared-tasks-container">
        {sharedTasks.length > 0 && (
          <ul className="shared-tasks-list">
            {sharedTasks.map((task) => (
              <li key={task.id} className="shared-task-item">
                <p className="task-title">{task.title}</p>
                <p className="task-discription">{task.discription}</p>
                <div className="task-actions">
                  <button type="button" className="mark-complete">
                    <IoMdCheckmark />
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
    </>
  );
}

export default DisplaySharedTasks;
