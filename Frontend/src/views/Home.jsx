import SurveyBox from "./survey/SurveyBox/SurveyBox";

function Home({ surveys }) {
    return (
        <section className="main">
            <h1>Available Surveys</h1>
            {surveys.length &&
                surveys.map((survey) => (
                    <SurveyBox key={survey.id} survey={survey} />
                ))}
        </section>
    );
}

export default Home;
