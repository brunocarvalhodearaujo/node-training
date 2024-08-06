/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Todos () {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const url = new URL('http://localhost:3000')
    url.pathname = '/tasks'

    /**
     * @type {RequestInit}
     */
    const requestOptions = {
      method: 'GET'
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setTasks(data))
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h1>Tarefas</h1>
        </div>
        <div className='col-md-12'>
          <button className='btn btn-primary' onClick={() => navigate('/create')}>
            Nova Tarefa
          </button>
        </div>
        <div className='col-md-12'>
          <pre>{JSON.stringify(tasks, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default Todos
