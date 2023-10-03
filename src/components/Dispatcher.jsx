import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useProfile } from '../utilities/profile';
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
    const [profile, profileLoading, profileError] = useProfile();
  
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;
    return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div>
          <AuthButton />
          <CoursePage title={data.title} courses={data.courses} profile={profile}/>
        </div>} />
      <Route path="/edit/:id" element={<EditPage courses={data.courses} profile={profile}/>} />
    </Routes>
  </BrowserRouter>)
};

export default Dispatcher;