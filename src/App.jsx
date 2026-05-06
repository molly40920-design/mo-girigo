import { useState, useEffect } from 'react'
import LandingView from './components/LandingView'
import SetupView from './components/SetupView'
import ActiveView from './components/ActiveView'
import ResolutionView from './components/ResolutionView'
import { useWager } from './hooks/useWager'

export default function App() {
  const { wager, createWager, resolveSuccess, resolveFail, reset, startSetup } = useWager()
  const [sharedWager, setSharedWager] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const w = params.get('w')
    if (w) {
      try {
        const decoded = decodeURIComponent(atob(w))
        const data = JSON.parse(decoded)
        let phase = data.s
        let result = data.r
        // Deadline check for shared active wagers
        if (phase === 'active' && data.d && Date.now() >= data.d) {
          phase = 'resolution'
          result = 'fail'
        }
        setSharedWager({
          goal: data.g,
          penalty: data.p,
          deadline: data.d,
          createdAt: data.c,
          phase,
          result
        })
      } catch (e) {
        console.error('Invalid shared wager data', e)
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [])

  const hasLocalWager = wager.phase !== 'landing' && wager.phase !== 'setup'

  if (sharedWager) {
    return (
      <div className="min-h-dvh bg-black">
        {sharedWager.phase === 'active' && (
          <ActiveView
            wager={sharedWager}
            isViewer={true}
            hasLocalWager={hasLocalWager}
            onSuccess={() => {}}
            onFail={() => {}}
          />
        )}
        {sharedWager.phase === 'resolution' && (
          <ResolutionView 
            wager={sharedWager} 
            isViewer={true} 
            hasLocalWager={hasLocalWager} 
            onReset={() => {}}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-black">
      {wager.phase === 'landing' && (
        <LandingView onStart={startSetup} />
      )}
      {wager.phase === 'setup' && (
        <SetupView onSubmit={createWager} />
      )}
      {wager.phase === 'active' && (
        <ActiveView
          wager={wager}
          onSuccess={resolveSuccess}
          onFail={resolveFail}
        />
      )}
      {wager.phase === 'resolution' && (
        <ResolutionView wager={wager} onReset={reset} />
      )}
    </div>
  )
}
