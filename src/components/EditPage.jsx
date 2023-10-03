import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from './Banner';
import { dayRegex, timeRegex, spaceRegex } from "../utilities/constants.js";

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : ' must be at least 2 characters';
    case 'meets':
      return meetsMatch(val);
    default: return '';
  }
};

const meetsMatch = (val) => 
{
  if(val === ''){
    return '';
  }
  const space = val.match(spaceRegex);
  if (!space) {
    return 'must contain a space';
  }
  console.log("val: ", val);

  const [day, time] = val.split(" ");
  const match = dayRegex.test(day);
  console.log("match:", match);
  const match2 = timeRegex.test(time);
  if (match2 && match) {
    const [startHour, startMinute] = time.split("-")[0].split(":").map(Number);
    const [endHour, endMinute] = time.split("-")[1].split(":").map(Number);
    if (endHour > startHour || (endHour === startHour && endMinute > startMinute)) {
        return '';
    } else {
      console.log("failing nonzero timespan");
        return 'must contain days and nonzero start-end, e.g., MWF 12:00-13:20';
    }
  }
  else if (match){
    console.log("failing time regex expr");
    return 'must contain days and nonzero start-end, e.g., MWF 12:00-13:20';
  }
  else if (match2){
    console.log("failing day regex expr");
    return 'must contain days and nonzero start-end, e.g., MWF 12:00-13:20';
  }
  else{
    console.log("failing both regex expr");
    return 'must contain days and nonzero start-end, e.g., MWF 12:00-13:20';
  }
}


const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

//

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const EditPage = ({courses}) => {

  const { id } = useParams(); 
  const course = courses[id]; // Assuming courses is accessible here
  const [update, result] = useDbUpdate(`/courses/courses/${id}`);
  console.log("rendered Edit Page");
  const [state, change] = useFormData(validateUserData, course);
  console.log("Initial state in EditPage:", state);

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };

  return (
    <div>
      <Banner title={`Edit ${course.term} CS ${course.number}`}/>
      <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      
        <InputField name="title" text="Course Name:" state={state} change={change} />
        
        <InputField name="meets" text="Meets:" state={state} change={change} />
        <ButtonBar message={result?.message} />
      </form>
    </div>
    
  )
};

//
//<InputField name="number" text="Course Number" state={state} change={change} />
//<InputField name="term" text="Quarter" state={state} change={change} />

export default EditPage;