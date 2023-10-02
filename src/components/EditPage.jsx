//import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from './Banner';

const validateUserData = (key, val) => {
  switch (key) {
    case 'firstName': case 'lastName':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'email':
      return /^\w+@\w+[.]\w+/.test(val) ? '' : 'must contain name@domain.top-level-domain';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state[name]} onChange={change} />
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
  //const [update, result] = useDbUpdate(`/users/${user.id}`);
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
      <form noValidate className={state.errors ? 'was-validated' : null}>
      
        <InputField name="title" text="Course Name" state={state} change={change} />
        
        <InputField name="days" text="Days" state={state} change={change} />
        <InputField name="time1" text="Start Time" state={state} change={change} />
        <InputField name="time2" text="End Time" state={state} change={change} />
        <ButtonBar message={"no message yet"} />
      </form>
    </div>
    
  )
};

//onSubmit={submit} 
//<InputField name="number" text="Course Number" state={state} change={change} />
//<InputField name="term" text="Quarter" state={state} change={change} />

export default EditPage;