export default function DeStressGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F14] via-[#1A1B25] to-[#0F0F14] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#7A5AF8] hover:text-[#8360FF] font-poppins font-medium mb-8 transition-colors"
        >
          ← Back to Chat
        </a>

        <article className="bg-[#1A1B25] rounded-2xl p-8 md:p-12 border border-[#262630] shadow-xl">
          <div className="mb-8">
            <h1 className="font-poppins font-bold text-white text-3xl md:text-4xl mb-4">
              De-Stress Like a Pro: A Guide with Memes and Vibes
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed mb-6">
              so, stress is basically that annoying mosquito you just can't swat
              away. but no worries, we've got your back! here's how to handle
              it, meme style:
            </p>

            <div className="space-y-6">
              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  meme your stress away:
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  when stress levels rise, it's time to unleash the meme
                  arsenal.{" "}
                  <em className="text-[#3D9DF6]">
                    *cue gordon ramsay confused face*
                  </em>{" "}
                  because, honestly, what's life without a sprinkle of internet
                  humor?
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  soundtrack your life:
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  ever seen one of those movie scenes where they just can't
                  catch a break? yeah, that's us. except we've got a playlist
                  featuring stray kids or some nirvana classics that turns any
                  mood around.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  minecraft therapy:
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  sometimes, the mind needs to vibe like building a massive
                  virtual castle. why face reality when you can terraform a
                  hillside instead?
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  snacks to the rescue:
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  have you ever seen stress curl into a ball at the sight of
                  your favorite snack? no? well, neither have we, but it's a
                  theory worth testing with a bowl of your faves!
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  turn it into a game:
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  challenge your stress with ridiculous quests like 'find the
                  remote in record time' or 'organize your notes in a system
                  only you understand'
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  the laughter battle plan:
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  actually, it's just laughing at how absurd things can get.
                  remember, life is like a comic strip, you gotta enjoy the
                  unexpected panels.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#262630]">
              <p className="font-poppins text-white text-opacity-60 text-sm text-center">
                Written with love by Blue & Iris 💙
              </p>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#614BFF] to-[#8360FF] hover:from-[#553DE8] hover:to-[#7352E8] text-white font-poppins font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
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
