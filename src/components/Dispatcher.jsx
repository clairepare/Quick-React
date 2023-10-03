import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CoursePage from './CoursePage';
import EditPage from './EditPage';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const Dispatcher = ({data}) => {
    console.log("rendered dispatcher");
    return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div>
          <AuthButton />
          <CoursePage title={data.title} courses={data.courses} />
        </div>} />
      <Route path="/edit/:id" element={<EditPage courses={data.courses} />} />
    </Routes>
  </BrowserRouter>)
};

export default Dispatcher;