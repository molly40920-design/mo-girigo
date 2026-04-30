import { useState } from 'react'

const DURATION_OPTIONS = [
  { label: '1 小時', hours: 1 },
  { label: '12 小時', hours: 12 },
  { label: '24 小時', hours: 24 },
]

export default function SetupView({ onSubmit }) {
  const [goal, setGoal] = useState('')
  const [penalty, setPenalty] = useState('')
  const [selectedHours, setSelectedHours] = useState(null)

  const isValid = goal.trim() && penalty.trim() && selectedHours !== null

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit(goal.trim(), penalty.trim(), selectedHours)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 animate-fade-in-up">
      {/* Card Container - 9:16 aspect ratio for IG Story */}
      <div className="w-full max-w-[380px] aspect-[9/16] bg-gray-900/80 border border-yellow-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm animate-border-glow">

        {/* Header */}
        <div className="pt-8 pb-4 px-6 text-center border-b border-yellow-500/20">
          <div className="text-yellow-400/60 text-xs tracking-[0.3em] uppercase font-medium mb-2">
            Social Wager
          </div>
          <h1 className="text-2xl font-black text-yellow-400 tracking-tight">
            立下你的對賭協議
          </h1>
          <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto" />
        </div>

        {/* Form Body */}
        <div className="flex-1 flex flex-col justify-center px-6 py-6 gap-5">

          {/* Goal Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-yellow-400/80 tracking-wider uppercase flex items-center gap-2">
              我的目標是...
            </label>
            <textarea
              id="input-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="例如：今晚12點前寫完企劃"
              rows={3}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/30 transition-all resize-none"
            />
          </div>

          {/* Penalty Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-red-400/80 tracking-wider uppercase flex items-center gap-2">
              如果失敗，我願意...
            </label>
            <textarea
              id="input-penalty"
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
              placeholder="例如：請按讚的人喝星巴克"
              rows={3}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-all resize-none"
            />
          </div>

          {/* Duration Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase flex items-center gap-2">
              設定期限
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map(opt => (
                <button
                  key={opt.hours}
                  id={`duration-${opt.hours}`}
                  onClick={() => setSelectedHours(opt.hours)}
                  className={`py-2.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer border ${
                    selectedHours === opt.hours
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-lg shadow-yellow-500/10'
                      : 'bg-gray-800/40 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-8">
          <button
            id="btn-create"
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-4 rounded-xl text-base font-black tracking-wider transition-all duration-300 cursor-pointer ${
              isValid
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-950 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
            }`}
          >
            {isValid ? '產生對賭合約' : '請填寫完整資訊'}
          </button>
        </div>
      </div>
    </div>
  )
}
