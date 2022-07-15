import React from "react";
import Image from "react-bootstrap/esm/Image";
import Dhani from "../../assets/images/Ahmad_Dhani_Prasetyo,_2017.jpg";

const ProfilePictureCard = () => {
  return (
    <div style={{ color: "white" }}>
      <div className="my-3 mx-3 p-3">
        <h2 className="mx-4">My Profile</h2>
        <div className="d-flex mx-4 mt-4" style={{ height: "97vh" }}>
          <div>
            <div className="me-3">
              <Image rounded src={Dhani} width={320} />
            </div>
          </div>
          <div>
            <div>
              <p style={textRed}> NAMA</p>
              <span>Ahmad Dhani Prasetyo</span>
            </div>
            <div>
              <p style={textRed}>Email</p>
              <p>Email</p>
            </div>
            <div>
              <p style={textRed}>Phone</p>
              <p>Phone</p>
            </div>
            <div>
              <p style={textRed}>Gender</p>
              <p>Gender</p>
            </div>
            <div>
              <p style={textRed}>Address</p>
              <p>Address</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const textRed = {
  color: "red",
  fontSize: "18px",
};

export default ProfilePictureCard;
