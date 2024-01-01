import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { postContext } from '../../store/PostContext';
import FirebaseContext from '../../store/firebaseContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails] = useState('')
  const {postDetails} = useContext(postContext)
  const {db} = useContext(FirebaseContext)
  useEffect(() => {
    const { userId } = postDetails
    const que = query(collection(db, "users"), where("id", "==", userId));
    const sub = onSnapshot(que, (querySnapshot) => {
      querySnapshot.docs.map(d => setUserDetails(d.data()));
    });
  },[])
console.log(userDetails,548034908);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails ? postDetails.imageUrl : ""}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails ?postDetails.price :""} </p>
          <span>{postDetails ?postDetails.name:''}</span>
          <p>{postDetails ?postDetails.category:""}</p>
          <span>{postDetails ?postDetails.createdAt:""}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>Name:{userDetails ? userDetails.username : ""}</p>
          <p>Mobile:{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
