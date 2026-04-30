import LandingView from './components/LandingView'
import SetupView from './components/SetupView'
import ActiveView from './components/ActiveView'
import ResolutionView from './components/ResolutionView'
import { useWager } from './hooks/useWager'

export default function App() {
  const { wager, createWager, resolveSuccess, resolveFail, reset, startSetup } = useWager()

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
