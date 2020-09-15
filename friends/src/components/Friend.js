import React from "react";

const Friend = ({ data: { name, age, email } }) => {
  return (
    <>
      <p>{name}</p>
      <p>{age}</p>
      <p>{email}</p>
    </>
  );
};

export default Friend;
