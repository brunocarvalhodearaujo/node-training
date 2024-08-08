/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import express, { Router } from 'express'
import console from 'node:console'

const app = express()

app.use(express.json({ limit: '50mb' }))


/**
 * Exemplo de middleware para autenticação
 *
 * @param {{ lock: boolean }} options
 * @returns {express.Handler}
 */
function authenticate(options = {}) {
  return (request, response, next) => {
    // finge que tem toda a lógica de autenticação
    next()
  }
}

// GET /
app.get('/',(req, res) => {
  res
    .status(200)
    .json({ version: '1.0.0' })
})

class Users {
  /**
   * GET /info
   * @type {express.Handler}
   */
  getUserInfo = (request, response, next) => {
    response
      .status(200)
      .json({ nome: 'Bruno', cpf: '123.456.789-00' })
  }

  index () {
    return Router()
      .get('/info', authenticate(), this.getUserInfo)

  }
}

// GET /users/info
// GET /users/detail
app.use(`/${Users.constructor.name.toLowerCase()}`, new Users().index())

app.listen(3000, () => {
  console.info('Server is running on port 3000')
})
