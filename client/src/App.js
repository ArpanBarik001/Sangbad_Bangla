
import Register from './component/Register.js';
import Login from './component/Login.js';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import Navbar from './component/Navbar.js'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Newscontainer from './component/Newscontainer.js';
import Editor from './component/Editor.js';
import Reporter from './component/Reporter.js';
import Admin from './component/Admin.js';
// import Landing from './component/Landing.js';

function App() {
  const apikey = process.env.REACT_APP_NEWSAPI;
  const [progress, setProgress] = useState(0);
  return (
    <div>
      
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category=""
                q="বাংলা"
              />
            }
          />
          <Route
            path="/sport"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="sports"
                q="খেলা"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="technology"
                q="প্রযুক্তি"
              />
            }
          />
          <Route
            path="/opinion"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="politics"
                q="মতামত"
              />
            }
          />
          <Route
            path="/environment"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="environment"
                q="কলকাতা"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="entertainment"
                q="স্বাস্থ্য"
              />
            }
          />
            <Route
            path="/food"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="food"
                q="জীবনযাপন"
              />
            }
          />
            <Route
            path="/business"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="business"
                q="ব্যবসা"
              />
            }
          />
            <Route
            path="/world"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="world"
                q="বিশ্ব"
              />
            }
          />
          <Route
            path="/popular"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="top"
                q="জনপ্রিয়"
              />
            }
          />
            <Route
            path="/health"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="health"
                q="ক্রিকেট"
              />
            }
          />
            
          <Route path="/edit" element={<Editor />} />
          <Route path="/report" element={<Reporter />} />
          
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
