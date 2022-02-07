import "../survey.css";

function SurveyBox({ surveyId, survey }) {
    console.log("survey");
    console.log(survey);
    return (
        <section className="surveyBox" id={surveyId}>
            <h2 className="surveyName">
                {survey.surveyTitle}
                <span>
                    Given by :
                    <span className="totalPeople">
                        {survey.surveyUsers.length}
                    </span>
                </span>
            </h2>

            <div className="surveyDetails">
                <p className="surveySummary">{survey.surveyDescription}</p>

                <div className="actions">
                    <div className="surveyDeadline">
                        Deadline: <span>{survey.surveyDeadline}</span>
                    </div>
                    <button className="btn">Start</button>
                </div>
            </div>
        </section>
    );
}

export default SurveyBox;
