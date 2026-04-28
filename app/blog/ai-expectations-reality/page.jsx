export default function AIExpectationsPage() {
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
              AI Expectations vs. Reality: The Brutally Honest Guide 🎭
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Let's cut through the hype and get real about what AI chatbots can
              and can't do. No sugarcoating, just facts.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Expectation: AI understands me like a best friend
                </h2>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mb-2">
                  Reality: AI recognizes patterns, not feelings
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  AI chatbots are trained on massive amounts of text data. They
                  can predict what words usually come next in a conversation,
                  which makes them seem empathetic. But they don't actually
                  *feel* anything. They don't know what it's like to fail a
                  test, have your heart broken, or feel anxious before a big
                  event.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Expectation: AI gives personalized advice tailored to ME
                </h2>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mb-2">
                  Reality: AI gives generalized advice based on common scenarios
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  When you tell an AI about a problem, it pulls from a huge
                  database of similar situations and offers advice that
                  *usually* works. But it doesn't know your full life story,
                  your personality quirks, or the specific dynamics of your
                  relationships.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Expectation: AI will fix my mental health
                </h2>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mb-2">
                  Reality: AI can support, but it can't heal
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  AI can help you organize your thoughts, practice coping
                  strategies, and feel less alone in a tough moment. But it
                  can't diagnose mental health conditions, prescribe medication,
                  or provide the kind of deep, ongoing therapeutic relationship
                  that actually changes lives.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Expectation: AI keeps all my secrets safe
                </h2>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mb-2">
                  Reality: AI platforms vary in privacy protections
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  Not all AI chatbots are created equal. Some are super secure
                  and don't store your conversations. Others collect data to
                  improve their algorithms—or worse, sell it to third parties.
                  Always read the privacy policy.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Expectation: AI knows when I'm in crisis
                </h2>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mb-2">
                  Reality: AI can detect keywords, but it can't truly assess
                  risk
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  Some AI systems are programmed to flag crisis language—words
                  like "suicide," "self-harm," or "hopeless"—and respond with
                  crisis resources. That's great! But AI can't read between the
                  lines the way a trained counselor can.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  Expectation: AI is always right
                </h2>
                <p className="font-poppins text-white text-opacity-60 text-sm sm:text-base mb-2">
                  Reality: AI makes mistakes—sometimes confidently
                </p>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  AI can sound super sure of itself, even when it's wrong. It
                  might give outdated info, misunderstand context, or
                  hallucinate facts that sound plausible but aren't true. Always
                  fact-check important information.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-5 sm:p-6 hover:bg-[#2d2d3a] active:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-lg sm:text-xl mb-2 sm:mb-3">
                  So... should I even use AI?
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-sm sm:text-base leading-relaxed">
                  Hell yes! AI can be super useful when you know what it is and
                  what it isn't. Use it wisely: vent when no one's around,
                  organize chaotic thoughts, brainstorm coping strategies, get a
                  quick confidence boost. But don't expect it to replace real
                  therapy, medical care, or human friendships.
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
