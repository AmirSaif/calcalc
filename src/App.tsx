import Hero from './components/Hero';
import BMRForm from './components/BMRform';

export default function App() {
  return (
    <main className="scroll-smooth bg-gradient-to-b from-purple-600 via-pink-400 to-yellow-200">
      <section className="">
        <Hero />
      </section>

      <section className="min-h-screen">
        <BMRForm />
      </section>
    </main>
  );
}