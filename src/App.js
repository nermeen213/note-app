import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Home from './component/Home/Home'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import Noteapp from './component/Noteapp/Noteapp'
import { useContext } from 'react';
import UserTokenProvider from './component/Context/userContext';
import NoteContextProvider from './component/Context/NoteContext';

function App() {
 
  let routers =createBrowserRouter([
    {path:'' , element:<Layout/>,children:[
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:"noteapp" , element:<ProtectedRoute><Noteapp/></ProtectedRoute> },
      {path:'register' , element:<Register/>},
      {path:'login' , element:<Login/>},
    ]}
  ])
 return <>
<UserTokenProvider>
  <NoteContextProvider>
  <RouterProvider router={routers}></RouterProvider>
  </NoteContextProvider>


</UserTokenProvider>

 </>
}

export default App;
