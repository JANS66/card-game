import React from "react"

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

  const [cards, setCards] = React.useState(generateCards())

  return (
    <div>
      <h1>Memory Game</h1>

      <pre>{JSON.stringify(cards, null, 2)}</pre>
    </div>
  )
}