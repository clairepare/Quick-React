import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  //const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{schedule.title}</h1>
    </div>
  )
};

export default App;
