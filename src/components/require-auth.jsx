import { useUrlState } from "@/context";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useUrlState();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please authenticate to access this page.</div>;
  }

  return children;
};

export default RequireAuth;