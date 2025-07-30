import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Upload, Music } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-black w-screen">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">Spotify DAM</span>
            </div>
            
            {/* <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'dashboard' 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentPage('assets')}
                className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'assets' 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Assets
              </button>
            </div> */}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              // onClick={() => setShowUploadModal(true)}
              className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 text-black font-semibold text-sm hover:scale-105"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-full mx-auto p-6">
        <Dashboard />
      </div>
      
    </div>
  )
}

export default App
