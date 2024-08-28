import css from "./Options.module.css";

export const Options = ({
  options,
  updateFeedback,
  resetFeedback,
  totalFeedback,
}) => {
  return (
    <div className={css.buttons}>
      {Object.keys(options).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => updateFeedback(option)}
        >
          {option}
        </button>
      ))}
      {totalFeedback > 0 && (
        <button type="button" onClick={() => resetFeedback()}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
