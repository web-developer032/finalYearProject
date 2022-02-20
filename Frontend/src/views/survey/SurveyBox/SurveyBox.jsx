import "../survey.css";

function SurveyBox({ survey }) {
    return (
        <section className="surveyBox" id={`survey-${survey.id}`}>
            <h2 className="surveyName">
                {survey.title}
                <span>
                    taken by: &nbsp;
                    <span className="totalPeople"> {survey.users.length}</span>
                </span>
            </h2>

            <div className="surveyDetails">
                <p className="surveySummary">{survey.summary}</p>

                <div className="actions">
                    <div className="surveyDeadline">
                        Deadline: &nbsp;
                        <span>{new Date(survey.expire).toDateString()}</span>
                    </div>
                    <button className="btn">Start</button>
                </div>
            </div>
        </section>
    );
}

export default SurveyBox;
