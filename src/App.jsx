import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import Header from './components/Header'
import Footer from './components/Footer'
import ApiKeyModal from './components/ApiKeyModal'
import Home from './pages/Home'
import MidjourneyPage from './pages/MidjourneyPage'
import DalleGeneration from './pages/DalleGeneration'
import TaskHistory from './pages/TaskHistory'
import Settings from './pages/Settings'
import { getApiKey, setApiKey } from './utils/storage'

function App() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const apiKey = getApiKey()
  const location = useLocation()
  const navigate = useNavigate()

  // 检查是否设置了API密钥
  useEffect(() => {
    if (!apiKey && location.pathname !== '/') {
      setIsApiKeyModalOpen(true)
    }
  }, [apiKey, location])

  const handleApiKeySave = (key) => {
    setApiKey(key)
    setIsApiKeyModalOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        openApiKeyModal={() => setIsApiKeyModalOpen(true)} 
        hasApiKey={!!apiKey}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/midjourney" element={<MidjourneyPage />} />
          <Route path="/dalle" element={<DalleGeneration />} />
          <Route path="/history" element={<TaskHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <Footer />

      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => {
          setIsApiKeyModalOpen(false)
          if (!apiKey && location.pathname !== '/') {
            navigate('/')
          }
        }}
        onSave={handleApiKeySave}
        initialValue={apiKey || ''}
      />
    </div>
  )
}

export default App
