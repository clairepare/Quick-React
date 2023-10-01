import { useState, useEffect} from 'react';
import CourseList from './CourseList';
import TermButton from './TermButton';
import TermSelector from './TermSelector'; // Adjust the path based on your folder structure
// In TermButton.jsx, TermSelector.jsx, or any other component using `terms`
import { terms } from '../utilities/constants';  // Adjust the path based on your folder structure
import Popup from './Popup';
import Schedule from './Schedule';
import { checkOverlap, overlapDetected, conflicts } from '../utilities/conflict';
  
  function areListsEqual(list1, list2) {
    return JSON.stringify(list1) === JSON.stringify(list2);
  }
  
  const CoursePage = ({courses}) => {
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

    const toggleSelected = (item) => 
    {
      if (!conflictList.includes(item)) //only set selected if, first, not conflicting
      {
        setSelected( //add if not yet selected, delete if already selected
          selectedList.includes(item)
          ? selectedList.filter(x => x !== item)
          : [...selectedList, item]
        );

        const updatedSelectedList = selectedList.includes(item) //need to update selectedList too
        ? selectedList.filter(x => x !== item)
        : [...selectedList, item];

        //console.log("passing in selected ", updatedSelectedList);

        //console.log("conflicts1 = ", conflicts(updatedSelectedList, courses));

        let conflicted = conflicts(updatedSelectedList, courses);
        console.log("returned conflicts", conflicted);

        setConflicted((prevConflictedList) => {
          if (areListsEqual(prevConflictedList, conflicted)) {
            console.log("returning old conflicts: ", prevConflictedList);
            return prevConflictedList;  // No change, keep the old state.
          }
          console.log("returning new conflicts: ", conflicted);
          return conflicted;  // Replace with new list.
        });



        console.log("selected: ", updatedSelectedList);
        console.log("conflicts2: ", conflictList);
      }
    };

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
        <button className="btn btn-outline-dark" onClick={openPopup}><i className="bi bi-cart4"></i></button>
        <Popup open={open} close={closePopup}>
          <Schedule selection={termSelection} selected={selectedList} courses={courses} toggleSelected={toggleSelected}/>
        </Popup>
        <TermSelector selection={termSelection} setSelection={setTermSelection} />
        <CourseList selection={termSelection} courses={courses} selected={selectedList} toggleSelected={toggleSelected} conflicted={conflictList}/>
      </div>
    );
  }
  
  export default CoursePage;