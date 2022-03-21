import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";

const Admin = (props) => {
  const { pendingJobs } = props;

  const { logout } = useAuth();
  const signOut = () => {
    console.log(logout);
    logout();
    alert("you logged out");
  };

  const HandleApprove = async (job) => {
    console.log(job);
    // Add document to the approved_jobs collection
    try {
      await addDoc(collection(db, "JobsApproved"), {
        address: job.job.address,
        approved: "Yes",
        companyName: job.job.companyName,
        description: job.job.description,
        email: job.job.email,
        image: job.job.image,
        location: job.job.location,
        maxSalary: job.job.maxSalary,
        minSalary: job.job.minSalary,
        position: job.job.position,
        tools: job.job.tools,
        twitter: job.job.twitter,
        url: job.job.url,
      });
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
    // Update existing document in order properly archive job postings
    const id = job.job.DOC_ID;
    const JobDoc = doc(db, "Jobs", id);
    await updateDoc(JobDoc, {
      address: job.job.address,
      approved: "Yes",
      companyName: job.job.companyName,
      description: job.job.description,
      email: job.job.email,
      image: job.job.image,
      location: job.job.location,
      maxSalary: job.job.maxSalary,
      minSalary: job.job.minSalary,
      position: job.job.position,
      tools: job.job.tools,
      twitter: job.job.twitter,
      url: job.job.url,
    });
  };

  return (
    <>
      <div>Admin</div>
      <button onClick={signOut}>SignOut</button>
      <br></br>
      <Typography component="h1" variant="h5" color="white">
        Admin Page
      </Typography>
      return (
      <div>
        {pendingJobs.map((job) => {
          return (
            <div className="job">
              <div className="job__container">
                <div className="job__left">
                  <div className="job__left_first">
                    <div className="job__image">
                      <img src={job.image} alt="" />
                    </div>
                  </div>
                  <div className="job__left_second">
                    <h1>{job.companyName}</h1>
                    <h2>{job.position}</h2>
                    <h3>{job.description}</h3>
                    <h4>min salary: {job.minSalary}K</h4>
                  </div>
                </div>
                <div className="job__center"></div>
                <div className="job__right">
                  <button onClick={() => HandleApprove({ job })}>
                    Approve Posting
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      );
    </>
  );
};

export default Admin;
