import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { updateProfile } from "../../../Components/Bills/profile/updateProfile";
import "./profileForm.css";

const ProfileForm = ({ profile }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    userEnable: true,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    profile: []
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        phoneNumber: formatPhoneNumber(profile.phoneNumber),
        dateOfBirth: formatDateOfBirth(profile.dateOfBirth)
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber.replace(/\D/g, ""), // Remove máscara para salvar
        dateOfBirth: unformatDateOfBirth(formData.dateOfBirth)
      };

      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error', error.message);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        ...profile,
        phoneNumber: formatPhoneNumber(profile.phoneNumber),
        dateOfBirth: formatDateOfBirth(profile.dateOfBirth)
      });
    }
  };

  const formatPhoneNumber = (number) => {
    if (!number) return "";
    const cleanNumber = number.replace(/\D/g, "");
    return cleanNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatDateOfBirth = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const unformatDateOfBirth = (formattedDate) => {
    const [day, month, year] = formattedDate.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form-title">Profile</div>

      <div className="profile-form-group">
        <label className="profile-form-label">User Name</label>
        <input
          className="profile-form-input profile-form-input-disabled"
          name="userName"
          value={formData.userName}
          readOnly
        />
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">Email</label>
        <input
          className="profile-form-input profile-form-input-disabled"
          name="email"
          value={formData.email}
          readOnly
        />
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">Enabled</label>
        <input
          className="profile-form-checkbox profile-form-checkbox-disabled"
          type="checkbox"
          name="userEnable"
          checked={formData.userEnable}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">First Name</label>
        <input
          className={`profile-form-input ${!isEditing ? 'profile-form-input-disabled' : ''}`}
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">Last Name</label>
        <input
          className={`profile-form-input ${!isEditing ? 'profile-form-input-disabled' : ''}`}
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">Phone Number</label>
        <InputMask
          mask="(99) 99999-9999"
          value={formData.phoneNumber}
          onChange={handleChange}
          readOnly={!isEditing}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              className={`profile-form-input ${!isEditing ? 'profile-form-input-disabled' : ''}`}
              name="phoneNumber"
              placeholder="(11) 99999-9999"
            />
          )}
        </InputMask>
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">Date of Birth</label>
        <InputMask
          mask="99/99/9999"
          value={formData.dateOfBirth}
          onChange={handleChange}
          readOnly={!isEditing}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              className={`profile-form-input ${!isEditing ? 'profile-form-input-disabled' : ''}`}
              name="dateOfBirth"
              placeholder="dd/MM/yyyy"
            />
          )}
        </InputMask>
      </div>

      <div className="profile-form-group">
        <label className="profile-form-label">Profile</label>
        <input
          className="profile-form-input profile-form-input-disabled"
          name="profile"
          value={formData.profile.join(", ")}
          readOnly
        />
      </div>

      <div className="profile-form-actions">
        {isEditing ? (
          <div className="profile-form-button-group">
            <button className="profile-form-submit" type="submit">Salvar</button>
            <button className="profile-form-cancel" type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        ) : (
          <button className="profile-form-edit" type="button" onClick={handleEdit}>Editar</button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
