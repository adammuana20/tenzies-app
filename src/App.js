import React, { useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)

      if(allHeld && allSameValue) {
        setTenzies(true)
        console.log("You Won!")
      }
    }, [dice])
  
  function generateNewDie() {
    return {
      id     : nanoid(),
      value   : Math.ceil(Math.random() * 6), 
      isHeld  : false,
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld === false
          ? generateNewDie()
          : die
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const diceElements = dice.map(die => 
    <Die id={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  )

  function holdDice(id) {
    setDice(oldDice => oldDice.map(
      die => {
        return die.id === id 
          ? {...die, isHeld : !die.isHeld}
          : die
      }
    ))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        onClick={rollDice}
        className="roll-dice"
      >
        {tenzies ? "New Game" : "Roll"}
      </button>

    </main>
  )
}