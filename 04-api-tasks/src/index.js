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

// rota para criar uma nova tarefa no banco de dados (POST)
app.post('/tasks', async (req, res) => {
  try {
    // desestruturação do body da requisição
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { name, completed = false } = req.body // { name: '...', completed: '...' }

    const data = {
      name, // nome da tarefa
      completed, // se não for informado, assume o valor padrão false
      created_at: new Date(), // data de criação
      updated_at: new Date() // data de atualização
    }

    // INSERT INTO tasks (name, completed, created_at, updated_at) VALUES (?, ?, ?, ?)
    const id = await db('tasks') // tabela tasks
      .insert(data) // insere os dados
      .first() // retorna apenas o primeiro resultado

    // retorna a tarefa criada
    res
      .status(201)
      .json({ id, name, completed })
  } catch (error) {
    // retorna um erro 500 caso ocorra um erro inesperado
    res
      .status(500)
      .json({ error: 'Internal server error' })
  }
})

// rota para listar todas as tarefas cadastradas no banco de dados (GET)
app.get('/tasks', async (req, res) => {
  // SELECT * FROM tasks
  const tasks = await db.select('*') // seleciona todos os campos
    .from('tasks') // tabela tasks

  // retorna a lista de tarefas
  res
    .status(200)
    .json(tasks)
})

// rota para buscar uma tarefa específica no banco de dados (GET)
app.get('/tasks/:id', async (req, res) => {
  // desestruturação do parâmetro da requisição
  const { id } = req.params

  // SELECT * FROM tasks WHERE id = ? LIMIT 1
  const task = await db.select('*') // seleciona todos os campos
    .from('tasks') // tabela tasks
    .where({ id }) // filtra pelo id
    .limit(1) // limita a quantidade de resultados
    .first() // retorna apenas o primeiro resultado

  // valida se a task existe, caso contrário retorna 404
  if (!task) {
    return res
      .status(404)
      .json({ error: 'Task not found' })
  }

  // retorna a task encontrada
  res
    .status(200)
    .json(task)
})

// rota para deletar uma tarefa específica no banco de dados (DELETE)
app.delete('/tasks/:id', async (req, res) => {
  // desestruturação do parâmetro da requisição
  const { id } = req.params

  // SELECT * FROM tasks WHERE id = ?
  const task = await db.select('*') // seleciona todos os campos
    .from('tasks') // tabela tasks
    .where({ id }) // filtra pelo id
    .first() // retorna apenas o primeiro resultado

  // valida se a task existe, caso contrário retorna 404
  if (!task) {
    return res
      .status(404)
      .json({ error: 'Task not found' })
  }

  // DELETE FROM tasks WHERE id = ?
  await db('tasks') // tabela tasks
    .where({ id }) // filtra pelo id
    .delete() // deleta o registro
    .limit(1) // limita a quantidade de registros deletados

  // retorna uma mensagem de sucesso
  res
    .status(404)
    .json({ message: 'Task deleted' })
})

// rota para atualizar uma tarefa específica no banco de dados (PUT)
app.put('/tasks/:id', async (req, res) => {
  // desestruturação do parâmetro da requisição
  const { id } = req.params
  // desestruturação do body da requisição
  const { name, completed } = req.body

  // SELECT * FROM tasks WHERE id = ?
  const task = await db.select('*') // seleciona todos os campos
    .from('tasks') // tabela tasks
    .where({ id }) // filtra pelo id
    .first() // retorna apenas o primeiro resultado

  // valida se a task existe, caso contrário retorna 404
  if (!task) {
    return res
      .status(404)
      .json({ error: 'Task not found' })
  }

  // atualiza os dados da task
  const data = {
    name,
    completed,
    updated_at: new Date() // atualiza a data de atualização
  }

  // UPDATE tasks SET name = ?, completed = ? WHERE id = ?
  await db('tasks') // tabela tasks
    .where({ id }) // filtra pelo id
    .update(data) // atualiza os dados

  // retorna a task atualizada
  res
    .status(200)
    .json({ id, name, completed })
})

// starts a simple http server locally on port 3000
app.listen(3000, () => {
  console.info('Listening on 127.0.0.1:3000')
})
