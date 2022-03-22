import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "../style/PostAJob.scss";
import { app } from "../firebase";
import { ethers } from "ethers";
import axios from "axios";

const PostAJob = ({ keywordArr }) => {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [address, setAddress] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tools, setTools] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [isTrx, setIsTrx] = useState(false);
  //id = metamask wallet address

  var now = new Date();
  var utc_timestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );

 //console.log(utc_timestamp, "this is the date");

  const db = getFirestore(app);

  const addKeyword = (key) => {
    if (!tools.includes(key)) {
      setTools([...tools, key]);
    }
  };

  //upload image to firebase storage and then get img url which we can use in frontend
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    //const fileRef = ref(storage, file.name);
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageURL(downloadURL);
      });
    });
  };

  //upload file to FireStore Database (image posted as url)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    axios
    .post("https://us-central1-job-poster-97385.cloudfunctions.net/posting/postajob",{
      position: position,
      approved: "tbd",
      description: description,
      companyName: companyName,
      location: location,
      url: url,
      email: email,
      minSalary: minSalary,
      maxSalary: maxSalary,
      address: address,
      twitter: twitter,
      tools: tools,
      image: imageURL,
    })
    .then(function (response) {
      console.log(response.data)
    });
  } catch(err) {
    console.log(err.message)

  }
    const jobsRef = collection(db, "Jobs");
    await addDoc(jobsRef, {
      position: position,
      approved: "tbd",
      description: description,
      companyName: companyName,
      location: location,
      url: url,
      email: email,
      minSalary: minSalary,
      maxSalary: maxSalary,
      address: address,
      twitter: twitter,
      tools: tools,
      image: imageURL,
    });

    //set the form value back
    setPosition("");
    setDescription("");
    setCompanyName("");
    setLocation("");
    setUrl("");
    setEmail("");
    setMinSalary("");
    setMaxSalary("");
    setAddress("");
    setTwitter("");
    setTools([]);
    setImageURL("");
  };

  //Crypto

  //get eth price

  const [price, setPrice] = useState();

  const getEthData = async () => {
    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((response) => response.json())
      .then((data) => {
        setPrice(parseFloat(data.USD).toFixed(4));
      });
  };
  getEthData();

  //calculate 50usd eth

  const fiftyDollarsInETH = parseFloat((1 / price) * 50).toFixed(4);

  const value = fiftyDollarsInETH.toString();

 const [error, setError] = useState();

  const PaywithCrypto = async () => {
    if (!window.ethereum) {
      setError("First get Metamask");
    } else {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const address = "0xf9e5f3389f972b19e72436f426889ff4f628d3fe";
      ethers.utils.getAddress(address);
      const trx = await signer.sendTransaction({
        //address and value must be strings
        to: address,
        value: ethers.utils.parseEther(value),
      });

      if (!trx) {
        return;
      } else {
        setIsTrx(true);
      }
    }
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <h1>Post your WEB3 Job</h1>
        </div>
        <div className="post__section">
          <div className="leftside">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Position"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <input
                type="text"
                name="description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {isTrx === true && (
                <input
                  type="file"
                  onChange={onFileChange}
                  placeholder="image"
                />
              )}

              <button type="button" onClick={PaywithCrypto}>
                pay
              </button>

              <div className="tools">
                {keywordArr.map((key) => (
                  <button
                    type="button"
                    onClick={() => addKeyword(key)}
                    className="postajob__tools"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <input
                type="text"
                name="location"
                placeholder="Location (remote or/and city, country)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                name="url"
                id=""
                placeholder="Apply Url"
                onChange={(e) => setUrl(e.target.value)}
              />
              <input
                type="text"
                name="email"
                id=""
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="post__salary">
                <select
                  onChange={(e) => {
                    setMinSalary(e.target.value);
                  }}
                  value={minSalary}
                >
                  <option value="Default" disabled selected>
                    Min Yearly Salary
                  </option>
                  <option value="0">0$</option>
                  <option value="10">10k$</option>
                  <option value="20">20k$</option>

                  <option value="30">30k$</option>
                  <option value="40">40k$</option>
                  <option value="50">50k$</option>
                  <option value="60">60k$</option>
                  <option value="70">70k$</option>
                  <option value="80">80k$</option>
                  <option value="90">90k$</option>
                  <option value="100">100k$</option>
                  <option value="110">110k$</option>
                  <option value="120">120k$</option>
                  <option value="130">130k$</option>
                  <option value="140">140k$</option>
                </select>
                <select
                  onChange={(e) => {
                    setMaxSalary(e.target.value);
                  }}
                  placeholder="Max salary"
                  value={maxSalary}
                >
                  <option value="Default" disabled selected>
                    Max Yearly Salary
                  </option>
                  <option value="0">0$</option>
                  <option value="10">10k$</option>
                  <option value="20">20k$</option>

                  <option value="30">30k$</option>
                  <option value="40">40k$</option>
                  <option value="50">50k$</option>
                  <option value="60">60k$</option>
                  <option value="70">70k$</option>
                  <option value="80">80k$</option>
                  <option value="90">90k$</option>
                  <option value="100">100k$</option>
                  <option value="110">110k$</option>
                  <option value="120">120k$</option>
                  <option value="130">130k$</option>
                  <option value="140">140k$</option>
                </select>
              </div>
              <input
                type="text"
                name="address"
                placeholder="Invoice address: Company's full name, full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                name="twitter"
                placeholder="Company's Twitter page without @"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />

              <button type="submit" className="submit">
                Post a Job (FREE)
              </button>
            </form>
          </div>
          <div className="rightside"></div>
        </div>
      </div>
    </div>
  );
};

export default PostAJob;
