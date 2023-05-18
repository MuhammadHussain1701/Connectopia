import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
function Contacts({ contacts, currentUser,changeChat}) {
 
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.picturePath);
      setCurrentUserName(`${currentUser.firstName} ${currentUser.lastName}`);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contacts-container">
          <div className="brand">
            <NavLink to="/home" className="textDecoration">
            <h3>Connectopia</h3>

            </NavLink>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="contact-avatar">
                    <img src={`http://localhost:3001/assets/${contact.picturePath}`} alt="" />
                  </div>
                  <div className="contact-username">
                    <h3>{`${contact.firstName} ${contact.lastName}`}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="currentuser-avatar">
              
              <img src={`http://localhost:3001/assets/${currentUserImage}`} alt="" />
            </div>
            <div className="currentuser-username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;


