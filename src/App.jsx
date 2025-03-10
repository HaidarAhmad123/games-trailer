
import About from './components/About'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Motion  from './components/Motion'

function App() {

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">   
  <Hero/>
  <About/>
  <NavBar/>
  <Features/>
  <Story/>
  <Motion/>
  <Contact/>
  <Footer/>
    </main>
  )
}

export default App
