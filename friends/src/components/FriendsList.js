import React, { useEffect, useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import Friend from "./Friend";

const FriendsList = () => {
  const initialFormValues = {
    name: "",
    age: "",
    email: "",
    id: "",
  };

  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState(initialFormValues);

  const inputHandler = (e) => {
    setNewFriend({
      ...newFriend,
      [e.target.name]: e.target.value,
      id: new Date(),
    });
  };

  const getFriends = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", newFriend)
      .then((res) => {
        setFriends(res.data);
        setNewFriend(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFriends();
  }, []);

  const { name, age, email } = newFriend;
  return (
    <>
      <form onSubmit={submitHandler}>
        <input text="text" name="name" value={name} onChange={inputHandler} />
        <input text="text" name="age" value={age} onChange={inputHandler} />
        <input text="text" name="email" value={email} onChange={inputHandler} />
        <button>Submit</button>
      </form>

      {friends.map((friend) => (
        <Friend data={friend} key={friend.id} />
      ))}
    </>
  );
};

export default FriendsList;
