/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import express from 'express'
import knex from 'knex'

const db = knex({
  client: 'mysql2',
  connection: {
    host: '0.0.0.0',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'tasks-api',
  }
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.post('/create-database-tables', async (req, res) => {
  try {
    await db.schema.createTable('tasks', (table) => {
      table.increments()
      table.string('name')
      table.boolean('completed')
      table.timestamps()
    })

    res
      .header('Content-Type', 'application/json')
      .json({ message: 'Tables created successfully' })
  } catch (error) {
    console.error(error)
    res
      .header('Content-Type', 'application/json')
      .json({ message: 'Failed to create tables' })
  }
})

app.get('/tasks', (req, res) => {
  res
    .header('Content-Type', 'application/json')
    .json([
      { id: 1, name: 'Comprar mais leite', completed: false },
      { id: 2, name: 'Pegar as crianças na escola', completed: true },
    ])
})

app.post('/tasks', async (req, res) => {
  try {
    const data = req.body
    console.info(data, 'capturando dados do body para iniciar o cadastro')

    const [id] = await db.table('tasks').insert(data)

    res
      .status(201)
      .json({ id })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falhou ao cadastrar' })
  }
})

// starts a simple http server locally on port 3000
app.listen(3000, () => {
  console.log('Listening on 127.0.0.1:3000')
})
