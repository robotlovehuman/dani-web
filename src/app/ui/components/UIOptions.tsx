"use client"

import { useState } from 'react';
import { AlertCircle, Check, ChevronDown, X } from 'lucide-react';

export default function UIOptions() {
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">UI Options</h1>

      {/* Theme Colors Section */}
      <section className="retro-panel mb-6">
        <h2 className="text-xl font-bold mb-4">Theme Colors</h2>
        
        {/* Main Colors */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Primary Color */}
          <div className="space-y-2">
            <h3 className="font-bold">Primary Color</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[var(--c64-brown)] rounded border-2 border-[var(--c64-dark)]"></div>
              <code className="text-sm">#8b5e34</code>
            </div>
            <button className="w-full retro-button">
              Primary Button
            </button>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <h3 className="font-bold">Secondary Color</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[var(--c64-secondary)] rounded border-2 border-[var(--c64-dark)]"></div>
              <code className="text-sm">#346b8b</code>
            </div>
            <button className="w-full px-4 py-2 bg-[var(--c64-secondary)] text-[var(--c64-light)] 
                             border-2 border-[var(--c64-dark)] font-bold">
              Secondary Button
            </button>
          </div>
        </div>

        {/* Status Colors */}
        <div className="grid grid-cols-2 gap-6">
          {/* Success Color */}
          <div className="space-y-2">
            <h3 className="font-bold">Success Color</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[var(--status-success)] rounded border-2 border-[var(--c64-dark)]"></div>
              <code className="text-sm">#5a7152</code>
            </div>
            <button className="w-full px-4 py-2 bg-[var(--status-success)] text-[var(--c64-light)] 
                             border-2 border-[var(--c64-dark)] font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Success Button
            </button>
          </div>

          {/* Fail Color */}
          <div className="space-y-2">
            <h3 className="font-bold">Fail Color</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[var(--status-fail)] rounded border-2 border-[var(--c64-dark)]"></div>
              <code className="text-sm">#8b3434</code>
            </div>
            <button className="w-full px-4 py-2 bg-[var(--status-fail)] text-[var(--c64-light)] 
                             border-2 border-[var(--c64-dark)] font-bold flex items-center justify-center gap-2">
              <X className="w-4 h-4" />
              Fail Button
            </button>
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="retro-panel mb-6">
        <h2 className="text-xl font-bold mb-4">Alerts & Dialogs</h2>
        <div className="space-y-4">
          <button 
            onClick={() => setShowAlert(!showAlert)}
            className="retro-button"
          >
            Toggle Alert
          </button>
          
          {showAlert && (
            <div className="p-4 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[var(--c64-brown)]" />
              <p>This is an alert message!</p>
              <button 
                onClick={() => setShowAlert(false)}
                className="ml-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <button 
            onClick={() => setShowDialog(true)}
            className="retro-button"
          >
            Open Dialog
          </button>

          {showDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="retro-panel max-w-md w-full">
                <h3 className="text-lg font-bold mb-4">Dialog Title</h3>
                <p className="mb-4">This is a dialog message with some content.</p>
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 bg-[var(--c64-light)] text-[var(--c64-brown)] 
                             border-2 border-[var(--c64-brown)] font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowDialog(false)}
                    className="retro-button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Form Controls Section */}
      <section className="retro-panel mb-6">
        <h2 className="text-xl font-bold mb-4">Form Controls</h2>
        
        {/* Radio Buttons */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Radio Buttons</h3>
          <div className="space-y-2">
            {['option1', 'option2', 'option3'].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-group"
                  value={option}
                  checked={selectedRadio === option}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                  className="w-4 h-4 accent-[var(--c64-brown)]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dropdown */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Dropdown</h3>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full p-2 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded 
                         flex items-center justify-between"
            >
              <span>{selectedOption}</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-[var(--c64-light)] 
                            border-2 border-[var(--c64-brown)] rounded">
                {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                  <button
                    key={option}
                    className="w-full p-2 text-left hover:bg-[var(--c64-tan)]"
                    onClick={() => {
                      setSelectedOption(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Toggle Switch</h3>
          <button
            onClick={() => setSwitchEnabled(!switchEnabled)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 
                       ${switchEnabled ? 'bg-[var(--c64-brown)]' : 'bg-[var(--c64-secondary)]'}`}
          >
            <div className={`w-6 h-6 rounded-full bg-[var(--c64-light)] border-2 border-[var(--c64-dark)]
                            transition-transform duration-200 
                            ${switchEnabled ? 'translate-x-6' : 'translate-x-0'}`} 
            />
          </button>
        </div>

        {/* Slider */}
        <div>
          <h3 className="font-bold mb-2">Slider</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="w-full accent-[var(--c64-brown)]"
          />
          <div className="text-center mt-2">Value: {sliderValue}</div>
        </div>
      </section>
    </div>
  );
} 