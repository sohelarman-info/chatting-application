import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";
import "./style.css";
import { useSelector } from "react-redux";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";
import { CgUnblock } from "react-icons/cg";
import { BiBlock } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

// Profile pic Upload
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

const UserList = () => {
  const db = getDatabase();
  const storage = getStorage();
  const [userlists, setUserlists] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [cancelRequest, setCancelRequest] = useState([]);
  const [acceptRequest, setAcceptRequest] = useState([]);
  const [unfriendRequest, setUnfriendRequest] = useState([]);
  const [unblock, setUnblock] = useState([]);
  const [unblockDisabled, setUnblockDisabled] = useState(false);

  const [friends, setFriends] = useState([]);
  const [blockFriends, setBlockFriends] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);

  // read user
  // useEffect(() => {
  //   const starCountRef = ref(db, "users/");

  //   onValue(starCountRef, (snapshot) => {
  //     const userArray = [];
  //     snapshot.forEach((userData) => {
  //       if (user.uid != userData.key) {
  //         userArray.push({
  //           ...userData.val(),
  //           id: userData.key,
  //         });
  //       }
  //     });
  //     setUserlists(userArray);
  //   });
  // }, []);

  // Read User with profile pic

  useEffect(() => {
    const fetchUsers = ref(db, "users");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((userData) => {
        if (user.uid !== userData.key) {
          getDownloadURL(storageRef(storage, userData.key))
            .then((url) => {
              usersArr.push({
                ...userData.val(),
                id: userData.key,
                profilePicture: url,
              });
            })
            .catch((error) => {
              usersArr.push({
                ...userData.val(),
                id: userData.key,
                profilePicture: null,
              });
            })
            .then(() => {
              setUserlists([...usersArr]);
            });
        }
      });
    });
  }, [db, storage, user.uid]);

  // send request
  const handleRequestSend = (item) => {
    set(push(ref(db, "friendrequest/")), {
      senderid: user.uid,
      sendername: user.displayName,
      receiverid: item.id,
      receivername: item.username,
      receiverProfilePicture: item.profilePicture,
      senderProfilePicture: user.photoURL,
    });
  };

  // read friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      snapshot.forEach((item) => {
        requestArray.push(item.val().receiverid + item.val().senderid);
        requestArray.push({ ...item, id: item.key });
      });
      setFriendRequest(requestArray);
    });
  }, []);

  // read friends list
  useEffect(() => {
    const starCountRef = ref(db, "friends/");

    onValue(starCountRef, (snapshot) => {
      let friendsArray = [];
      snapshot.forEach((item) => {
        friendsArray.push(item.val().receiverid + item.val().senderid);
      });
      setFriends(friendsArray);
    });
  }, []);

  // read block friends list
  useEffect(() => {
    const starCountRef = ref(db, "block/");

    onValue(starCountRef, (snapshot) => {
      let blockArray = [];
      snapshot.forEach((item) => {
        blockArray.push(item.val().blockbyid + item.val().blockid);
      });
      setBlockFriends(blockArray);
    });
  }, []);

  // cancel friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      let cancelKey = [];
      snapshot.forEach((item) => {
        requestArray.push(item.val().receiverid + item.val().senderid);
        cancelKey.push({ ...item.val(), requestKey: item.key });
      });
      setCancelRequest(cancelKey);
    });
  }, []);

  const handleCancelRequest = (userInfo) => {
    cancelRequest.map((item) => {
      if (userInfo.id === item.receiverid) {
        remove(ref(db, "friendrequest/" + item.requestKey));
      } else {
        console.log("something problem");
      }
    });
  };

  // accept friend request

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");

    onValue(starCountRef, (snapshot) => {
      let requestArray = [];
      let acceptArray = [];
      snapshot.forEach((item) => {
        requestArray.push(item.val().receiverid + item.val().senderid);
        acceptArray.push({ ...item.val(), requestKey: item.key });
      });
      setAcceptRequest(acceptArray);
    });
  }, []);

  const handleAccept = (userInfo) => {
    acceptRequest.map((item) => {
      if (userInfo.id === item.senderid) {
        set(push(ref(db, "friends/")), {
          ...item,
        }).then(() => {
          remove(ref(db, "friendrequest/" + item.requestKey));
        });
      } else {
        console.log("something problem");
      }
    });
  };

  // unfriend request
  useEffect(() => {
    const starCountRef = ref(db, "friends/");

    onValue(starCountRef, (snapshot) => {
      let friendsArray = [];
      let unfriendKey = [];
      snapshot.forEach((item) => {
        friendsArray.push(item.val().receiverid + item.val().senderid);
        unfriendKey.push({ ...item.val(), friendsKey: item.key });
      });
      setUnfriendRequest(unfriendKey);
    });
  }, []);

  const handleUnfriend = (userInfo) => {
    unfriendRequest.map((item) => {
      if (userInfo.id === item.senderid) {
        remove(ref(db, "friends/" + item.friendsKey));
      } else if (userInfo.id === item.receiverid) {
        remove(ref(db, "friends/" + item.friendsKey));
      } else {
        console.log("something problem");
      }
    });
  };

  // unblock friend
  useEffect(() => {
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {
      let blockArray = [];
      let unblockedKey = [];
      snapshot.forEach((item) => {
        blockArray.push(item.val().blockbyid + item.val().blockid);
        unblockedKey.push({ ...item.val(), blockKey: item.key });
      });
      setUnblock(unblockedKey);
    });
  }, []);

  const handleUnblock = (userInfo) => {
    setUnblockDisabled(true);
    unblock.map((item) => {
      if (userInfo.id === item.blockid) {
        if (item.senderid === item.blockbyid) {
          remove(ref(db, "block/" + item.blockKey));
          setUnblockDisabled(false);
        } else {
          set(push(ref(db, "friends")), {
            receiverid: item.receiverid,
            receivername: item.receivername,
            requestKey: item.requestKey,
            senderid: item.senderid,
            sendername: item.sendername,
            receiverProfilePicture: item.receiverProfilePicture,
            senderProfilePicture: item.senderProfilePicture,
          }).then(() => {
            remove(ref(db, "block/" + item.blockKey));
            setUnblockDisabled(false);
          });
        }
      }
    });
  };

  // user Search Funtionality
  const handleUserSearch = (e) => {
    let userArray = [];
    if (e.target.value.length === 0) {
      setUserSearch([]);
    }
    userlists.filter((item) => {
      if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
        userArray.push(item);
        setUserSearch(userArray);
      }
    });
  };

  return (
    <>
      <div className="users-list-wrapper">
        <div className="friends-list-header">
          <h4>User List</h4>
          <div className="users-list-option">
            <SlOptionsVertical />
          </div>
        </div>
        <div className="search-wrapper user-search">
          <div className="search-icon">
            <FiSearch />
          </div>
          <div className="search-input">
            <input
              onChange={handleUserSearch}
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="users-wrapper-scroll">
          {userlists.length == 1 ? (
            <div className="empty-message">
              <Alert severity="error">You don't hvae any users</Alert>
            </div>
          ) : userSearch.length > 0 ? (
            userSearch.map((item, i) => (
              <div key={i} className="users-item-wraper">
                <div className="users-item-pic">
                  <picture>
                    <img
                      src={item.profilePicture || "/images/profile/avatar.png"}
                      onError={(e) => {
                        e.target.src = "/images/profile/avatar.png";
                      }}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="users-item-name">
                  <h5>{item.username}</h5>
                  <p>{item.id}</p>
                </div>
                <div className="users-item-button">
                  <div className="users-block-button">
                    {friendRequest.includes(item.id + user.uid) ? (
                      <Button
                        variant="contained"
                        onClick={() => handleCancelRequest(item)}
                      >
                        <RxCross2 />
                        Cancel
                      </Button>
                    ) : friendRequest.includes(user.uid + item.id) ? (
                      <Button
                        variant="contained"
                        onClick={() => handleAccept(item)}
                      >
                        <BsCheck2 /> Accept
                      </Button>
                    ) : friends.includes(item.id + user.uid) ||
                      friends.includes(user.uid + item.id) ? (
                      <Button
                        variant="contained"
                        onClick={() => handleUnfriend(item)}
                      >
                        <FaUserTimes /> Unfriend
                      </Button>
                    ) : blockFriends.includes(item.id + user.uid) ? (
                      <Button variant="contained" disabled>
                        <BiBlock /> Blocked
                      </Button>
                    ) : blockFriends.includes(user.uid + item.id) ? (
                      <Button
                        className="block-button"
                        variant="contained"
                        onClick={() => handleUnblock(item)}
                      >
                        <CgUnblock /> Unblocked
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleRequestSend(item)}
                      >
                        <FaUserPlus /> Add Friend
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            userlists.map((item, i) => (
              <div key={i} className="users-item-wraper">
                <div className="users-item-pic">
                  <picture>
                    <img
                      src={item.profilePicture || "/images/profile/avatar.png"}
                      onError={(e) => {
                        e.target.src = "/images/profile/avatar.png";
                      }}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="users-item-name">
                  <h5>{item.username}</h5>
                  <p>{item.id}</p>
                </div>
                <div className="users-item-button">
                  <div className="users-block-button">
                    {friendRequest.includes(item.id + user.uid) ? (
                      <Button
                        variant="contained"
                        onClick={() => handleCancelRequest(item)}
                      >
                        <RxCross2 />
                        Cancel
                      </Button>
                    ) : friendRequest.includes(user.uid + item.id) ? (
                      <Button
                        variant="contained"
                        onClick={() => handleAccept(item)}
                      >
                        <BsCheck2 /> Accept
                      </Button>
                    ) : friends.includes(item.id + user.uid) ||
                      friends.includes(user.uid + item.id) ? (
                      <Button
                        variant="contained"
                        onClick={() => handleUnfriend(item)}
                      >
                        <FaUserTimes /> Unfriend
                      </Button>
                    ) : blockFriends.includes(item.id + user.uid) ? (
                      <Button variant="contained" disabled>
                        <BiBlock /> Blocked
                      </Button>
                    ) : blockFriends.includes(user.uid + item.id) ? (
                      <Button
                        className="block-button"
                        variant="contained"
                        onClick={() => handleUnblock(item)}
                      >
                        <CgUnblock /> Unblocked
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleRequestSend(item)}
                      >
                        <FaUserPlus /> Add Friend
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
