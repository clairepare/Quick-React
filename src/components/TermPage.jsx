import { useState } from 'react';
import CourseList from './CourseList';
import TermButton from './TermButton';
import TermSelector from './TermSelector'; // Adjust the path based on your folder structure
// In TermButton.jsx, TermSelector.jsx, or any other component using `terms`
import { terms } from './constants';  // Adjust the path based on your folder structure

  
  
  
  const TermPage = ({courses}) => {
    const [termSelection, setTermSelection] = useState("All");
    const [selectedList, setSelected] = useState([]);
    /*console.log("Rendering TermPage with selection:", termSelection);
    console.log("Courses:", courses);*/

    const toggleSelected = (item) => setSelected(
      selectedList.includes(item)
      ? selectedList.filter(x => x !== item)
      : [...selectedList, item]
    );

    return (
      <div>
        <TermSelector selection={termSelection} setSelection={setTermSelection} />
        <CourseList selection={termSelection} courses={courses} selected={selectedList} toggleSelected={toggleSelected}/>
      </div>
    );
  }
  
  export default TermPage;