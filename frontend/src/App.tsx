import './App.css'
import { Header, Navigation } from './components'

function App() {

  return (
    <div className="container">
      <Navigation header={<Header />} />
    </div>
  )
}

export default App
