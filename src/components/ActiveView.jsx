import { useCountdown } from '../hooks/useCountdown'
import { useState } from 'react'


export default function ActiveView({ wager, onSuccess, onFail }) {
  const { hours, minutes, seconds, isUrgent, totalSec } = useCountdown(
    wager.deadline,
    onFail
  )

  const [showToast, setShowToast] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '決戰對賭協議',
          text: `我立下了對賭協議！\n目標：${wager.goal}\n代價：${wager.penalty}`,
          url: window.location.href
        })
        return
      } catch (err) {
        console.log('Share failed:', err)
      }
    }
    
    // Fallback: show custom toast
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="min-h-dvh bg-black flex items-center justify-center relative overflow-hidden">

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-gray-800/90 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap">
            <span className="text-lg">📸</span>
            <span className="text-sm font-medium tracking-wide">請截圖此畫面分享至限時動態</span>
          </div>
        </div>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${8 + (i * 7.5) % 85}%`,
              top: `${15 + (i * 8.3) % 70}%`,
              animation: `float-particle ${5 + (i % 4) * 2}s ease-in-out ${i * 0.5}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[380px] aspect-[9/16] px-6">

        {/* Top: Goal & Penalty info bar */}
        <div className="w-full mt-6 mb-4 space-y-2 animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
            <p className="text-[10px] text-white/40 tracking-wider uppercase mb-1">⚡ 目標</p>
            <p className="text-white/90 text-sm font-semibold leading-snug break-words line-clamp-2">{wager.goal}</p>
          </div>
          <div className="bg-red-500/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-red-500/10">
            <p className="text-[10px] text-red-400/50 tracking-wider uppercase mb-1">💀 失敗代價</p>
            <p className="text-red-300/80 text-sm font-semibold leading-snug break-words line-clamp-2">{wager.penalty}</p>
          </div>
        </div>

        {/* Center: Countdown + Praying Hands */}
        <div className="flex-1 flex flex-col items-center justify-center">

          {/* Countdown Timer - Geometric/Pixel style */}
          <div className={`text-center mb-8 ${isUrgent ? 'animate-countdown-pulse' : ''}`}>
            <div
              className={`font-mono text-7xl font-extrabold tracking-[0.15em] ${
                isUrgent ? 'text-red-400' : 'text-white'
              }`}
              style={{
                textShadow: isUrgent
                  ? '0 0 30px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.2)'
                  : '0 0 20px rgba(255,255,255,0.1)',
                fontFamily: "'JetBrains Mono', monospace",
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {hours}
              <span className="text-white/30 mx-1">:</span>
              {minutes}
              <span className="text-white/30 mx-1">:</span>
              {seconds}
            </div>
            {isUrgent && (
              <p className="text-red-400/60 text-xs mt-3 animate-pulse tracking-wider">
                ⚠️ 時間快到了
              </p>
            )}
          </div>

          {/* Praying Hands */}
          <div className="animate-float">
            <img
              src="/praying_hands.png"
              alt="🙏"
              className="w-44 h-44 object-contain select-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>

        {/* Bottom: Action buttons */}
        <div className="w-full pb-8 space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>

          {/* Share button */}
          <button
            id="btn-share"
            onClick={handleShare}
            className="w-full py-3.5 rounded-xl bg-white/8 border border-white/15 text-white font-bold text-sm tracking-wider hover:bg-white/12 hover:border-white/25 active:scale-[0.98] transition-all cursor-pointer backdrop-blur-sm"
          >
            📸 分享合約至限動
          </button>

          {/* Success button */}
          <button
            id="btn-success"
            onClick={onSuccess}
            className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-sm tracking-wider hover:bg-emerald-500/20 hover:border-emerald-500/40 active:scale-[0.98] transition-all cursor-pointer"
          >
            ✅ 我已達成目標
          </button>

          {/* Give up */}
          <button
            id="btn-giveup"
            onClick={onFail}
            className="w-full py-2 text-white/25 text-xs font-medium hover:text-red-400/60 transition-colors cursor-pointer"
          >
            我放棄...
          </button>
        </div>
      </div>
    </div>
  )
}
