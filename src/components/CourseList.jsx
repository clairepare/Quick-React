import Course from './Course.jsx';
import './Course.css';
import './CourseList.css';

const CourseList = ({selection, courses, selected, toggleSelected, conflicted}) => {

    const filteredCourses = selection === "All" ? Object.entries(courses) : Object.entries(courses).filter(([id, course]) => selection === course.term);
    console.log("courselist conflict courses:", conflicted);
    return (
        <div className="course-list">
            {filteredCourses.map(([id, course]) => <Course key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected} conflicted={conflicted}/>)}
        </div>
    );
};

export default CourseList;