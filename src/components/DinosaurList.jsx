import { useDinosaurs } from '../context/DinosaurContext'
import DinosaurCard from './DinosaurCard'

function DinosaurList() {
  const { dinosaurs, loading, error } = useDinosaurs()

  if (loading) {
    return (
      <section className="records-section">
        <p className="status-message">Loading dinosaur records...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="records-section">
        <p className="status-message error-message">{error}</p>
      </section>
    )
  }

  return (
    <section className="records-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Database Collection</p>
          <h2>Dinosaur Records</h2>
        </div>

        <span className="record-count">
          {dinosaurs.length}{' '}
          {dinosaurs.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      {dinosaurs.length === 0 ? (
        <p className="status-message">
          No dinosaurs have been added yet.
        </p>
      ) : (
        <div className="dinosaur-grid">
          {dinosaurs.map((dinosaur) => (
            <DinosaurCard
              key={dinosaur.id}
              dinosaur={dinosaur}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default DinosaurList