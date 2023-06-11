import Sidebar from "./components/Sidebar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import GenReport from "./components/GenReport";
import { Chart, initTE } from "tw-elements";
import { useEffect } from "react";

type Props = {};

export default function App({}: Props) {
  return (
    <div>
      <Router>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gen" element={<GenReport />} />
        </Routes>
      </Router>
    </div>
  );
}
