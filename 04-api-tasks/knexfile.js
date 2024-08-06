/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import path from 'node:path'
import process from 'node:process'

/**
 * @type {import('knex').Knex.Config}
 */
export default {
  client: 'mysql2',
  migrations: {
    directory: path.join(process.cwd(), 'src', 'migrations'),
  },
  connection: {
    host: '0.0.0.0',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'tasks-api',
  }
}
