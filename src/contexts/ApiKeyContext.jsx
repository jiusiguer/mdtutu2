import { createContext, useState, useContext, useEffect } from 'react'

const ApiKeyContext = createContext()

export const useApiKey = () => useContext(ApiKeyContext)

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('')
  const [isKeyValid, setIsKeyValid] = useState(false)
  
  // 从本地存储加载API密钥
  useEffect(() => {
    const savedApiKey = localStorage.getItem('mdtutu_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setIsKeyValid(true) // 假设保存的密钥有效，实际应用中可能需要验证
    }
  }, [])
  
  // 设置新的API密钥
  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('mdtutu_api_key', key)
    setIsKeyValid(!!key)
  }
  
  // 清除API密钥
  const clearApiKey = () => {
    setApiKey('')
    localStorage.removeItem('mdtutu_api_key')
    setIsKeyValid(false)
  }
  
  // 验证API密钥
  const validateApiKey = async (key) => {
    try {
      // 这里可以实现一个简单的验证逻辑，例如发送测试请求
      // 目前假设所有非空密钥都有效
      const isValid = !!key
      setIsKeyValid(isValid)
      return isValid
    } catch (error) {
      console.error('API密钥验证失败', error)
      setIsKeyValid(false)
      return false
    }
  }
  
  return (
    <ApiKeyContext.Provider value={{ 
      apiKey, 
      isKeyValid, 
      saveApiKey, 
      clearApiKey,
      validateApiKey 
    }}>
      {children}
    </ApiKeyContext.Provider>
  )
}