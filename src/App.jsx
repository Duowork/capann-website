import { useState } from 'react'

const USES = [
  { dot: 'bg-draw', title: 'For teams giving feedback', body: 'Stop writing “the button on the top right, no the other top right” in a comment thread. Circle it. Drop a note next to it. Send a screenshot that answers questions before they’re asked.' },
  { dot: 'bg-rec', title: 'For teachers and trainers walking someone through a screen', body: 'Highlight the field they need to fill in. Use the spotlight to pull focus onto one part of a busy interface while the rest fades away. Record the whole walkthrough once, reuse it forever.' },
  { dot: 'bg-hl', title: 'For teams running remote brainstorms and whiteboarding sessions', body: 'Sketch an idea live on top of a doc, a design, or a blank tab. Use the laser pointer to guide the room’s attention without ever losing the ability to click through to what’s underneath.' },
  { dot: 'bg-draw', title: 'For support and QA teams reporting bugs', body: 'Record the exact sequence that breaks. Annotate the frame where it goes wrong. Attach one clear file instead of a back-and-forth about “can you reproduce it?”' },
  { dot: 'bg-rec', title: 'For freelancers and agencies presenting work to clients', body: 'Walk a client through a design, a build, or a proposal with your own narration and pointer — no meeting required, no “let me share my screen” scheduling.' },
  { dot: 'bg-hl', title: 'For anyone recording a click-by-click tutorial', body: 'Every click gets a visible ripple, so viewers see precisely where you clicked — not just where your cursor happened to be a second later.' },
]

const FEATURES = [
  { title: 'DRAW, PRECISELY', body: 'Pencil with a full color palette and custom color picker, a translucent highlighter, arrows with three head styles, filled or outlined rectangles and ellipses, and text callouts — all adjustable in size and color.' },
  { title: 'DIRECT ATTENTION WITHOUT BLOCKING THE PAGE', body: 'The laser pointer leaves a fading trail as you talk. The spotlight dims everything but the spot you’re focused on. Neither one stops you from clicking through to the page underneath.' },
  { title: 'FIX A MISTAKE WITHOUT STARTING OVER', body: 'The eraser removes exactly the mark you click — nothing more.' },
  { title: 'ANNOTATIONS THAT STICK AROUND', body: 'Your marks persist per tab through switches and reloads, until you clear them yourself.' },
  { title: 'CAPTURE WHAT YOU MADE', body: 'Save the visible tab as a PNG, composited with everything you’ve drawn — one click, instant download.' },
  { title: 'RECORD YOUR SCREEN, YOUR CAMERA, OR BOTH', body: 'Hit record, do the walkthrough, stop, and the file downloads straight to your machine. No uploads, no processing wait, no account required to get your video back.' },
]

const SHORTCUTS = [
  ['Alt+Shift+S', 'Toggle draw mode on the active tab'],
  ['Alt+Shift+T', 'Cycle to the next tool'],
  ['Alt+Shift+C', 'Clear all annotations'],
  ['Esc', 'Exit draw mode without losing your marks'],
]

const FAQS = [
  ['Is this a subscription?', 'No. Capann is a one-time purchase — you pay once and the license is yours to keep, with no renewals or recurring charges.'],
  ['What does the license cover — one device, or can I use it everywhere I browse?', 'One license covers one device and browser. If you switch machines or browsers, you’ll need a separate license for that install.'],
  ['Where do my recordings and screenshots go — does Capann upload anything?', 'Recordings and saved PNGs are captured and downloaded straight to your own device. Capann doesn’t require an account to use, and nothing is sent to a server to get your file back.'],
  ['Can anyone else see what I draw or record?', 'No — your annotations only exist on your tab, on your browser, until you clear them or close the tab. Nothing is shared unless you choose to send the file yourself.'],
  ['Which browsers does Capann work on?', 'Capann works on Chromium-based browsers — Chrome, Edge, and Brave.'],
  ['Do I need to install anything besides the extension to record my screen or camera?', 'No extra software — recording screen and/or camera is built into the extension itself. Click record, do your walkthrough, and stop to download the file.'],
  ['Will my annotations disappear if I switch tabs or accidentally refresh?', 'No — your marks persist on that tab through switches and reloads. They only clear when you hit Clear yourself (or use the Alt+Shift+C shortcut).'],
  ['What if Capann isn’t right for me — is there a refund policy?', 'Yes — Capann comes with a 30-day money-back guarantee. If it’s not working for you, reach out within 30 days of purchase for a full refund.'],
]

const TOOLS_ROW1 = [
  { id: 'pencil', path: (<><path d="M12 19l7-7-4-4-7 7-1 5 5-1z" /><path d="M18 6l1-1" /></>) },
  { id: 'highlighter', path: (<><path d="M9 11l-4 4v4h4l10-10-4-4-6 6z" /><path d="M4 21h16" /></>) },
  { id: 'arrow', path: (<><path d="M7 17L17 7" /><path d="M9 7h8v8" /></>) },
  { id: 'rect', path: (<rect x="4" y="5" width="16" height="14" rx="3" />) },
  { id: 'circle', path: (<circle cx="12" cy="12" r="8" />) },
  { id: 'text', path: (<><path d="M5 6h14" /><path d="M12 6v13" /></>) },
]

const TOOLS_ROW2 = [
  { id: 'laser', path: (<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>) },
  { id: 'spotlight', path: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" /></>) },
  { id: 'eraser', path: (<><path d="M17 6l-9 9-4-3 9-6z" /><path d="M6 20h12" /></>) },
]

const COLORS = ['#A78BFA', '#86EFAC', '#F5E8A6', '#F5F5F7']

function ToolbarDemo() {
  const [tool, setTool] = useState('pencil')
  const [color, setColor] = useState('#A78BFA')
  const [size, setSize] = useState(54)

  const btn = (id) =>
    `grid place-items-center h-[34px] rounded-xl transition-colors cursor-pointer border-0 bg-transparent ${
      tool === id ? 'tool-active' : 'text-muted hover:bg-elevated hover:text-paper'
    }`

  return (
    <div className="w-full max-w-[480px] rounded-[34px] bg-[#0F0F12] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] p-[18px] flex flex-col gap-[14px]">
      <div className="flex items-center gap-2.5 px-1">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/15" />
          ))}
        </div>
        <div className="flex-1 h-[22px] rounded-full bg-panel" />
      </div>

      <div className="relative rounded-3xl bg-panel h-[250px] overflow-hidden">
        <div className="absolute left-[26px] top-[28px] w-[146px] h-3 rounded-full bg-white/10" />
        <div className="absolute left-[26px] top-[52px] w-[100px] h-3 rounded-full bg-white/5" />
        <div className="absolute left-[26px] top-[104px] w-[138px] h-[74px] rounded-[18px] bg-white/5" />
        <div className="absolute right-10 top-[30px] w-24 h-3 rounded bg-hl opacity-50" />
        <div className="absolute right-7 top-[100px] w-32 h-[82px] rounded-[18px] border-2" style={{ borderColor: color }} />
        <div className="absolute left-[176px] top-[150px] w-[92px] h-[2.5px] rounded-sm rotate-[-30deg]" style={{ background: color }} />
        <div className="absolute left-6 bottom-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11.5px]">
          <div className="w-2 h-2 rounded-full bg-rec" />
          Recording
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3.5 rounded-[28px] glass">
        <div className="grid grid-cols-6 gap-1.5">
          {TOOLS_ROW1.map((t) => (
            <button key={t.id} aria-label={t.id} onClick={() => setTool(t.id)} className={btn(t.id)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">{t.path}</svg>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {TOOLS_ROW2.map((t) => (
            <button key={t.id} aria-label={t.id} onClick={() => setTool(t.id)} className={btn(t.id)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">{t.path}</svg>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          {COLORS.map((c) => (
            <button
              key={c}
              aria-label={`color ${c}`}
              onClick={() => setColor(c)}
              className={`w-[18px] h-[18px] rounded-full cursor-pointer border-0 p-0 ${color === c ? 'shadow-[0_0_0_2px_#F5F5F7]' : ''}`}
              style={{ background: c }}
            />
          ))}
          <div
            className="ml-auto h-1 w-[88px] rounded-full bg-white/10 cursor-pointer"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              setSize(Math.round(((e.clientX - r.left) / r.width) * 100))
            }}
          >
            <div className="h-1 rounded-full bg-draw" style={{ width: size }} />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 grid place-items-center h-8 rounded-full border border-white/15 text-[13px] bg-transparent text-paper cursor-pointer">Clear</button>
          <button className="flex-1 grid place-items-center h-8 rounded-full bg-rec text-[#0A2E1B] text-[13px] font-medium border-0 cursor-pointer">Save</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper font-sans">
      <nav className="relative z-10 flex items-center gap-7 max-w-[1280px] mx-auto px-[clamp(20px,5vw,56px)] py-[26px]">
        <div className="flex items-center gap-3 mr-auto">
          <img src="/svg/capann-icon-light.svg" alt="Capann" className="w-[30px] h-[30px]" />
          <div className="font-display font-bold text-[29px] leading-none tracking-[0.03em]">
            CAPA<span className="text-draw">NN</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {[
            ['Who it’s for', '#uses'],
            ['What you get', '#features'],
            ['Shortcuts', '#shortcuts'],
            ['Pricing', '#pricing'],
            ['FAQ', '#faq'],
          ].map(([label, href]) => (
            <a key={href + label} href={href} className="text-[13.5px] text-muted hover:text-paper transition-colors">{label}</a>
          ))}
        </div>
        <a href="#pricing" className="inline-flex items-center px-5 py-2.5 rounded-full bg-draw text-ink text-[13.5px] font-medium hover:bg-draw-hover transition-colors">
          Add to Chrome
        </a>
      </nav>

      <main className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,56px)]">
        {/* Hero */}
        <section className="grid gap-14 items-center py-14 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-display font-bold leading-[0.86] tracking-[0.01em] m-0 text-[clamp(64px,8.4vw,116px)]">
              <span className="block">SHOW,</span>
              <span className="block">DON’T <span className="text-draw">TELL.</span></span>
            </h1>
            <p className="text-[17px] leading-[1.66] max-w-[46ch] mt-[30px] text-body">
              Capann is the browser extension that lets you draw, point, screenshot and screen-record on any page so the people you’re talking to actually see what you mean.
            </p>
            <div className="mt-7 text-[15.5px] leading-[1.85]">
              One-time purchase. No subscription.{' '}
              <span className="relative inline-block whitespace-nowrap pb-3">
                Yours forever.
                <svg viewBox="0 0 120 16" preserveAspectRatio="none" fill="none" className="absolute left-[-6px] bottom-0 w-[calc(100%+13px)] h-[14px]">
                  <path d="M3 10.4 C 22 3.6, 40 12.8, 58 7 C 76 2, 96 12.4, 117 9.6" stroke="#86EFAC" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#pricing" className="inline-flex items-center px-[26px] py-[15px] rounded-full bg-draw text-ink text-[14.5px] font-medium hover:bg-draw-hover transition-colors">
                Add to Chrome — One-Time License
              </a>
              <a href="#features" className="inline-flex items-center px-6 py-[15px] rounded-full border border-white/15 text-paper text-[14.5px] hover:bg-elevated transition-colors">
                See it in action ↓
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ToolbarDemo />
          </div>
        </section>

        {/* Problem */}
        <section className="grid gap-7 py-6 pb-24 items-start lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-x-[clamp(24px,5vw,88px)]">
          <div>
            <div className="text-xs tracking-[0.16em] uppercase text-muted mb-4">The problem</div>
            <h2 className="font-display font-bold leading-[0.92] tracking-[0.01em] m-0 max-w-[20ch] text-[clamp(38px,4.4vw,56px)]">
              THREE PARAGRAPHS TRYING TO DESCRIBE A RECTANGLE
            </h2>
          </div>
          <div>
            <p className="text-[17px] leading-[1.68] mb-5 text-body max-w-[54ch]">
              You’re on a call, or writing a Slack message, and you need someone to see <em className="text-paper not-italic font-normal">exactly</em> this button, <em className="text-paper not-italic font-normal">exactly</em> this line of the spreadsheet, <em className="text-paper not-italic font-normal">exactly</em> where the layout breaks. So you type three paragraphs trying to describe a rectangle.
            </p>
            <p className="text-[17px] leading-[1.68] m-0 max-w-[54ch]">Capann skips the paragraphs. Circle it, point at it, screenshot or better still record it — done.</p>
          </div>
        </section>

        {/* Uses */}
        <section id="uses" className="pb-24 scroll-mt-6">
          <div className="text-xs tracking-[0.16em] uppercase text-muted mb-4">Who it’s for</div>
          <h2 className="font-display font-bold leading-[0.92] tracking-[0.01em] mt-0 mb-11 max-w-[26ch] text-[clamp(38px,4.6vw,60px)]">
            BUILT FOR THE MOMENTS WHERE “JUST LOOK HERE” MATTERS
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {USES.map((u) => (
              <div key={u.title} className="flex flex-col gap-3 p-7 rounded-[28px] bg-panel border border-white/10">
                <div className={`w-2.5 h-2.5 rounded-full ${u.dot}`} />
                <h3 className="text-base font-medium leading-[1.35] m-0">{u.title}</h3>
                <p className="text-[14.5px] leading-[1.62] m-0 text-muted">{u.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="pb-24 scroll-mt-6">
          <div className="text-xs tracking-[0.16em] uppercase text-muted mb-9">What you get</div>
          <div className="grid gap-x-[clamp(24px,5vw,80px)] md:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col gap-3 py-[30px] border-t border-white/10">
                <h3 className="font-display font-bold text-[30px] leading-none tracking-[0.02em] m-0">{f.title}</h3>
                <p className="text-[15px] leading-[1.65] m-0 text-muted max-w-[46ch]">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shortcuts */}
        <section id="shortcuts" className="pb-24 scroll-mt-6">
          <div className="grid gap-10 items-center p-[clamp(28px,4vw,52px)] rounded-[40px] bg-panel border border-white/10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-x-[clamp(24px,5vw,80px)]">
            <div>
              <h2 className="font-display font-bold leading-[0.92] tracking-[0.01em] m-0 max-w-[20ch] text-[clamp(34px,3.8vw,48px)]">
                FAST TO USE, FASTER TO FORGET YOU’RE USING IT
              </h2>
              <p className="text-[15px] leading-[1.65] mt-5 mb-0 text-muted max-w-[40ch]">
                The floating toolbar drags anywhere out of your way. It’s built to disappear until the moment you need it.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {SHORTCUTS.map(([k, v]) => (
                <div key={k} className="flex items-center gap-[18px] px-5 py-[15px] rounded-full bg-elevated">
                  <div className="text-[13px] font-medium tracking-[0.04em] text-draw min-w-[104px] tabular-nums">{k}</div>
                  <div className="text-[14.5px]">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="pb-24 scroll-mt-6">
          <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-x-[clamp(24px,5vw,72px)]">
            <div>
              <div className="text-xs tracking-[0.16em] uppercase text-muted mb-4">Pricing</div>
              <h2 className="font-display font-bold leading-[0.9] tracking-[0.01em] m-0 text-[clamp(44px,5.4vw,76px)]">
                ONE LICENSE.<br />ONE PAYMENT.<br /><span className="text-rec">NO RENEWAL.</span>
              </h2>
              <p className="text-[16.5px] leading-[1.66] mt-[26px] text-body max-w-[48ch]">
                Most annotation tools bill you monthly to keep drawing on your own screen. Capann is a one-time purchase — pay once, use it for as long as you’re browsing.
              </p>
            </div>
            <div className="flex flex-col gap-[18px] p-9 rounded-4xl bg-panel border border-white/15">
              <div className="flex items-center gap-2.5 text-[13px] text-rec">
                <div className="w-2 h-2 rounded-full bg-rec" />
                One-time license
              </div>
              <div className="flex flex-col gap-2.5 text-[14.5px] text-body">
                <div>Every tool, every accent, no tiers.</div>
                <div>Recording and PNG export included.</div>
                <div>No account needed to get your files back.</div>
              </div>
              <a href="#pricing" className="inline-flex items-center justify-center mt-1.5 px-[26px] py-4 rounded-full bg-draw text-ink text-[15px] font-medium hover:bg-draw-hover transition-colors">
                Get Capann — One-Time License
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="pb-24 scroll-mt-6">
          <div className="text-xs tracking-[0.16em] uppercase text-muted mb-4">FAQ</div>
          <h2 className="font-display font-bold leading-[0.92] tracking-[0.01em] mt-0 mb-10 text-[clamp(38px,4.6vw,60px)]">QUESTIONS, ANSWERED</h2>
          <div className="grid gap-x-[clamp(24px,5vw,72px)] md:grid-cols-2">
            {FAQS.map(([q, a]) => (
              <div key={q} className="flex flex-col gap-2.5 py-[26px] border-t border-white/10">
                <h3 className="text-base font-medium leading-[1.4] m-0">{q}</h3>
                <p className="text-[14.5px] leading-[1.65] m-0 text-muted max-w-[50ch]">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-24">
          <div className="flex flex-col gap-[26px] items-start p-[clamp(32px,5vw,64px)] rounded-[44px] bg-gradient-to-br from-panel to-ink border border-white/10">
            <h2 className="font-display font-bold leading-[0.9] tracking-[0.01em] m-0 max-w-[24ch] text-[clamp(40px,5.6vw,80px)]">
              STOP DESCRIBING YOUR SCREEN. START <span className="text-draw">SHOWING</span> IT.
            </h2>
            <a href="#pricing" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-paper text-ink text-[15px] font-medium hover:bg-white transition-colors">
              Add Capann to your browser →
            </a>
          </div>
        </section>

        <footer className="flex flex-wrap items-center gap-4 pt-8 pb-16 border-t border-white/10 text-[13px] text-muted">
          <div className="flex items-center gap-2.5 mr-auto">
            <img src="/svg/capann-icon-light.svg" alt="" className="w-[22px] h-[22px] opacity-70" />
            <div>Capann is built by <a href="https://duowork.tech" className="text-draw hover:text-draw-hover">Duowork</a>, a software firm building for how people actually work.</div>
          </div>
          <div>One-time purchase. No subscription.</div>
        </footer>
      </main>
    </div>
  )
}
