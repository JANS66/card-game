export default function Card(properties) {
    return (
        <div
            className={`card ${properties.card.isFlipped || properties.card.isMatched ? `flipped` : ``}`}
            onClick={() => properties.handleClick(properties.card.id)}
        >
            {properties.card.isFlipped || properties.card.isMatched ? (
                <span className="card-value">{properties.card.value}</span>
            ) : (
                <span className="card-value">❓</span>
            )}
        </div>
    )
}