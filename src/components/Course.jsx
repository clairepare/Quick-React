import "./Course.css";
import {conf} from "../utilities/conflict"
import { Link } from 'react-router-dom';
import { useState } from "react";
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
//import { ReactComponent as EditIcon } from '/Users/clairepare/Dropbox/My Mac (MacBook-Pro.attlocal.net)/Desktop/Northwestern/CS 392 Rapid Prototyping/Quick-React/public/pencil-square.svg';

const Course = ({id, course, selected, toggleSelected, conflicted}) => {
    //console.log("course conflicted", conflicted, [id, course]);
    const [user] = useAuthState();
    
    let con = conf(conflicted, course) ? 'conflicted' : '';
    con === 'conflicted' ? console.log(course, "is conflicted") : console.log("")
    let sel = selected.includes(course) ? 'selected' : '';
    //render === 'selected' ? console.log(id, " selected") : console.log("");
    return (
    
    <div className="card m-1 p-2" onClick={() => toggleSelected(course)}>
        {user && (
        <Link to={{pathname: `/edit/${id}`}}><img src="/pencil-square.svg" alt="Edit" className="edit-icon" />
        </Link>
        )}
        
        
        <div className={`card-body ${sel} ${con}`}>
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

//const conf = (conflicted, i_course) => conflicted.some(([id, course]) => course === i_course);

export default Course;