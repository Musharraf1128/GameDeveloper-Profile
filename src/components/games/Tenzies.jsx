import Die from "./Die"
import React from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from "react-use" 
import Confetti from "react-confetti"
import "./Tenzies.css"

export default function Tenzies() { 
    const [dice, setDice] = React.useState(() => generateAllNewDice()) // so that react does not execute this function every render
    const {width, height} = useWindowSize()

    let gameWon =  dice.every(die => die.isHeld) &&  dice.every(die => die.value === dice[0].value)

    function generateAllNewDice() {
        return new Array(10)
                .fill(0)
                .map(() => ({
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                }))
    }

    function rollDice(event) {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die => 
                die.isHeld ? 
                    die : 
                    {...die, value: Math.ceil(Math.random() * 6)}
            ))
        } else { 
            setDice(generateAllNewDice())
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die => (
            die.id === id ? 
                {...die, isHeld: !die.isHeld}: 
                die
        )))
    }

    let diceComponent = dice.map(dieObj => (
        <Die 
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />)
    )

    return (
        
        <main>

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
            <div className="dice-container">
               {diceComponent}
            </div>

            <button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>

            {gameWon && <Confetti 
                width={width}
                height={height}
            />}
        </main>
    )
}

