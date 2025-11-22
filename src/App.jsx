import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card'
import { GameHeader } from './components/GameHeader'
import { WinMessage } from './components/WinMessage'
import { useGameLogic } from './hooks/useGameLogic'

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
]

function App() {
  const { cards, handleCardClick, score, moves, initializeGame, isGameCompleted }
    = useGameLogic(cardValues);
  return (
    <>
      <div className='app'>
        <GameHeader score={score} moves={moves} onReset={initializeGame} />
        {isGameCompleted && <WinMessage moves={moves} />}
        <div className='cards-grid'>
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => handleCardClick(card)} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
