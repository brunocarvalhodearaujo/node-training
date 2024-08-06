/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/**
 * @param {import('knex').Knex} knex
 */
export const up = (knex) => {
  return knex.schema
    .createTable('tasks', (table) => {
      table.comment('Tasks table')
      table.increments()
      table.string('name', 100).comment('Task name')
      table.boolean('completed').defaultTo(false).comment('Task status')
      table.timestamps()
    })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = (knex) => {
  return knex.schema
    .dropTable('tasks')
}

export const config = {
  transaction: true
}
