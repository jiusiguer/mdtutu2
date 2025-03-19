import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// 导入页面
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import MidjourneyPage from './pages/MidjourneyPage'
import DallEPage from './pages/DallEPage'
import HistoryPage from './pages/HistoryPage'
import NotFoundPage from './pages/NotFoundPage'

// 导入上下文
import { ApiKeyProvider } from './contexts/ApiKeyContext'
import { HistoryProvider } from './contexts/HistoryContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟应用加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="MDTuTu Logo" className="w-20 h-20 mb-4" />
          <div className="text-xl font-semibold text-white">MDTuTu 加载中...</div>
          <div className="mt-4 w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ApiKeyProvider>
      <HistoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="midjourney" element={<MidjourneyPage />} />
            <Route path="dalle" element={<DallEPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </HistoryProvider>
    </ApiKeyProvider>
  )
}

export default App