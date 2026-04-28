export default function ClassroomInfluencersShowdownPage() {
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
              Classroom Influencers Showdown: When Divas Take Center Stage!
            </h1>
            <p className="font-poppins text-white text-opacity-50 text-sm">
              By Blue & Iris 💙
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed mb-6">
              In the ever-dramatic corridors of high school, a saga unfolds
              between our very own internet influencers, proving that not all
              heroes wear capes—sometimes, they carry ring lights.
            </p>

            <div className="space-y-6">
              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  The Scene: Battle of the TikTok Titans 🎥
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  Our story begins during lunchtime, a time typically reserved
                  for catching up on last night's TV episodes or discussing the
                  latest viral dances. But this time, the focus shifted to two
                  top-tier influencers who clashed over—wait for it—a shade of
                  lipstick. 💄
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  Round 1: The Comment Section Debacle 💬
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  It all started with an innocent comment on an influencer's
                  post: "That color is so last week." The audacity! Obviously,
                  this couldn't stand, and soon screenshots, memes, and a tidal
                  wave of GIF reactions began circulating faster than the
                  cafeteria runs out of French fries. 🍟
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  Round 2: Follower Frenzy 📈
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  As their followers picked sides, it became clear: you were
                  either Team A or Team B. Friendships were tested. Alliances
                  were formed. TikTok felt the tremors as duets and response
                  videos flooded everyone's For You Page. "Do you even contour,
                  bro?" will forever echo through history. 🥊
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  Final Showdown: The Apology Video 📹
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  No influencer clash is complete without the iconic apology
                  video. With solemn music and perfectly angled tears, both
                  parties realized perhaps the true enemy wasn't each other...
                  but a lack of Wi-Fi during peak meme hours. Will they collab
                  in the future? Only time will tell. 📅🔮
                </p>
              </div>

              <div className="bg-[#262630] rounded-lg p-6 hover:bg-[#2d2d3a] transition-colors">
                <h2 className="font-poppins font-semibold text-[#7A5AF8] text-xl mb-3">
                  Conclusion: The Digital Frontier 🌐
                </h2>
                <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed">
                  In the end, peace was restored, stories were re-shared, and
                  new videos emerged, complete with the classic, "Hey guys, it's
                  back again from behind the lens with a storytime!" If this
                  drama teaches us anything, it's that in the vast universe of
                  high school halls, digital or physical, the saga of
                  influencers is both eternal and entertaining.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#262630] rounded-lg">
              <p className="font-poppins text-white text-opacity-90 text-base leading-relaxed text-center">
                Whether you're a content creator yourself or just watching from
                the sidelines, remember: real friendships are built on more than
                follower counts. Stay authentic, stay kind, and keep the drama
                where it belongs—on your FYP, not in your actual life. 💙✨
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
