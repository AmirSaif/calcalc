export default function Hero() {
  return (
    // <div className="w-full py-20 px-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="w-full py-20 px-6">
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">What is BMR and Calorie Calculation?</h1>
        <p className="text-lg mb-4">
          Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at rest to maintain vital functions like breathing, circulation, and cell production.
        </p>
        <p className="text-lg mb-4">
          We use the <strong>Mifflin-St Jeor Equation</strong> to estimate your BMR, and then multiply it by your activity level to estimate your daily calorie needs.
        </p>
        <p className="text-md italic">
          <strong>BMR Formula (Mifflin-St Jeor):</strong><br />
          For men: <code>10 × weight + 6.25 × height - 5 × age + 5</code><br />
          For women: <code>10 × weight + 6.25 × height - 5 × age - 161</code>
        </p>
      </div>
    </div>
  );
}
