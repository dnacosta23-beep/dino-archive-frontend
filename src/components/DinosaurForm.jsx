import { useState } from 'react'
import { useDinosaurs } from '../context/DinosaurContext'
import toast from 'react-hot-toast'
import { FaPlus } from "react-icons/fa";

const emptyForm = {
  name: '',
  species: '',
  diet: 'Herbivore',
  period: '',
  location: '',
  description: '',
}

function DinosaurForm() {
  const { createDinosaur } = useDinosaurs()

  const [formData, setFormData] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSubmitting(true)
      setMessage('')
      setFormError('')

      const createdDinosaur = await createDinosaur(formData)

toast.success(`${createdDinosaur.name} was added to the archive!`)

setFormData(emptyForm)
  } catch (error) {
    setFormError(error.message)
    toast.error(error.message)
  } finally { 
      setSubmitting(false)
    }
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">New Discovery</p>
          <h2>Add a Dinosaur</h2>
        </div>
      </div>

      <p className="form-introduction">
        Enter the information below to save a new dinosaur
        record in the SQL database.
      </p>

      <form className="dinosaur-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Common name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Allosaurus"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="species">Species name</label>
            <input
              id="species"
              name="species"
              type="text"
              value={formData.species}
              onChange={handleChange}
              placeholder="Example: Allosaurus fragilis"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="diet">Diet</label>
            <select
              id="diet"
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              required
            >
              <option value="Herbivore">Herbivore</option>
              <option value="Carnivore">Carnivore</option>
              <option value="Omnivore">Omnivore</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="period">Geological period</label>
            <input
              id="period"
              name="period"
              type="text"
              value={formData.period}
              onChange={handleChange}
              placeholder="Example: Late Jurassic"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="location">Fossil region</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Example: Western North America"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description of the dinosaur."
            rows="5"
            required
          />
        </div>

        {formError && (
          <p className="form-message form-error">{formError}</p>
        )}

        <button
    className="submit-button"
    type="submit"
    disabled={submitting}
>
    <FaPlus />

    {" "}

    {submitting ? "Saving Record..." : "Add Dinosaur"}
</button>
      </form>
    </section>
  )
}

export default DinosaurForm