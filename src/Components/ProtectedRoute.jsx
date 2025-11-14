import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const { user } = useUser();

  let content;

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to continue");
    }
  }, [user]);

  if (user) {
    content = children;
  } else {
    content = <Navigate to="/" />;
  }

  return <div>{content}</div>;
}

export default ProtectedRoute;
