import Course from './Course.jsx';
import './Course.css';
import './CourseList.css';

const CourseList = ({selection, courses}) => {
    const filteredCourses = selection === "All" ? Object.entries(courses) : Object.entries(courses).filter(([id, course]) => selection === course.term);
    console.log("Filtered courses:", filteredCourses);
    return (
        <div className="course-list">
            {filteredCourses.map(([id, course]) => <Course key={id} course={course}/>)}
        </div>
    );
};

export default CourseList;