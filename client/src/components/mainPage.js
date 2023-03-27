import React, { useState, useEffect } from 'react'
import '../styles/mainPage.css'

export const MainPage = ({ token, userId }) => {
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState('')

  const cleanUpData = () => {
    setCurrentTask('')
  }

  useEffect(() => {
    fetch('api/main', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(res => {
        setTasks(res.tasks.map(task => ({ description: task.description, ...task })))
      })
  }, [token])

  return (
    <div className="main-container">
      <div className="main-form">
        <div className="input-field">
          <input
            id="input_text"
            type="text"
            name="task"
            required
            value={currentTask}
            onChange={event => setCurrentTask(event.target.value)}
          />
          <label htmlFor="input_text">New Task</label>
        </div>

        <button
          className="btn waves-effect waves-light right"
          type="submit"
          onClick={() => {
            if (!currentTask) return

            fetch('api/main', {
              method: 'POST',
              body: JSON.stringify({
                task: currentTask
              }),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).then(res => res.json())
              .then(res => {
                setTasks(res.tasks)
              })

            cleanUpData()
          }}
        >
          Add
        </button>
      </div>
      {tasks.length > 0 && (
        <ul className="nav">
          {tasks.map((task, index) => (
            <div className="nav__elem" key={index}>
              <li className="nav__item">{task.description}</li>
              <button
                className="nav__button btn waves-effect red"
                onClick={() => fetch('api/main/delete', {
                  method: 'DELETE',
                  body: JSON.stringify({ id: task._id, userId }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }).then(_ => setTasks(tasks.filter(taskItem => taskItem._id !== task._id)))
                  .catch(err => console.log(err))
                }
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}