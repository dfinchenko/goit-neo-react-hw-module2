import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import Options from "./components/Options/Options";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const localFeedback = localStorage.getItem("localStorageFeedback");
    if (!localFeedback) {
      return {
        good: 0,
        neutral: 0,
        bad: 0,
      };
    }

    return JSON.parse(localFeedback);
  });

  useEffect(() => {
    window.localStorage.setItem(
      "localStorageFeedback",
      JSON.stringify(feedback)
    );
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((previousFeedback) => ({
      ...previousFeedback,
      [feedbackType]: previousFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  return (
    <>
      <Description></Description>
      <Options
        options={feedback}
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
