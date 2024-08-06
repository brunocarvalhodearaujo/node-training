/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import express from 'express'
import knex from 'knex'
import console from 'node:console'
import knexConfig from '../knexfile.js'

const db = knex(knexConfig)
const app = express()

// middleware para converter o body da requisição para JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/tasks', async (req, res) => {
  try {
    const { name, completed } = req.body

    const data = {
      name,
      completed,
      created_at: new Date(),
      updated_at: new Date()
    }

    const [id] = await db('tasks').insert(data)

    res
      .status(201)
      .json({ id, name, completed })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal server error' })
  }
})

app.get('/tasks', async (req, res) => {
  const tasks = await db.select('*').from('tasks')

  res
    .status(200)
    .json(tasks)
})

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  const task = await db.select('*')
    .from('tasks')
    .where({ id }).first()

  if (!task) {
    return res
      .status(404)
      .json({ error: 'Task not found' })
  }

  res
    .status(200)
    .json(task)
})

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params

  // SELECT * FROM tasks WHERE id = ?
  const task = await db.select('*')
    .from('tasks')
    .where({ id })
    .first()

  if (!task) {
    return res
      .status(404)
      .json({ error: 'Task not found' })
  }

  // DELETE FROM tasks WHERE id = ?
  await db('tasks')
    .where({ id })
    .delete()

  res
    .status(404)
    .json({ message: 'Task deleted' })
})

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const { name, completed } = req.body

  // SELECT * FROM tasks WHERE id = ?
  const task = await db.select('*')
    .from('tasks')
    .where({ id })
    .first()

  // valida se a task existe, caso contrário retorna 404
  if (!task) {
    return res
      .status(404)
      .json({ error: 'Task not found' })
  }

  const data = {
    name,
    completed,
    updated_at: new Date()
  }

  // UPDATE tasks SET name = ?, completed = ? WHERE id = ?
  await db('tasks')
    .where({ id })
    .update(data)

  // retorna a task atualizada
  res
    .status(200)
    .json({ id, name, completed })
})

// starts a simple http server locally on port 3000
app.listen(3000, () => {
  console.info('Listening on 127.0.0.1:3000')
})
