import React from "react";
import "../survey.css";

function SurveyBox() {
  return (
    <section className="surveyBox">
      <h2 className="surveyName">
        Survey Box
        <span>
          Given by : <span className="totalPeople">20</span>
        </span>
      </h2>

      <div className="surveyDetails">
        <p className="surveySummary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque magnam
          laborum labore id amet temporibus aliquam, ipsam, blanditiis tenetur
          qui sapiente! Perferendis soluta aut obcaecati quasi nulla dicta
          assumenda voluptatibus!
        </p>

        <div className="actions">
          <div className="surveyDeadline">
            Deadline: <span>30-july-22</span>
          </div>
          <button className="btn">Start</button>
        </div>
      </div>
    </section>
  );
}

export default SurveyBox;
