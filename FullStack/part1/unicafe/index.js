import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);

const Statistics  = (props) => {
  if (props.score.good === 0 && props.score.neutral === 0 && props.score.bad === 0) {
    return (
      <div>No feedback yet</div>
    )
  }

return (
  <table>
    <tbody>
      <Statistic text="good" value ={props.score.good} />
      <Statistic text="neutral" value ={props.score.neutral} />
      <Statistic text="bad" value ={props.score.bad} />
      <Statistic text='all' value={props.score.good + props.score.neutral + props.score.bad} />
      <Statistic text='average' value={(props.score.good - props.score.bad) / (props.score.good + props.score.neutral + props.score.bad)} />
      <Statistic text='positive' value={props.score.good / (props.score.good + props.score.neutral + props.score.bad) * 100 } />
    </tbody>
  </table>
)};

const Statistic = ({text, value}) => {
  if (text === 'positive') {
    return <tr><td>{text}: {value} %</td></tr>
  }
  return (
    <tr><td>{text}: {value} </td></tr>
  )
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const goodSetting = () => {
    setGood(good + 1);
    setScore({...score, good: score.good + 1});
  };

  const neutralSetting = () => {
    setNeutral(neutral + 1);
    setScore({...score, neutral: score.neutral + 1});
  };

  const badSetting = () => {
    setBad(bad + 1);
    setScore({...score, bad: score.bad + 1});
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodSetting} text='good'/>
      <Button onClick={neutralSetting} text='neutral'/>
      <Button onClick={badSetting} text='bad'/>
      <h1>statistics</h1>
      <Statistics  score={score}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
