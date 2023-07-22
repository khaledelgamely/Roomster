import { Navigate } from "react-router";
function UserGuard(props) {
  const token = localStorage.getItem("token");
  if (token) {
    // eslint-disable-next-line react/prop-types
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default UserGuard;
