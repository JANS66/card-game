import React, { useState } from "react"
import Card from "./components/Card.jsx"
import "./App.css"

export default function App() {
  const generateCards = () => {
    const emojiValues = [`🐶`, `🐱`, `🐸`, `🐼`, `🦊`, `🐵`]
    const pairedCards = [...emojiValues, ...emojiValues]

    return pairedCards.map((value, index) => ({
      id: index + 1,
      value: value,
      isFlipped: false,
      isMatched: false
    }))
  }

  const shuffleArray = array => {
    return array
      // Give every item a random `sortKey`
      .map(item => ({ ...item, sortKey: Math.random() }))
      // Sort the array based on that random key
      .sort((a, b) => a.sortKey - b.sortKey)
      // Remove the temporary key before returning
      .map(item => {
        delete item.sortKey
        return item
      })
  }

  const handleClick = id => {
    if (disableClicks) return
    if (flippedCards.includes(id)) return

    const newFlipped = [...flippedCards, id]

    setCards(previousCards =>
      previousCards.map(card =>
        card.id === id ? {...card, isFlipped: true} : card 
      )
    )

    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setDisableClicks(true)
      checkForMatch(newFlipped)
    }
  }

  const checkForMatch = ([id1, id2]) => {
    const card1 = cards.find(card => card.id === id1)
    const card2 = cards.find(card => card.id === id2)

    if (card1.value === card2.value) {
      setTimeout(() => {
        setCards(previousCards =>
          previousCards.map(card =>
            card.value === card1.value ? {...card, isMatched: true} : card
          )
        )
        setFlippedCards([])
        setDisableClicks(false)
      }, 500)
    } else {
      setTimeout(() => {
        setCards(previousCards =>
          previousCards.map(card =>
            card.id === id1 || card.id === id2
              ? {...card, isFlipped: false}
              : card
          )
        )
        setFlippedCards([])
        setDisableClicks(false)
      }, 1000)
    }
  }

  const [cards, setCards] = React.useState(() => shuffleArray(generateCards()))
  const [flippedCards, setFlippedCards] = useState([])
  const [disableClicks, setDisableClicks] = useState(false)

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  )
}