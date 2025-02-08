import About from './Sections/About';
import Contacts from './Sections/Contacts';
import Footer from './Sections/Footer';
import Hero from './Sections/Hero';
import Navbar from './Sections/Navbar';
import Projects from './Sections/Projects';

const App = () => {
  return (
     <main className="max-w-7-xl border-2 border-[#7d3cff] bg-black/90 text-white">
      <Navbar/>
       <Hero/>
       <About/>
       <Projects/>
       <Contacts/>
       <Footer/>
     </main>
  )
}

export default App;
