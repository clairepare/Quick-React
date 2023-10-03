import { useState, useEffect} from 'react';
import CourseList from './CourseList';
import TermButton from './TermButton';
import TermSelector from './TermSelector'; // Adjust the path based on your folder structure
// In TermButton.jsx, TermSelector.jsx, or any other component using `terms`
import { terms } from '../utilities/constants';  // Adjust the path based on your folder structure
import Popup from './Popup';
import Schedule from './Schedule';
import { checkOverlap, overlapDetected, conflicts, conf} from '../utilities/conflict';
import Banner from './Banner';
  
  function areListsEqual(list1, list2) {
    return JSON.stringify(list1) === JSON.stringify(list2);
  }
  
  const CoursePage = ({title, courses, profile}) => {
    const [termSelection, setTermSelection] = useState("All");
    const [selectedList, setSelected] = useState([]);
    const [conflictList, setConflicted] = useState([]);
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

    useEffect(() => {
      let conflicted = conflicts(selectedList, courses);
      
      setConflicted((prevConflictedList) => {
         if (areListsEqual(prevConflictedList, conflicted)) {
            console.log("returning old conflicts: ", prevConflictedList);
            return prevConflictedList;  // No change, keep the old state.
         }
         console.log("returning new conflicts: ", conflicted);
         return conflicted;  // Replace with new list.
      });
    }, [selectedList, courses]);

    const toggleSelected = (item) => {
      if (!conf(conflictList, item)) {
        setSelected(prevSelectedList => 
          prevSelectedList.includes(item)
          ? prevSelectedList.filter(x => x !== item)
          : [...prevSelectedList, item]
        );
      }
    };
    
    console.log("please work ", conflictList);
    

    /*const toggleSelected = (item) => {
      const newCourse = courses[item];
      const validCourses = selectedList.map(id => courses[id]).filter(Boolean);
      console.log("scheduled courses: ", validCourses);
      if (selectedList.includes(item)){
        setSelected([...selectedList.filter(x => x !== item)]);
          // Potentially remove from conflict list since it's no longer selected
          setConflicted([...conflictList.filter(x => x !== item)]);
      } else {
          //const hasConflict = overlapDetected(validCourses, newCourse);
          const conflicts = selectedList.filter(existingCourse => checkOverlap(courses[existingCourse], courses[item]));
        
          if (conflicts.length > 0) {
              // Conflicts found, so add the new course and conflicting courses to the conflictList
              setConflicted([...new Set([...conflictList, ...conflicts, item])]);
          }

          // Add the course to selectedList
          setSelected(prev => [...prev, item]);
  
          // Check for conflicts with the added course
          
  
          // Add conflicts to conflictList
          setConflicted([...conflictList, ...conflicts, item]);
      }
    };*/
  

    return (
      <div>
        <Banner title={title}/>
        <button className="btn btn-outline-dark" onClick={openPopup}><i className="bi bi-cart4"></i></button>
        <Popup open={open} close={closePopup}>
          <Schedule selection={termSelection} selected={selectedList} courses={courses} toggleSelected={toggleSelected}/>
        </Popup>
        <TermSelector selection={termSelection} setSelection={setTermSelection} />
        <CourseList selection={termSelection} courses={courses} selected={selectedList} toggleSelected={toggleSelected} conflicted={conflictList} profile={profile}/>
      </div>
    );
  }
  
  export default CoursePage;