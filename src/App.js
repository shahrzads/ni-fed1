// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Form from './Form';
import DataTablePage from './DataTablePage';
import RecordDetail from "./RecordDetail";
import UpdateForm from './UpdateForm';
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/id" element={<DataTablePage />} />
        <Route path="/id/:id" element={<RecordDetail />} />
        <Route path="/id/:id/update" element={<UpdateForm />} /> {/* Define route for the UpdateForm */}
      </Routes>
    </BrowserRouter>
    // <Container>
    // <Form />
    // </Container>
  );
}

export default App;
