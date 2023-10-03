/*import './Schedule.css';*/
import { NavLink } from 'react-router-dom';
import Course from "./Course";
import CourseList from './CourseList';
import './CourseList.css';
import ScheduledCourse from './ScheduledCourse';

const Schedule = ({selection, selected, courses, toggleSelected}) => {
    const filteredCourses = Object.entries(courses).filter(([id, course]) => selected.includes(course));
    console.log("showing ", filteredCourses);
    return(
    <div className="schedule">
         <h2>Schedule</h2>
    {
        selected.length === 0
        ? <div>
              <h2>You have no classes in your schedule.</h2>
              <h2>Search for your preferred courses, then click to add them here.</h2>
              <h2>You can toggle between quarter to see which classes are offered when.</h2>
          </div>
        : <div className="course-list">
               
              {filteredCourses.map(([id, course]) => <ScheduledCourse key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected}/>)}
          </div>
        
      
    }
    </div>
    );
};

/**/

export default Schedule;