import "./Course.css";

const ScheduledCourse = ({id, course, selected, toggleSelected}) => {
    let render = selected.includes(id) ? 'selected' : '';
    render === 'selected' ? console.log(id, " selected") : console.log("");
    console.log("Rendering schedule course:", course);
    return (
    
    <div className="card m-1 p-2" onClick={() => toggleSelected(id)}>
        <div className={"card-body"}>
            <div className="card-body">
                <h5 className="card-title">{course.term} CS {course.number}</h5>
                <p className="card-text">{course.title}</p>
            </div>
            <div className="card-footer bg-transparent">
                {course.meets}
            </div>
        </div>
        
    </div>
);
};

export default ScheduledCourse;