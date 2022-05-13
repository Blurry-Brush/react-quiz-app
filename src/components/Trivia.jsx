import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/src_sounds_play.mp3";
import correct from "../assets/src_sounds_correct.mp3";
import wrong from "../assets/src_sounds_wrong.mp3";

export default function Trivia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [customClass, setCustomClass] = useState("answer");
  const [correctAnswer] = useSound(correct);
  const [letsPlay] = useSound(play);
  const [wrongAnswer] = useSound(wrong);

  //every render
  useEffect(() => {
    letsPlay();
  },[letsPlay]);

  //every render with change in dependancies
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (q) => {
    setSelectedAnswer(q);
    setCustomClass("answer active");
    delay(3000, () =>
      setCustomClass(q.correct ? "answer correct" : "answer wrong")
    );
    // setTimeout(() => {q.correct? setCustomClass("answer correct"): setCustomClass("answer wrong")}, 3000);

    //6 seconds for the right/wrong animation to complete (3+3)
    delay(5000, () => {
      if (q.correct) {
        correctAnswer();

        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((q) => {
          return (
            <div
              onClick={() => handleClick(q)}
              className={selectedAnswer === q ? customClass : "answer"}
            >
              {" "}
              {q.text}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}
