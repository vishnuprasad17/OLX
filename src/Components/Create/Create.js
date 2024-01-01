import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import FirebaseContext, { authContext } from "../../store/firebaseContext";
import {useNavigate} from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate()
  const {db,app} = useContext(FirebaseContext)
  const {user} = useContext(authContext)
  
  
  
  const handleSubmit = async () => {
    console.log(image);
    console.log("1");
    const storage = getStorage(app)
    console.log("2");
    const storageRef = ref(storage,`/imgaes/${image.name}`)
    console.log(storageRef);
    console.log("3");
    await uploadBytes(storageRef,image)
    console.log("4");
    const imageUrl = await getDownloadURL(storageRef)
    console.log("5");
    console.log(imageUrl);
    await addDoc(collection(db,"products"),{
      name,
      category,
      price,
      imageUrl:imageUrl,
      userId:user.uid,
      createdAt:new Date().toDateString()
    })
    navigate('/')
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />

          <br />
          {image ? <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img> : ""}

          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;