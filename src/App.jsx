import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import correct from './correct.mp3';
import wrong from "./wrong2.wav";
function App() {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(50)
  const [sometext, setSometext] = useState("")
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0);
  const [timetwo, setTimetwo] = useState(time);
  const [g, setG] = useState(false);
  const audio= new Audio(correct)
  const audio2=new Audio(wrong)
  useEffect(() => {
    let myinterval = setInterval(() => {
      if (time > 0) {
        setTime(time => time - 1);
      }
      else {
        clearInterval(myinterval);
        setTimeout(() => {
          fetchRandomWord();
          setIndex(0);
          setScore(0);
          setSometext("");
          setUserInput("");
          setTime(50);
          setTimetwo(50);
        }, 5000);
      }
    }, 1000)
    return () => {
      clearInterval(myinterval);
    }
  }
  )
  useEffect(() => {
    fetchRandomWord();
  }, []);
  function processInput(value) {
    console.log(userInput);
    if (value.endsWith(sometext[index])) {
      console.log(true);
      setIndex(index => index + 1);
      setUserInput(value);
      if (index == sometext.length - 1) {
        setUserInput('');
        audio.play();
        setIndex(0);
        fetchRandomWord();
        setScore(score => score + 1);
        setTime(time => time - 2);
      }
    }
    else {
      audio2.play();
      setTime(timetwo);
      setUserInput('');
      setIndex(0);
    }
  }
  const fetchRandomWord = () => {
    axios({
      method: 'get',
      url: 'https://random-word-api.herokuapp.com/word',
    })
      .then(function (response) {
        const resp = response.data
        const data = resp[0]
        setSometext(data);
        setTimetwo(time);
      })
  }
  return (
    <div className="h-screen bg-slate-400">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-5xl font-bold font-serif pl-5 pt-5 text-red-700">
          TypingPractice
        </div>
        <div className="flex justify-end text-4xl font-bold pr-5 pt-5">
          Time Left: {time} sec
        </div>
      </div>
      <div className="flex justify-end text-4xl font-bold pr-5 pt-5">Score: {score}</div>
      <div className="flex w-full justify-center">
        <div className="text-3xl font-semibold pt-2">{sometext}</div>
      </div>
      <div className="flex w-full justify-center text-3xl pt-3">
        <input type="text" value={userInput} onChange={
          (e) => processInput(e.target.value)
        } ></input>
      </div>
    </div>
  )
}

export default App
