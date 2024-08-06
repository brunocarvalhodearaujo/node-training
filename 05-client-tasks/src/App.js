/**
 * Copyright (c) 2024-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateTask from './views/CreateTask'
import Todos from './views/Todos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Todos />} />
        <Route path='/create' element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
