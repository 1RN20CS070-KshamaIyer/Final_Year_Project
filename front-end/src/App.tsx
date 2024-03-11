import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Firstquiz from "./components/Firstquiz/Firstquiz";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Homepage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/firstquiz" element={<Firstquiz />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App