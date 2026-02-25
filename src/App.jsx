import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import CV from './components/CV';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <CV />
      </main>
      <Footer />
    </>
  );
}
