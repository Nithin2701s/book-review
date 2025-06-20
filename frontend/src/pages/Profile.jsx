import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser(id)
      .then(res => {
        setUser(res.data);
        setError("");
      })
      .catch(() => setError("Failed to load user profile"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{user.name}'s Profile</h2>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      {/* You can add more user info here */}
    </div>
  );
};

export default Profile;
