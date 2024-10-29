// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import NewWorkflow from './components/NewWorkflow'
import MyWorkflow from './components/MyWorkflow'
import ExternalIntegrations from './components/ExternalIntegrations'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* <Route path='' element={<Homepage />} /> */}
      <Route path='my-workflow' element={<MyWorkflow />} />
      <Route path='new-workflow' element={<NewWorkflow />} />
      <Route path='external-integrations' element={<ExternalIntegrations />} />
      
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

    
  </StrictMode>,
)
