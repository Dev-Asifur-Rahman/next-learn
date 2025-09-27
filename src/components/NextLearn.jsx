
const NextLearn = () => {
  return (
    <ShinyText
      text="NextLearn"
      disabled={false}
      speed={3}
      className="custom-class"
    />
  );
};

export default NextLearn;

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div className={`shiny-white-text dark:shiny-black-text ${disabled ? 'disabled' : ''} ${className}`} style={{ animationDuration }}>
      {text}
    </div>
  );
};

