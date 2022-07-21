import React, { useContext } from "react";
import Image from "react-bootstrap/esm/Image";
import { useQuery } from "react-query";
import Dhani from "../../assets/images/Ahmad_Dhani_Prasetyo,_2017.jpg";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const ProfilePictureCard = () => {
  const [state] = useContext(UserContext);

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile");
    // console.log("====================================");
    // console.log(response.data.data);
    // console.log("====================================");

    return response.data.data;
  });

  return (
    <div style={{ color: "white" }}>
      <div className="my-3 mx-3 p-3">
        <h2 className="mx-4">My Profile</h2>
        <div className="d-flex mx-4 mt-4" style={{ height: "97vh" }}>
          <div>
            <div className="me-3">
              <Image
                rounded
                src={
                  profile?.image === undefined
                    ? profile?.image
                    : "https://img.freepik.com/free-vector/flat-design-no-photo-sign_23-2149299706.jpg?t=st=1658408061~exp=1658408661~hmac=31b9e524b96060de848e89b24bece0e1c1d5a9927ebd32d83177b227cd4f8663&w=740"
                }
                width={320}
              />
            </div>
          </div>
          <div>
            <div>
              <p style={textRed}> NAMA</p>
              <span>{state?.user?.name}</span>
            </div>
            <div>
              <p style={textRed}>Email</p>
              <p>{state?.user?.email}</p>
            </div>
            <div>
              <p style={textRed}>Phone</p>
              <p>{profile?.phone ? profile?.phone : "-"}</p>
            </div>
            <div>
              <p style={textRed}>Gender</p>
              <p>{profile?.gender ? profile?.gender : "-"}</p>
            </div>
            <div>
              <p style={textRed}>Address</p>
              <p>{profile?.address ? profile?.address : "-"}</p>
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
