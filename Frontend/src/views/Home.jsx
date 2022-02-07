import SurveyBox from "./survey/SurveyBox/SurveyBox";

function Home({ surveys }) {
    console.log(surveys[0]?.data());
    return (
        <section className="main">
            <h1>Available Surveys</h1>
            {surveys.length &&
                surveys.forEach((survey) => {
                    console.log(survey.data());
                    return (
                        <SurveyBox
                            key={survey.id}
                            survey={survey.data()}
                            surveyId={survey.id}
                        />
                    );
                })}

            {surveys.size && (
                <SurveyBox
                    key={surveys[0].id}
                    survey={surveys[0].data()}
                    surveyId={surveys[0].id}
                />
            )}
        </section>
    );
}

export default Home;
