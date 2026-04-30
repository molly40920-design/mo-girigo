import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'social-wager-data'

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

const saveState = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useWager = () => {
  const [wager, setWager] = useState(() => {
    const saved = loadState()
    if (!saved) return { phase: 'landing', goal: '', penalty: '', deadline: null, result: null }
    // Check if deadline passed while away
    if (saved.phase === 'active' && saved.deadline && Date.now() >= saved.deadline) {
      return { ...saved, phase: 'resolution', result: 'fail' }
    }
    return saved
  })

  useEffect(() => {
    saveState(wager)
  }, [wager])

  const createWager = useCallback((goal, penalty, hours) => {
    setWager({
      phase: 'active',
      goal,
      penalty,
      deadline: Date.now() + hours * 3600 * 1000,
      result: null,
      createdAt: Date.now(),
    })
  }, [])

  const startSetup = useCallback(() => {
    setWager(prev => ({ ...prev, phase: 'setup' }))
  }, [])

  const resolveSuccess = useCallback(() => {
    setWager(prev => ({ ...prev, phase: 'resolution', result: 'success' }))
  }, [])

  const resolveFail = useCallback(() => {
    setWager(prev => ({ ...prev, phase: 'resolution', result: 'fail' }))
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setWager({ phase: 'landing', goal: '', penalty: '', deadline: null, result: null })
  }, [])

  return { wager, createWager, resolveSuccess, resolveFail, reset, startSetup }
}
