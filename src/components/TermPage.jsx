import { useState } from 'react';
import CourseList from './CourseList';
import TermButton from './TermButton';
import TermSelector from './TermSelector'; // Adjust the path based on your folder structure
// In TermButton.jsx, TermSelector.jsx, or any other component using `terms`
import { terms } from './constants';  // Adjust the path based on your folder structure

  
  
  
  const TermPage = ({courses}) => {
    const [selection, setSelection] = useState("All");
    console.log("Rendering TermPage with selection:", selection);
    console.log("Courses:", courses);
    return (
      <div>
        <TermSelector selection={selection} setSelection={setSelection} />
        <CourseList selection={selection} courses={courses}/>
      </div>
    );
  }
  
  export default TermPage;