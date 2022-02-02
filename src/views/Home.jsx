import React, { useContext } from "react";
import firebase from "firebase/app";
import StoreContext from "../controller/Context";
import SurveyBox from "./survey/SurveyBox/SurveyBox";

function Home() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <section className="main">
      <h1>Available Surveys</h1>
      {arr.map((ele) => (
        <SurveyBox key={ele} />
      ))}
    </section>
  );
}

export default Home;
