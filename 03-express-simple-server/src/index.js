/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res
    .header('Content-Type', 'application/json')
    .json({
      message: 'Hello, World!'
    })
})

// starts a simple http server locally on port 3000
app.listen(3000, () => {
  console.log('Listening on 127.0.0.1:3000')
})
