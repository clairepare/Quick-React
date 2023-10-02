import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CoursePage from './CoursePage';
import EditPage from './EditPage';

const Dispatcher = ({data}) => {
    console.log("rendered dispatcher");
    return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CoursePage title={data.title} courses={data.courses} />} />
      <Route path="/edit/:id" element={<EditPage courses={data.courses} />} />
    </Routes>
  </BrowserRouter>)
};

export default Dispatcher;