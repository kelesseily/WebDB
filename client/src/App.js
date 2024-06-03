import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Form from './Form';
import Query from './Query';
import Admin from './Admin';

export default function App() {

  return(
    <Router>
      <div id="main-content">
        <Routes>
          <Route path = "/" element={<Login/>}></Route>
          <Route path = "/login" element={<Login/>}></Route>
          <Route path = "/form" element={<Form/>}></Route>
          <Route path = "/query" element={<Query/>}></Route>
          <Route path = "/register" element={<Register/>}></Route>
          <Route path = "/admin" element={<Admin/>}></Route>
          <Route path = "/admin/form" element={<Form/>}></Route>
          <Route path = "/admin/query" element={<Query/>}></Route>
        </Routes>
      </div>
    </Router>
  );
} 
 




