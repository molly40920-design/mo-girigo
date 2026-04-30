export default function LandingView({ onStart }) {
  return (
    <div className="min-h-dvh bg-black flex items-center justify-center relative overflow-hidden">

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${2 + (i % 4) * 2}px`,
              height: `${2 + (i % 4) * 2}px`,
              left: `${5 + (i * 4.7) % 90}%`,
              top: `${10 + (i * 7.3) % 80}%`,
              animation: `float-particle ${4 + (i % 3) * 2}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 w-full max-w-[380px] aspect-[9/16]">

        {/* Top decorative line */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-fade-in-up" />

        {/* Praying Hands Image - pure black bg blends with page */}
        <div className="mb-10 animate-float">
          <img
            src="/praying_hands.png"
            alt="Praying Hands"
            className="w-48 h-48 object-contain select-none"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Title Block */}
        <div className="space-y-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
            決戰對賭協議
          </h1>
          <p className="text-sm text-white/40 tracking-widest uppercase font-medium">
            Social Wager
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-white/30 text-sm leading-relaxed mb-16 animate-fade-in-up max-w-[260px]" style={{ animationDelay: '0.4s' }}>
          立下承諾，面對社群壓力<br />
          用決心兌現你的每一個目標
        </p>

        {/* CTA Button */}
        <button
          id="btn-start"
          onClick={onStart}
          className="group relative px-10 py-4 rounded-full bg-white/5 border border-white/15 text-white font-bold text-base tracking-widest hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300 cursor-pointer animate-fade-in-up backdrop-blur-sm"
          style={{ animationDelay: '0.6s' }}
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            🙏 開始許願
          </span>
        </button>

        {/* Bottom decorative dots */}
        <div className="absolute bottom-10 flex items-center gap-1.5 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}
