export default function NinetiesSlangPage() {
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
              Talking Like It's 1999: A Journey Through 90s Slang
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed mb-6">
              yo, ever wondered what our parents were saying back when flannel
              shirts and grunge were life? buckle up for a trip down memory lane
              with some iconic 90s slang:
            </p>

            <div className="space-y-6">
              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "da bomb"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  something amazing or awesome. like, when a friend shares their
                  snack stash, it's straight up da bomb.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "all that and a bag of chips"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  used to describe someone or something that's really
                  impressive, like when you ace a level in a game without losing
                  a life. <em className="text-[#3D9DF6]">*cues applause*</em>
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "as if!"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  the perfect response when something's as unlikely as a day
                  without memes. imagine being asked to do chores when you're
                  mid-game. as if!
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "phat"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  no, not your tires. it's something that's cool or nice, contra
                  to how it sounds, like a new pair of sneakers that everyone's
                  eyeing.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "talk to the hand"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  literally the 90s way of saying "not interested in listening
                  right now," usually accompanied by the sassy hand gesture.{" "}
                  <em className="text-[#3D9DF6]">*side eye activated*</em>
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "what's the 411?"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  back before googling everything, you'd ask for the 'info' or
                  updates like this. the original "spilling the tea."
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  "word"
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  agreement in its simplest form. kind of like when someone says
                  ice cream is life and you just nod and go, word.
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
