import React from "react";
import Job from "./Job";
import { useState, useEffect } from "react";
import "../style/Jobs.scss";

// , setKeywords, keywords

const Jobs = ({ filterKeywords, data, keywordArr, addFilterKeywords }) => {
  const [filteredData, setfilteredData] = useState([]);

  const [keywordsCompany, setKeywordsCompany] = useState([]);
  // console.log(keywordsCompany, "companykeys");
  // console.log(filterKeywords, "userselectedkeys");
  // console.log(filteredData, "filterData");

  useEffect(() => {
    const tools = data.map((keyword) => keyword.tools);
    setKeywordsCompany(tools);
  }, [data]);

  useEffect(() => {
    const filter = data.filter((f) =>
      filterKeywords.some((k) => f.tools.includes(k))
    );
    if (filter.length > 0) {
      setfilteredData(filter);
    } else {
      setfilteredData(data);
    }
  }, [keywordsCompany, filterKeywords]);

  return (
    <div className="jobs">
      <div className="jobs__container">
        <div className="jobs__top">.</div>
        <div className="jobs__center">
          {keywordArr.map((key, id) => (
            <button onClick={() => addFilterKeywords(key)} key={id}>
              {key}
            </button>
          ))}
        </div>
        <div className="jobs__job">
          <div className="jobs__jobs__container">
            <div className="jobs__bottom">
              <Job data={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
