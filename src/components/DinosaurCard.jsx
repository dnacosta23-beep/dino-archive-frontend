function DinosaurCard({ dinosaur }) {
  return (
    <article className="dinosaur-card">
      <div className="card-heading">
        <div>
          <h3>{dinosaur.name}</h3>
          <p className="species-name">{dinosaur.species}</p>
        </div>

        <span
          className={`diet-badge ${dinosaur.diet.toLowerCase()}`}
        >
          {dinosaur.diet}
        </span>
      </div>

      <dl className="dinosaur-details">
        <div>
          <dt>Period</dt>
          <dd>{dinosaur.period}</dd>
        </div>

        <div>
          <dt>Fossil region</dt>
          <dd>{dinosaur.location}</dd>
        </div>
      </dl>

      <p className="dinosaur-description">
        {dinosaur.description}
      </p>
    </article>
  )
}

export default DinosaurCard