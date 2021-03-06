import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, txt}) => (<button onClick={onClick}>{txt}</button>);

const Title = (props) => (<h1>{props.title}</h1>);

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const setNext = () => {setSelected(Math.floor(Math.random() * props.anecdotes.length))};
  const [voteNum, setVote] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))
  const showVotes = () => {
    if (voteNum[selected] > 0) return <div>has {voteNum[selected]} votes</div>
  }
  const vote = () => {
    const copy = [...voteNum]
    copy[selected] += 1
    setVote(copy)
  }

  const mostVoted = () => {
    const maxVal = Math.max(...voteNum)
    if (maxVal > 0) {
      const maxInd = voteNum.indexOf(maxVal)
      return (
        <>
        <Title title='Anecdote with most votes'/>
        <div>
          <div>{props.anecdotes[maxInd]}</div>
          <div>has {maxVal} votes</div>
        </div>
        </>
      )
    }
  }

  return (
    <>
      <Title title='Anecdote of the day'/>
      {props.anecdotes[selected]}
      {showVotes()}
      <div class='btn-group'>
        <Button onClick={vote} txt='vote'/>
        <Button onClick={setNext} txt='next anecdote'/>
      </div>
      
      {mostVoted()}
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
