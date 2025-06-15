'use client';

import { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const activityLevels = [
  { label: 'Sedentary (little or no exercise)', value: '1.2' },
  { label: 'Light (1–3 days/week)', value: '1.375' },
  { label: 'Moderate (3–5 days/week)', value: '1.55' },
  { label: 'Active (6–7 days/week)', value: '1.725' },
  { label: 'Very Active (twice daily or physical job)', value: '1.9' },
];

export default function BMRForm() {
  const [selectedActivity, setSelectedActivity] = useState(activityLevels[0].value);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  const clearForm = () => {
    setFlipDirection('vertical');
    setFlipped(true);
    setTimeout(() => {
      setAge('');
      setWeight('');
      setHeight('');
      setSelectedActivity(activityLevels[0].value);
      setSex('male');
      setUnitSystem('metric');
      setResult(null);
      setIsFlipped(false);
      setFlipped(false);
    }, 800);
  };

  const handleSubmit = async () => {
    if (!age || !weight || !height) return;

    const payload = {
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      sex,
      activityFactor: parseFloat(selectedActivity),
      unitSystem,
    };

    try {
      const res = await fetch('https://caloriecalculator-nncw.onrender.com/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult(data.totalCalories);
      setFlipDirection('horizontal');
      setIsFlipped(true);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <motion.div
        className="relative w-full max-w-md"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={
            flipped
              ? { rotateX: 180 }
              : { rotateY: isFlipped ? 180 : 0, rotateX: 0 }
          }
          transition={{ duration: 0.8 }}
          style={{
            transformStyle: 'preserve-3d',
            minHeight: '100%',
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Calculate Your Calories</h2>

              {/* Sex */}
              <div className="mb-4">
                <label className="block font-medium mb-2 text-white">Sex</label>
                <RadioGroup.Root
                  className="flex gap-4"
                  value={sex}
                  onValueChange={(val) => setSex(val as 'male' | 'female')}
                >
                  {['male', 'female'].map((option) => (
                    <RadioGroup.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 rounded-md bg-white/30 text-white cursor-pointer data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              </div>

              {/* Units */}
              <div className="mb-4">
                <label className="block font-medium mb-2 text-white">Units</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-4 py-2 rounded-md ${unitSystem === 'metric'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/30 text-white'
                      }`}
                  >
                    Metric (kg/cm)
                  </button>
                  <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-4 py-2 rounded-md ${unitSystem === 'imperial'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/30 text-white'
                      }`}
                  >
                    Imperial (lb/in)
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <input
                type="number"
                placeholder="Age (years)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mb-4 p-3 rounded-md bg-white/30 placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="number"
                placeholder={`Weight (${unitSystem === 'metric' ? 'kg' : 'lb'})`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full mb-4 p-3 rounded-md bg-white/30 placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="number"
                placeholder={`Height (${unitSystem === 'metric' ? 'cm' : 'in'})`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full mb-4 p-3 rounded-md bg-white/30 placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              {/* Activity */}
              <div className="mb-6 relative z-10">
                <label className="block mb-2 font-medium opacity-70">Activity Level</label>
                <Select.Root value={selectedActivity} onValueChange={setSelectedActivity}>
                  <Select.Trigger
                    className="w-full inline-flex items-center justify-between rounded-md bg-purple-100/30 px-4 py-2 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-md opacity-70"
                    aria-label="Activity level"
                  >
                    <Select.Value placeholder="Select activity level" />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content
                      className="z-50 mt-2 w-full rounded-md bg-white/90 shadow-xl ring-1 ring-black/10 backdrop-blur-md"
                      position="popper"
                    >
                      <Select.ScrollUpButton className="flex items-center justify-center text-purple-500 bg-purple-50">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>

                      <Select.Viewport className="p-1">
                        {activityLevels.map((level) => (
                          <Select.Item
                            key={level.value}
                            value={level.value}
                            className="cursor-pointer select-none px-4 py-2 rounded text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-900 focus:bg-purple-200"
                          >
                            <Select.ItemText>{level.label}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>

                      <Select.ScrollDownButton className="flex items-center justify-center text-purple-500 bg-purple-50">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3 rounded-lg shadow-lg transition-all text-white"
                >
                  Calculate
                </button>

                <button
                  className="text-sm opacity-70 underline"
                  onClick={clearForm}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center p-8"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-8 w-full">
              <h3 className="text-xl font-bold mb-4">Estimated Daily Calories</h3>
              <p className="text-4xl font-semibold mb-6">{result} kcal</p>
              <button
                onClick={() => {
                  setIsFlipped(false);
                  clearForm();
                }}
                className="bg-purple-600 hover:bg-purple-700 font-semibold px-4 py-2 rounded-lg"
              >
                Re-Evaluate
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
