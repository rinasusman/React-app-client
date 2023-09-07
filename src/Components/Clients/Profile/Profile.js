import React, { useEffect, useState } from "react";
import "./Profile.css";
import { get } from "config/index";
import { API_URL } from "config/endpoints";
import { post } from "config/index";
import { userAPI } from "Constants/API";

function Profile() {
  const [toggle, setToggle] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProfileDetails = async () => {
    try {
      let response = await get(API_URL.PROFILE_LIST);
      if (response) {
        setProfileDetails(response);
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await post(API_URL.PROFILE_IMAGE_EDIT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response && response.message && response.data) {
          setProfileDetails(response.data);
          setToggle(!toggle);
        }
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  return (
    <div className="outer mt-5">
      <div className="image-container mx-auto">
        <img
          src={`${userAPI}${profileDetails?.image}?${Date.now()}`}
          width="50%"
          alt=""
        />
        <br />
        {toggle ? (
          <>
            <input
              className="form-control mx-2"
              type="file"
              onChange={handleImageChange}
            />

            <button className="btn btn-info" onClick={handleImageUpload}>
              Upload
            </button>
          </>
        ) : (
          ""
        )}
        <span className="edit-icon" onClick={() => setToggle(!toggle)}>
          <i className="fas fa-edit"></i>
        </span>
      </div>
      <div className="profile mx-auto m-3">
        <h1>
          <i className="fa-solid fa-user"></i> : {profileDetails?.name}
        </h1>
        <h1>
          <i className="fa-solid fa-envelope"></i> : {profileDetails?.email}
        </h1>
        <h1>
          <i className="fa-solid fa-phone"></i> : {profileDetails?.phone}
        </h1>
      </div>
    </div>
  );
}

export default Profile;
