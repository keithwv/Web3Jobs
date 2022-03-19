import React from "react";
import { useState, useEffect } from "react";
import "../style/Job.scss";

const Job = ({ data }) => {
  return (
    <div>
      {data.map((d) => {
        return (
          <div className="job">
            <div className="job__container">
              <div className="job__left">
                <div className="job__left_first">
                  <div className="job__image">
                    <img src={d.image} alt="" />
                  </div>
                </div>
                <div className="job__left_second">
                  <h1>{d.companyName}</h1>
                  <h2>{d.position}</h2>
                  <span>{d.description}</span>
                  <span>min salary: {d.minSalary}K</span>
                </div>
              </div>
              <div className="job__center"></div>
              <div className="job__right">
                <button>Apply now</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Job;
