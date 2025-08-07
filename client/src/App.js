import './App.css';
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
      {/* <Navbar/> */}
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
                category="general"
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
                category="opinion"
                q="মতামত"
              />
            }
          />
          <Route
            path="/kolkata"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="kolkata"
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
            path="/lifestyle"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="lifestyle"
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
                category="popular"
                q="জনপ্রিয়"
              />
            }
          />
            <Route
            path="/cricket"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="cricket"
                q="ক্রিকেট"
              />
            }
          />
            {/* <Route
            path="/face"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="popular"
                q="বাংলারমুখ"
              />
            }
          />
            <Route
            path="/bioscope"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="bioscope"
                q="বায়োস্কোপ"
              />
            }
          />
            <Route
            path="/webstory"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="webstory"
                q="ওয়েবস্টোরি"
              />
            }
          />
            <Route
            path="/littlethings"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="littlethings"
                q="টুকিটাকি"
              />
            }
          />
            <Route
            path="/gallery"
            element={
              <Newscontainer
                setprogress={setProgress}
                apikey={apikey}
                key="general"
                category="gallery"
                q="ছবিঘর"
              />
            }
          /> */}
          <Route path="/edit" element={<Editor />} />
          <Route path="/report" element={<Reporter />} />
          {/* <Route path="/landing" element={<Landing/>} /> */}
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
