import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import AddTeamMember from './pages/AddTeamMember';
import ViewAllMembers from './pages/ViewAllMembers';
import ViewAllMember from './pages/ViewMember';

const App = () => {
  
  return (
    <Router>
      <Header/>
      <div>
        {/* <nav>
          <a className="nav-item nav-link" href="/">Home</a>
          <a className="nav-item nav-link" href="/add-member">Add Member</a>
        </nav> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-member" element={<AddTeamMember />} />
          <Route path="/view-members" element={<ViewAllMembers />} />
          <Route path="/view-member/:id" element={<ViewAllMember />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
  </Router>
  );
};


export default App;
