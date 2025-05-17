import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import api from "../lib/axios";

const UserProfilePage = () => {
  const { user: user2, updateUserInfo } = useUserStore();
  const [user, setUser] = useState(null);
  const [userInputs, setUserInputs] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ get user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get(
          "http://localhost:3000/api/user/userInfo",
          {}
        );
        setUser(response.data);
        setUserInputs({ email: response.data.email, name: response.data.name });
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);
  console.log(user, "user");

  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };
  console.log(userInputs);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!user) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Loading user info...
      </p>
    );
  }

  const handleSaveChanges = async (userInputs) => {
    const result = await updateUserInfo(userInputs);

    if (result.success) {
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#fff0f6",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#d6336c",
          textAlign: "center",
          borderBottom: "2px solid #f8bbd0",
          paddingBottom: "10px",
          marginBottom: "30px",
        }}
      >
        Your Profile
      </h2>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "#f9e6f2",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(255, 182, 193, 0.25)",
        }}
      >
        <img
          src={user.profilePicture || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            display: "block",
            margin: "0 auto 20px",
          }}
        />
        <label>
          <strong>Name:</strong>
        </label>
        <input
          name="name"
          value={userInputs.name}
          onChange={handleChange}
          //disabled={!isEditing}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>
          <strong>Email:</strong>
        </label>
        <input
          name="email"
          value={userInputs.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>
          <strong>Card ID:</strong>
        </label>
        <input
          name="cardID"
          value={user.cardID || ""}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>
          <strong>Card Value ($):</strong>
        </label>
        <input
          name="cardValue"
          type="number"
          value={user.cardValue || 0}
          onChange={handleChange}
          disabled={!isEditing}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          onClick={() => handleSaveChanges(userInputs)}
          style={{
            backgroundColor: isEditing ? "#28a745" : "#d6336c",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
