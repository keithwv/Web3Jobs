import "./App.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import Header from "./components/Header";
import { onSnapshot, query, where } from "@firebase/firestore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getFirestore, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PostAJob from "./components/PostAJob";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [jobs, setJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);

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
  const jobsRef = collection(db, "JobsApproved");

  useEffect(
    () =>
      onSnapshot(jobsRef, (snapshot) => {
        setJobs(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  // Get posted jobs from the database that are pending approval
  useEffect(() => {
    let collectionRef = collection(db, "Jobs");
    let queryRef = query(collectionRef, where("approved", "==", "tbd"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("no docs found");
      } else {
        let pendingJobs = querySnap.docs.map((doc) => {
          return {
            ...doc.data(),
            DOC_ID: doc.id,
          };
        });
        setPendingJobs(pendingJobs);
      }
    });
    return unsubscribe;
  }, []);

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

  //console.log(wallet);

  return (
    <AuthProvider>
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
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/admin">
              <ProtectedRoute>
                <Admin pendingJobs={pendingJobs} />
              </ProtectedRoute>
            </Route>
            <Route exact path="/postajob">
              <PostAJob keywordArr={keywordArr} />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
