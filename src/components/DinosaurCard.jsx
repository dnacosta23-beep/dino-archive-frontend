import { useState } from 'react'
import { useDinosaurs } from '../context/DinosaurContext'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from "sweetalert2";

function DinosaurCard({ dinosaur }) {
  const { updateDinosaur, deleteDinosaur } = useDinosaurs()

  const [isEditing, setIsEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const [editData, setEditData] = useState({
    name: dinosaur.name,
    species: dinosaur.species,
    diet: dinosaur.diet,
    period: dinosaur.period,
    location: dinosaur.location,
    description: dinosaur.description,
  })

  function handleChange(event) {
    const { name, value } = event.target

    setEditData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleStartEditing() {
    setEditData({
      name: dinosaur.name,
      species: dinosaur.species,
      diet: dinosaur.diet,
      period: dinosaur.period,
      location: dinosaur.location,
      description: dinosaur.description,
    })

    setError('')
    setIsEditing(true)
  }

  function handleCancel() {
    setEditData({
      name: dinosaur.name,
      species: dinosaur.species,
      diet: dinosaur.diet,
      period: dinosaur.period,
      location: dinosaur.location,
      description: dinosaur.description,
    })

    setError('')
    setIsEditing(false)
  }

  async function handleUpdate(event) {
    event.preventDefault()

    try {
      setSubmitting(true)
      setError('')

      await updateDinosaur(dinosaur.id, editData)

      setIsEditing(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

 async function handleDelete() {
    const result = await Swal.fire({
        title: "Delete Dinosaur?",
        text: `Are you sure you want to delete ${dinosaur.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8a493b",
        cancelButtonColor: "#6b7045",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
        return;
    }

    try {
        setDeleting(true);
        setError("");

        await deleteDinosaur(dinosaur.id);

    } catch (error) {
        setError(error.message);
        setDeleting(false);
    }
}

  if (isEditing) {
    return (
      <article className="dinosaur-card edit-card">
        <form className="edit-form" onSubmit={handleUpdate}>
          <div className="form-field">
            <label htmlFor={`name-${dinosaur.id}`}>
              Common name
            </label>

            <input
              id={`name-${dinosaur.id}`}
              name="name"
              type="text"
              value={editData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor={`species-${dinosaur.id}`}>
              Species name
            </label>

            <input
              id={`species-${dinosaur.id}`}
              name="species"
              type="text"
              value={editData.species}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor={`diet-${dinosaur.id}`}>
              Diet
            </label>

            <select
              id={`diet-${dinosaur.id}`}
              name="diet"
              value={editData.diet}
              onChange={handleChange}
              required
            >
              <option value="Herbivore">Herbivore</option>
              <option value="Carnivore">Carnivore</option>
              <option value="Omnivore">Omnivore</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor={`period-${dinosaur.id}`}>
              Geological period
            </label>

            <input
              id={`period-${dinosaur.id}`}
              name="period"
              type="text"
              value={editData.period}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor={`location-${dinosaur.id}`}>
              Fossil region
            </label>

            <input
              id={`location-${dinosaur.id}`}
              name="location"
              type="text"
              value={editData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor={`description-${dinosaur.id}`}>
              Description
            </label>

            <textarea
              id={`description-${dinosaur.id}`}
              name="description"
              value={editData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          {error && (
            <p className="form-message form-error">
              {error}
            </p>
          )}

          <div className="card-actions">
            <button
              className="save-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              className="cancel-button"
              type="button"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </article>
    )
  }

  return (
    <article className="dinosaur-card">
      <div className="card-heading">
        <div>
          <h3>{dinosaur.name}</h3>

          <p className="species-name">
            {dinosaur.species}
          </p>
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

      {error && (
        <p className="form-message form-error">
          {error}
        </p>
      )}

      <div className="card-actions">
        <button
          className="edit-button"
          type="button"
          onClick={handleStartEditing}
          disabled={deleting}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={handleDelete}
          disabled={deleting}
        >
          <FaTrash />
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  )
}

export default DinosaurCard