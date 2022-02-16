import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import WithoutCache from './no_cache/WithoutCache'
import InMemoryCache from './in_memory_cache/InMemoryCache'
import SessionStorageCache from './session_storage_cache/SessionStorageCache'
import LocalStorageCache from './local_storage_cache/LocalStorageCache'

import HomePage from './shared/pages/HomePage'
import SignInPage from './shared/pages/SignInPage'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/no-cache/home' />} />

            <Route path='no-cache' element={<WithoutCache />}>
              <Route path='home' element={<HomePage />} />
              <Route path='signin' element={<SignInPage />} />
            </Route>

            <Route path='memory-cache' element={<InMemoryCache />}>
              <Route path='home' element={<HomePage />} />
              <Route path='signin' element={<SignInPage />} />
            </Route>

            <Route path='session-storage-cache' element={<SessionStorageCache />}>
              <Route path='home' element={<HomePage />} />
              <Route path='signin' element={<SignInPage />} />
            </Route>

            <Route path='ls-cache' element={<LocalStorageCache />}>
              <Route path='home' element={<HomePage />} />
              <Route path='signin' element={<SignInPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function MainNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState<string>(location.pathname.split('/')[1])

  return (
    <div className='cache-option-toggler'>
      <h4>Cache option</h4>
      <select
        name='cache-option'
        onChange={(event) => {
          const newValue = event.currentTarget.value
          setValue(newValue)
          navigate(`${newValue}/home`)
        }}
        value={value}
      >
        <option value='no-cache'>Without cache</option>
        <option value='memory-cache'>Memory Cache</option>
        <option value='session-storage-cache'>Session Storage Cache</option>
        <option value='ls-cache'>Local Storage Cache</option>
      </select>
    </div>
  )
}

function Layout() {
  return (
    <div className='layout'>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
