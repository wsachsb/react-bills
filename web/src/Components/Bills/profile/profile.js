import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import ProfileForm from "./profileForm";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/user/list")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("There was an error", error);
        navigate("/dashboard");
      });
  }, [navigate]);

  return (
    <div>
      {profile ? <ProfileForm profile={profile} /> : "Loading..."}
    </div>
  );
};

export default Profile;
