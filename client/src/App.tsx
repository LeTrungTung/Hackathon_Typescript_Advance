import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StudentManage from "./Components/StudentManage/StudentManage";

// function App() {
//   return <div className="App"></div>;
// }

// export default App;
const App: React.FC = () => {
  return (
    <div>
      <StudentManage />
    </div>
  );
};

export default App;
