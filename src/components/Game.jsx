import { useState, useEffect } from "react";

export const Game = () => {
  const [circleCount, setCircleCount] = useState(5); //circle number
  const [circles, setCircles] = useState([]); //circles

  const [currentStep, setCurrentStep] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (!gameOver && !gameSuccess && circles.length > 0) {
      timer = setInterval(() => setTime((prev) => prev + 0.1), 100);
    } else if (gameOver || gameSuccess) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameOver, gameSuccess, circles]);

  const handleStart = () => {
    const newCircles = Array.from({ length: circleCount }, (_, i) => ({
      number: i + 1,
      top: Math.random() * 80 + "%",
      left: Math.random() * 80 + "%",
      clicked: false,
    }));
    // console.log(newCircles);
    setCircles(newCircles);
    setCurrentStep(1);
    setGameOver(false);
    setGameSuccess(false);
    setTime(0);
  };

  const handleCircleClick = (number) => {
    if (number === currentStep) {
      const updatedCircles = circles.map((circle) =>
        circle.number === number ? { ...circle, clicked: true } : circle
      );
      setCircles(updatedCircles);
      setCurrentStep(currentStep + 1);

      if (currentStep === circleCount) {
        setGameSuccess(true);
      }
    } else {
      setGameOver(true);
    }
  };

  return (
    <>
      <div className="game-wrapper">
        <div className="game-content">
          <h1 className="game-title">
            {gameOver ? (
              <span style={{ color: "red", textTransform: "uppercase" }}>Game Over</span>
            ) : gameSuccess ? (
              <span style={{ color: "green", textTransform: "uppercase" }}>
                All Cleared
              </span>
            ) : (
              "Let's Play"
            )}
          </h1>
          <div className="form-group">
            <label htmlFor="points-input">Points:</label>
            <input
              type="number"
              id="points-input"
              value={circleCount}
              onChange={(e) => setCircleCount(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <span>{time.toFixed(1)}s</span>
          </div>
          <button onClick={handleStart}>
            {gameOver || gameSuccess ? "Restart" : "Play"}
          </button>
          <div className="game-board">
            {circles.map((circle) => (
              <div
                key={circle.number}
                className="circle"
                style={{
                  top: circle.top,
                  left: circle.left,
                  zIndex: circleCount - circle.number + 1,
                  backgroundColor: circle.clicked ? "red" : "white",
                  visibility: circle.clicked ? "hidden" : "visible",
                  transition: "all 1s linear",
                }}
                onClick={() => handleCircleClick(circle.number)}
              >
                {circle.number}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
