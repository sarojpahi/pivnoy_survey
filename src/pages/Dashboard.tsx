import SurveyCard from "../components/SurveyCard";

const Dashboard: React.FC = () => {
  const cards = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="text-2xl font-semibold text-black-100 mb-4">
        Dashboard
      </div>
      <div>
        <div className="text-xl font-semibold text-black-100 mb-4 ">
          Saved Surveys
        </div>
        <div className="grid grid-cols-3 gap-5">
          {cards.map((card) => (
            <SurveyCard key={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
