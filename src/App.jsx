
import './App.css'
import './App.css'
import DinosaurForm from './components/DinosaurForm'
import DinosaurList from './components/DinosaurList'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />

      <main className="page-container">
        <DinosaurForm />
        <DinosaurList />
      </main>

      <footer className="site-footer">
        <p>Copyright © 2023 Dino Archive.</p>
      </footer>
    </>
  )
}

export default App