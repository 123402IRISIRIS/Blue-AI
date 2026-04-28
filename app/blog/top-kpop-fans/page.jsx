export default function TopKpopFansPage() {
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
              Top 5 Most Dedicated K-pop Fans: A Glorious Ode to Stan Culture
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-6">
              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  1. The Concert Camouflage Master
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  Meet Hana, who once disguised herself as a vending machine to
                  sneak into a sold-out show. No cap, she literally stood next
                  to the real vending machines, bopping to her bias' vocals
                  while casually giving out snacks. Because if you can't see the
                  concert, at least stay hydrated, right?
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  2. The Merch Mountain Builder
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  Jinsoo has dedicated an entire room in his house solely to
                  K-pop merchandise. We're talking floor-to-ceiling posters,
                  every album version ever, and enough lightsticks to turn a
                  power outage concert into a full-blown rave. When asked why he
                  needs 17 photocards of the same member, his response: "For my
                  feels, duh!"
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  3. The Multilingual Lyric Master
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  Yumi doesn't just memorize lyrics in Korean; she's learned
                  them in Japanese, English, and Chinese. All of them.
                  Sometimes, she gets the languages mixed up mid-verse, creating
                  unintended remixes that end up being surprisingly catchy, much
                  to her friends' amusement. 🎶
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  4. The Viral Challenge Creator
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  Hyunki went viral for inventing the infamous "K-pop Shuffle
                  Sprint," where fans attempt the high-energy choreo of three
                  random songs on shuffle. He may have crashed into a tree
                  mid-'Ddu-Du Ddu-Du,' but hey, it's all about the
                  commitment—and now it's a global trend.
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  5. The Fanfic Phenomenon
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  Lizzie once wrote a 200-part saga featuring her ultimate bias
                  group battling against villainous autotune robots while
                  simultaneously attending high school. Her fans call it
                  'cringe-tastic,' but her plot twists have earned over a
                  million reads, and it recently got adapted into a Webtoon.
                  📚🤖
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#262630] rounded-lg">
              <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed text-center">
                And there you have it! Whether they're sneaking into concerts in
                disguise or inventing side-splitting dance challenges, these
                dedicated K-pop fans prove that stanning is not just a
                hobby—it's an art. 💜
              </p>
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
