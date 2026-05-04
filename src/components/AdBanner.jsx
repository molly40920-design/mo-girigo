export default function AdBanner() {
  const adUrl = 'https://www.gametower.com.tw/Action/partygo/mixytalk0416/index.html?utm_source=quiz&utm_medium=display&utm_campaign=mega_traffic_2026&utm_content=3th_banner'
  const imgUrl = '/banner.png'

  return (
    <div className="w-full relative mt-4 mb-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <a href={adUrl} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">

        <img 
          src={imgUrl} 
          alt="Advertisement" 
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </a>
    </div>
  )
}
