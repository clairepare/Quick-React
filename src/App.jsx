import { useState } from 'react';
import CoursePage from './components/CoursePage.jsx';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import Dispatcher from './components/Dispatcher.jsx';
import { useDbData } from './utilities/firebase.js';
//import firebase from 'firebase/app';
//import { useEffect, useCallback, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';

/*const schedule = {
  title: "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};*/

const Main = () => {
  const [data, error] = useDbData('/courses');
  //const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  
  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  //if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  

  return (
    <div>
      
      <Dispatcher data={data}/>
    </div>
    );
}

const queryClient = new QueryClient();

const App = () => {
  //const [count, setCount] = useState(0);
  console.log("App rendered");

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Main />

      </div>
    </QueryClientProvider>
    
  )
};

export default App;