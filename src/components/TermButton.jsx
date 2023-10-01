import { useState } from 'react';
import CourseList from './CourseList';
// In TermButton.jsx, TermSelector.jsx, or any other component using `terms`
import { terms } from '../utilities/constants';  // Adjust the path based on your folder structure


const TermButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
      <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      { term }
      </label>
    </div>
  );

  export default TermButton;