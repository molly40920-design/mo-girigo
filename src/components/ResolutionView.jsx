import { useState } from 'react'

export default function ResolutionView({ wager, onReset, isViewer = false, hasLocalWager = false }) {
  const isSuccess = wager.result === 'success'

  const [showToast, setShowToast] = useState(false)

  const handleShare = async () => {
    let shareUrl = window.location.href;
    if (!isViewer) {
      const url = new URL(window.location.href);
      const data = {
        g: wager.goal,
        p: wager.penalty,
        d: wager.deadline,
        c: wager.createdAt,
        s: wager.phase,
        r: wager.result
      };
      url.searchParams.set('w', btoa(encodeURIComponent(JSON.stringify(data))));
      shareUrl = url.toString();
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: '決戰對賭協議',
          text: isSuccess 
            ? `我成功達成了目標：「${wager.goal}」！\n這就是自律的實力！`
            : `我挑戰失敗了... \n目標：「${wager.goal}」\n我會乖乖兌現代價：「${wager.penalty}」`,
          url: shareUrl
        })
        return
      } catch (err) {
        console.log('Share failed:', err)
      }
    }
    
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const formatDate = (ts) => {
    if (!ts) return ''
    const d = new Date(ts)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 animate-fade-in-up">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
            <div className="bg-gray-800/90 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap">

              <span className="text-sm font-medium tracking-wide">請截圖此畫面分享至限時動態</span>
            </div>
          </div>
        )}
        <div className="w-full max-w-[380px] aspect-[9/16] bg-gradient-to-b from-emerald-950/90 to-gray-950/95 border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm animate-border-glow-green relative">


          {/* Header */}
          <div className="pt-10 pb-4 px-6 text-center relative z-10">

            <h2 className="text-3xl font-black text-emerald-400 tracking-tight">
              挑戰成功！
            </h2>
            <p className="text-emerald-300/60 text-sm mt-2">
              你做到了，真正的自律者
            </p>
          </div>

          {/* Certificate Card */}
          <div className="flex-1 flex flex-col justify-center px-6 relative z-10">
            <div className="bg-gray-900/70 rounded-2xl p-6 border border-emerald-500/20 shadow-xl relative">
              {/* Stamp */}
              <div className="absolute -top-3 -right-2 text-emerald-500/30 text-6xl font-black rotate-[-12deg] animate-stamp-in select-none pointer-events-none">
                ✓
              </div>

              <div className="text-center space-y-4">
                <div className="text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase font-bold">
                  自律認證卡
                </div>
                <div className="w-12 h-px bg-emerald-500/30 mx-auto" />

                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">達成目標</p>
                  <p className="text-gray-100 text-sm font-bold leading-relaxed break-words">
                    {wager.goal}
                  </p>
                </div>

                <div className="w-12 h-px bg-emerald-500/20 mx-auto" />

                <p className="text-emerald-400/70 text-xs italic">
                  「說到做到，不負自己。」
                </p>

                <p className="text-[9px] text-gray-600">
                  {formatDate(wager.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 pb-8 space-y-3 relative z-10">
            {isViewer ? (
              <button
                id="btn-back-to-own-success"
                onClick={() => { window.location.href = '/' }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-black text-sm tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                {hasLocalWager ? '查看我的專屬合約' : '我也要立下對賭合約'}
              </button>
            ) : (
              <>
                <button
                  id="btn-brag"
                  onClick={handleShare}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-black text-sm tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  炫耀戰果
                </button>
                <button
                  id="btn-new-success"
                  onClick={onReset}
                  className="w-full py-2.5 text-gray-500 text-xs font-medium hover:text-gray-300 transition-colors cursor-pointer"
                >
                  發起新協議 →
                </button>
              </>
            )}
          </div>

          {/* Watermark */}
          <div className="text-center pb-4 relative z-10">
            <p className="text-[9px] text-gray-700 tracking-widest">
              SOCIAL WAGER • 決戰對賭協議
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Fail state
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 animate-fade-in-up">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-gray-800/90 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap">

            <span className="text-sm font-medium tracking-wide">請截圖此畫面分享至限時動態</span>
          </div>
        </div>
      )}
      <div className="w-full max-w-[380px] aspect-[9/16] bg-gradient-to-b from-red-950/90 to-gray-950/95 border border-red-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm animate-border-glow-red">

        {/* Header */}
        <div className="pt-10 pb-4 px-6 text-center">

          <h2 className="text-3xl font-black text-red-400 tracking-tight">
            挑戰失敗...
          </h2>
          <p className="text-red-300/60 text-sm mt-2">
            社會性死亡倒數中
          </p>
        </div>

        {/* Punishment Card */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="bg-gray-900/70 rounded-2xl p-6 border border-red-500/20 shadow-xl relative">
            {/* FAIL Stamp */}
            <div className="absolute -top-3 -right-2 text-red-500/30 text-5xl font-black rotate-[-12deg] animate-stamp-in select-none pointer-events-none tracking-wider">
              FAIL
            </div>

            <div className="text-center space-y-4">
              <div className="text-[10px] text-red-400/50 tracking-[0.3em] uppercase font-bold">
                公開處刑卡
              </div>
              <div className="w-12 h-px bg-red-500/30 mx-auto" />

              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">未達成目標</p>
                <p className="text-gray-400 text-sm font-bold leading-relaxed line-through decoration-red-500/50 break-words">
                  {wager.goal}
                </p>
              </div>

              <div className="w-12 h-px bg-red-500/20 mx-auto" />

              <div>
                <p className="text-[10px] text-red-400 uppercase tracking-wider mb-1">應履行代價</p>
                <p className="text-red-300 text-base font-black leading-relaxed break-words">
                  {wager.penalty}
                </p>
              </div>

              <p className="text-red-400/50 text-xs italic">
                「願賭服輸，請兌現承諾。」
              </p>

              <p className="text-[9px] text-gray-600">
                {formatDate(wager.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-8 space-y-3">
          {isViewer ? (
            <button
              id="btn-back-to-own-fail"
              onClick={() => { window.location.href = '/' }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm tracking-wider shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {hasLocalWager ? '查看我的專屬合約' : '我也要立下對賭合約'}
            </button>
          ) : (
            <>
              <button
                id="btn-face-reality"
                onClick={handleShare}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm tracking-wider shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                面對現實分享限動
              </button>
              <button
                id="btn-new-fail"
                onClick={onReset}
                className="w-full py-2.5 text-gray-500 text-xs font-medium hover:text-gray-300 transition-colors cursor-pointer"
              >
                發起新協議 →
              </button>
            </>
          )}
        </div>

        {/* Watermark */}
        <div className="text-center pb-4">
          <p className="text-[9px] text-gray-700 tracking-widest">
            SOCIAL WAGER • 決戰對賭協議
          </p>
        </div>
      </div>
    </div>
  )
}
