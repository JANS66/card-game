import React from "react"
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
    setCards(previousCards =>
      previousCards.map(card =>
        card.id === id && !card.isMatched
          ? {...card, isFlipped: !card.isFlipped}
          : card
      )
    )
  }

  const [cards, setCards] = React.useState(() => shuffleArray(generateCards()))

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