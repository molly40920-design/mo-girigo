export default function AdPopup({ onClose }) {
  const adUrl = 'https://www.gametower.com.tw/Action/partygo/mixytalk0416/index.html?utm_source=girigo&utm_medium=display&utm_campaign=mega_traffic_2026&utm_content=1st_banner'
  const imgUrl = '/banner.png'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[340px] animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ad Container */}
        <a href={adUrl} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900 group">

          <img 
            src={imgUrl} 
            alt="Advertisement" 
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="flex justify-between items-end">
              <div className="text-left">
                <h3 className="text-white font-bold text-lg leading-tight mb-1">特別推薦</h3>
                <p className="text-gray-300 text-xs">點擊前往了解更多 👉</p>
              </div>
              <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                了解更多
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
