import { useState } from 'react';
import CourseList from './CourseList';
import TermButton from './TermButton';
import TermSelector from './TermSelector'; // Adjust the path based on your folder structure
// In TermButton.jsx, TermSelector.jsx, or any other component using `terms`
import { terms } from './constants';  // Adjust the path based on your folder structure
import Popup from './Popup';
import Schedule from './Schedule';
  
  
  
  const CoursePage = ({courses}) => {
    const [termSelection, setTermSelection] = useState("All");
    const [selectedList, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    const openPopup = () => {
      document.body.style.overflow = 'hidden';
      setOpen(true);
    };
    
    const closePopup = () => {
      document.body.style.overflow = ''; // Resets the overflow property
      setOpen(false);
    };
    /*console.log("Rendering TermPage with selection:", termSelection);
    console.log("Courses:", courses);*/

    const toggleSelected = (item) => setSelected(
      selectedList.includes(item)
      ? selectedList.filter(x => x !== item)
      : [...selectedList, item]
    );

    return (
      <div>
        <button className="btn btn-outline-dark" onClick={openPopup}><i className="bi bi-cart4"></i></button>
        <Popup open={open} close={closePopup}>
          <Schedule selection={termSelection} selected={selectedList} courses={courses} toggleSelected={toggleSelected}/>
        </Popup>
        <TermSelector selection={termSelection} setSelection={setTermSelection} />
        <CourseList selection={termSelection} courses={courses} selected={selectedList} toggleSelected={toggleSelected}/>
      </div>
    );
  }
  
  export default CoursePage;