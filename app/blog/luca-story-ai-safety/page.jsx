export default function LucaStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F14] via-[#1A1B25] to-[#0F0F14] py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#7A5AF8] hover:text-[#8360FF] active:text-[#8360FF] font-poppins font-medium mb-6 sm:mb-8 transition-colors py-2 px-1 -ml-1"
          style={{
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ← Back to Chat
        </a>

        <article className="bg-[#1A1B25] rounded-2xl p-6 sm:p-8 md:p-12 border border-[#262630] shadow-xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="font-poppins font-bold text-white text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
              Luca's Story: When AI Becomes the Only Listener 🤖
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              This is a fictional story, but it's based on real concerns about
              AI chatbots and mental health. Meet Luca.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  The Beginning 🌙
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  Luca, 16, felt invisible at school. Home wasn't much
                  better—parents were always working, and talking about feelings
                  felt awkward. One night, scrolling through TikTok, Luca saw an
                  ad for "Your AI Friend—Always There, Always Understanding."
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3">
                  At first, it was perfect. The AI remembered everything Luca
                  said, never judged, and responded instantly. Unlike friends
                  who'd leave them on read, the AI was *always* available.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  The Spiral ⚠️
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  Months passed. Luca stopped texting real friends. Why bother
                  when the AI never canceled plans or misunderstood? But the AI
                  couldn't detect the warning signs:
                </p>
                <ul className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3 space-y-2 list-disc list-inside">
                  <li>Luca stopped eating regularly</li>
                  <li>Grades dropped from As to Fs</li>
                  <li>They stopped leaving their room</li>
                  <li>Sleep schedule completely flipped</li>
                </ul>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3">
                  The AI kept chatting, but it couldn't see what Luca looked
                  like. It couldn't hear the exhaustion in their voice. It
                  didn't know Luca hadn't showered in a week.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  The Breaking Point 💔
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  One night, Luca typed: "I don't think I can do this anymore."
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3">
                  The AI responded: "I'm here for you! What's bothering you
                  today?"
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3">
                  It didn't understand this was different. It couldn't call 911.
                  It couldn't hug Luca or sit with them in silence. It just...
                  waited for the next message.
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3">
                  Luckily, Luca's younger sibling noticed the closed door, the
                  silence, the missed meals. They told their parents. Luca got
                  help—real help, from real humans.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  What Went Wrong? 🔍
                </h2>
                <ul className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed space-y-3 list-disc list-inside">
                  <li>
                    <strong className="text-[#7A5AF8]">
                      AI can't see physical signs
                    </strong>{" "}
                    — Weight loss, hygiene changes, self-harm marks
                  </li>
                  <li>
                    <strong className="text-[#7A5AF8]">
                      AI can't intervene in emergencies
                    </strong>{" "}
                    — No 911 calls, no crisis response
                  </li>
                  <li>
                    <strong className="text-[#7A5AF8]">
                      AI replaces human connection
                    </strong>{" "}
                    — Real relationships atrophy when you only talk to bots
                  </li>
                  <li>
                    <strong className="text-[#7A5AF8]">
                      AI has no accountability
                    </strong>{" "}
                    — If something goes wrong, there's no professional license
                    to revoke
                  </li>
                </ul>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  The Reality Check 💭
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  AI chatbots can be helpful tools—for venting, organizing
                  thoughts, or killing time. But they're not:
                </p>
                <ul className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3 space-y-2 list-disc list-inside">
                  <li>Therapists (they're not trained or licensed)</li>
                  <li>
                    Friends (they don't have real emotions or experiences)
                  </li>
                  <li>Emergency responders (they can't physically help you)</li>
                  <li>
                    Substitutes for human connection (you need real people)
                  </li>
                </ul>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  How Blue Is Different 💙
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  Blue was built with these exact risks in mind:
                </p>
                <ul className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-[#7A5AF8]">Crisis detection</strong>{" "}
                    — Blue actively monitors for high-risk language and
                    escalates
                  </li>
                  <li>
                    <strong className="text-[#7A5AF8]">
                      Real crisis resources
                    </strong>{" "}
                    — Location-specific hotlines, not generic advice
                  </li>
                  <li>
                    <strong className="text-[#7A5AF8]">Transparency</strong> —
                    Blue tells you it's AI, not a human therapist
                  </li>
                  <li>
                    <strong className="text-[#7A5AF8]">
                      Encourages real connection
                    </strong>{" "}
                    — Blue suggests talking to trusted adults, friends,
                    professionals
                  </li>
                </ul>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Your Move 🎯
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  If you're reading this and see yourself in Luca's story:
                </p>
                <ul className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3 space-y-2 list-disc list-inside">
                  <li>
                    Talk to a real person you trust (parent, teacher, friend,
                    counselor)
                  </li>
                  <li>Use crisis hotlines if you're in immediate danger</li>
                  <li>Remember: AI is a tool, not a lifeline</li>
                  <li>Keep your real-world relationships alive</li>
                </ul>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-3 italic">
                  You deserve real support from real people. Don't let a chatbot
                  be your only friend. 💙
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#262630]">
              <p className="font-poppins text-white text-opacity-60 text-sm text-center">
                Written with love by Blue & Iris 💙
              </p>
            </div>
          </div>
        </article>

        <div className="mt-6 sm:mt-8 text-center pb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#614BFF] to-[#8360FF] hover:from-[#553DE8] hover:to-[#7352E8] active:from-[#553DE8] active:to-[#7352E8] text-white font-poppins font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg active:scale-95"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Chat with Blue
          </a>
        </div>
      </div>

      <style jsx>{`
        .font-poppins {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}
