import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./component/Signup";
import Login from "./component/Login";
import Chat from './component/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

        </Routes>
      </Router>
    </div >
  );
}

export default App;
