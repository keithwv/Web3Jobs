import "./App.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import Header from "./components/Header";
import { onSnapshot } from "@firebase/firestore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getFirestore, collection, getDocs, doc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PostAJob from "./components/PostAJob";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filterKeywords, setfilterKeywords] = useState([]);
  const keywordArr = [
    "HTML",
    "JavaScript",
    "Solidty",
    "Backend",
    "Fullstack",
    "Frontend",
    "React",
    "Vue",
    "Designer",
    "Figma",
    "Adobe",
    "analyst",
    "node",
    "product manager",
    "java",
    "golang",
    "nft",
    "marketing",
    "mobile",
    "sales",
    "entry level",
    "solana",
    "non tech",
    "ruby",
  ];

  const addFilterKeywords = (key) => {
    if (!filterKeywords.includes(key)) {
      setfilterKeywords((prev) => [...prev, key]);
    }
  };

  const deleteKeyword = (key) => {
    const newKeywords = filterKeywords.filter((newkey) => newkey !== key);
    setfilterKeywords(newKeywords);
  };

  const clearAll = () => {
    setfilterKeywords([]);
  };

  //get Jobs from firebase

  const db = getFirestore();
  const jobsRef = collection(db, "Jobs");

  useEffect(
    () =>
      onSnapshot(jobsRef, (snapshot) => {
        setJobs(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  // get metmask wallet address

  const [wallet, setWallet] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("You first need to install Metamask");
    } else {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setWallet(await signer.getAddress());
    }
  };

  console.log(wallet);

  return (
    <Router>
      <div className="App">
        <Navbar connectWallet={connectWallet} wallet={wallet} />

        <Switch>
          <Route exact path="/">
            <Hero />
            <div className="filter__placeholder">
              <div className="filter__placeholder_container">
                <Header
                  filterKeywords={filterKeywords}
                  clearAll={clearAll}
                  deleteKeyword={deleteKeyword}
                />
              </div>
            </div>
            <Jobs
              filterKeywords={filterKeywords}
              keywordArr={keywordArr}
              data={jobs}
              addFilterKeywords={addFilterKeywords}
            />
          </Route>

          <Route exact path="/postajob">
            <PostAJob keywordArr={keywordArr} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
