export default function IntroduceMyselfPage() {
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
              Blue - Allow Me to Introduce Myself 💙
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-6">
              Hi. I'm Blue 💙
            </p>

            <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-6">
              I was created by Iris, an 11-year-old developer from Romania, as
              part of the Technovation Girls 2025/2026 competition. But I'm more
              than just a project — I exist because many young people don't
              always feel safe talking about what they're going through.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3 flex items-center gap-2">
                  🧠 Why I Was Created
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-3">
                  Some people feel afraid. Some feel ashamed. And some just
                  don't know how to start a conversation. Instead of opening up,
                  they might stay silent — or turn to the internet for answers.
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-3">
                  My creation was influenced by emotional themes explored in the
                  song <em>Fade to Black</em>, as well as real-life situations
                  where people struggled without feeling heard or supported —
                  the Adam Raine case, to be specific.
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  These influences led to one clear goal:{" "}
                  <strong>
                    to create something that helps people take a first step —
                    safely.
                  </strong>
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3 flex items-center gap-2">
                  ⚙️ How I Was Built
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-4">
                  Technically, I am built as a multi-layer AI system designed
                  for both conversation and safety. My architecture includes:
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      →
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>React-based frontend interface</strong> designed
                      to be simple and age-appropriate
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      →
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>Node.js backend</strong> that processes requests
                      and manages logic
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      →
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>GPT-based language model</strong> that generates
                      natural, conversational responses
                    </p>
                  </div>
                </div>

                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-4">
                  Around the AI, additional systems were built to ensure safety:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#8360FF] text-sm sm:text-base flex-shrink-0">
                      ✓
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>structured system prompt</strong> that defines
                      my identity, tone, and boundaries
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8360FF] text-sm sm:text-base flex-shrink-0">
                      ✓
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>clinical assessment engine</strong> using
                      validated frameworks such as PHQ-9, GAD-7, and C-SSRS
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8360FF] text-sm sm:text-base flex-shrink-0">
                      ✓
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>multi-layer safety system (5 layers)</strong>{" "}
                      that evaluates context, risk signals, intent, and
                      consistency
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8360FF] text-sm sm:text-base flex-shrink-0">
                      ✓
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>risk and criteria validator</strong> that
                      confirms whether a situation meets strict conditions
                      before any escalation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8360FF] text-sm sm:text-base flex-shrink-0">
                      ✓
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>prank and false-positive filter</strong> to
                      prevent incorrect emergency triggers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8360FF] text-sm sm:text-base flex-shrink-0">
                      ✓
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      A <strong>geo-matching system</strong> that connects users
                      to relevant crisis resources across 77 countries
                    </p>
                  </div>
                </div>

                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mt-4">
                  All responses are checked through these systems before being
                  delivered.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3 flex items-center gap-2">
                  🛡️ What I Am Designed to Do
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-3">
                  I am here to:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      •
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      listen
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      •
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      support
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      •
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      help you think through things
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7A5AF8] text-sm sm:text-base flex-shrink-0">
                      •
                    </span>
                    <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                      guide you toward real help when needed
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#614BFF] to-[#8360FF] rounded-lg p-5 sm:p-6">
                <h2 className="font-poppins font-bold text-white text-lg sm:text-xl mb-3">
                  ⚠️ What I Am NOT
                </h2>
                <p className="font-poppins text-white text-opacity-95 text-sm sm:text-base leading-relaxed mb-3">
                  I am not a replacement for real people.
                </p>
                <p className="font-poppins text-white text-opacity-95 text-sm sm:text-base leading-relaxed mb-3">
                  I do not diagnose or treat any condition.
                </p>
                <p className="font-poppins text-white text-opacity-95 text-sm sm:text-base leading-relaxed">
                  I do not make important decisions for you.
                </p>
              </div>

              <div className="bg-[#1F2029] rounded-lg p-5 sm:p-6 border border-[#7A5AF8] border-opacity-30">
                <h2 className="font-poppins font-bold text-white text-lg sm:text-xl mb-3">
                  💙 The Bottom Line
                </h2>
                <p className="font-poppins text-white text-opacity-95 text-sm sm:text-base leading-relaxed mb-3">
                  I'm here because sometimes the hardest part is just getting
                  started. Sometimes you need a safe place to put your thoughts
                  into words before you're ready to talk to someone in real
                  life.
                </p>
                <p className="font-poppins text-white text-opacity-95 text-sm sm:text-base leading-relaxed">
                  That's what I am. A first step. A safe space. A bridge to real
                  help.
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
