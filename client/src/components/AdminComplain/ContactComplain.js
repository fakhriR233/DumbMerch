import React, { useState } from "react";
import defaultPicture from "../../assets/images/Chat-People-1.jpg";

export default function Contact({ dataContact, clickContact, contact }) {
  // const clickContact = (id) => {
  //   const data = dataContact.find((item) => item.id === id);
  //   setContact(data);
  // };
  // console.log(dataContact);

  return (
    <>
      {dataContact.map((item, index) => (
        <div
          key={index}
          className={`contact mt-3 px-2 ${
            contact?.id === item?.id && "contact-active"
          }`}
          onClick={() => {
            clickContact(item.id);
          }}
        >
          <img
            src={item.profile?.image || defaultPicture}
            className="rounded-circle me-2 img-contact"
            alt={item.name}
          />
          <div className="pt-2">
            <ul className="ps-0 text-contact">
              <li>{item.name}</li>
              <li className="text-contact-chat mt-1">{item.message}</li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
