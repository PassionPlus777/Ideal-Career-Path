import React from "react";
import { useNavigate } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { trackScreenView } = useAnalytics();

  React.useEffect(() => {
    trackScreenView("welcome");
  }, [trackScreenView]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50/40 via-purple-50/40 to-pink-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Undecided About
                <br />
                Your Career?
              </h1>
              <p className="text-xl text-gray-600">
                <span className="text-blue-500 font-semibold">
                  IdealCareerPath
                </span>{" "}
                is here to help you{" "}
                <span className="bg-yellow-100 px-1 font-semibold">
                  find your perfect fit
                </span>{" "}
                with our three step process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/decision")}
                  className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
                >
                  Get Started
                </button>
                <button className="px-8 py-3 border border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-50 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/icons/header.png"
                alt="Career Guidance Illustration"
                className="w-full max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Is Power Section */}
      <div className="bg-[#000051] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Knowledge Is Power.</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Identifying and prioritizing your career goals maybe challenging
              yet rewarding. Here are a three direct benefits of knowing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Increase Confidence */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-900/50 rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-8 h-8 text-blue-400">★</div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Increase Confidence
              </h3>
              <p className="text-gray-300">
                Knowing the various career options will result in an increase in
                your belief that your career goals are realistic.
              </p>
            </div>

            {/* Set Realistic Goals */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-900/50 rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-8 h-8 text-blue-400">★</div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Set Realistic Goals
              </h3>
              <p className="text-gray-300">
                This will increase your motivation by defining a clear path you
                can travel in order to achieve your target.
              </p>
            </div>

            {/* Clear Requirements */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-900/50 rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-8 h-8 text-blue-400">★</div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Clear Requirements
              </h3>
              <p className="text-gray-300">
                Having a checklist of the necessary steps can help you work
                efficiently in reaching your goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Three Steps Section */}
      <div className="bg-gradient-to-br from-blue-50/40 via-purple-50/40 to-pink-50/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-blue-500 mb-2">
              Your Career Is Important.
            </h2>
            <h3 className="text-4xl font-bold text-blue-500 mb-8">
              Find Yours In 3 Simple Steps.
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To gain solid understanding of various career options, you need a
              tool capable of sorting and categorizing the ever changing career
              options. <span className="text-blue-500">IdealCareerPath</span> is
              here to help you understand the various career options and how
              they're related.
            </p>
          </div>

          <div className="space-y-32">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="bg-blue-100 text-blue-500 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-6">
                  Step 1
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Choose Your Interest
                </h3>
                <p className="text-lg text-gray-600">
                  Choose the industry or profession you're interested in
                  exploring or pursuing.
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  src="/images/icons/choose.png"
                  alt="Choose Your Interest"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="bg-blue-100 text-blue-500 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-6">
                  Step 2
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  View Career Options
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Achieving a particular career goal may have
                  pre-qualifications, we will help you understand and navigate
                  those requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Job description of each career
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Accomplishments required for advancement
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Knowledge to be gained at each phase
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  src="/images/icons/view_options.png"
                  alt="View Career Options"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="bg-blue-100 text-blue-500 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-6">
                  Step 3
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Review and Share
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Taking a quick peek at the steps you've taken and then sharing
                  this tool with your friends are the best ways of getting
                  others involved.
                </p>
                <button
                  onClick={() => navigate("/get-started")}
                  className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
                >
                  Start now
                </button>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  src="/images/icons/celebrate.png"
                  alt="Review and Share"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="py-24 bg-gradient-to-br from-blue-50/40 via-purple-50/40 to-pink-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-blue-500 mb-6">
            Subscribe And Follow Us
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Be part of the story and follow us on Twitter or Instagram{" "}
            <a
              href="https://twitter.com/idealcareerpath"
              className="text-blue-500 hover:underline"
            >
              @idealcareerpath
            </a>
            <br />
            and subscribe to keep up to date with new information.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-br from-blue-50/40 via-purple-50/40 to-pink-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <div className="w-4 h-4 bg-blue-500 rotate-45"></div>
              <span className="text-gray-600 ml-2">© IdealCareerPath</span>
            </div>
            <div className="flex space-x-6">
              <a href="/pricing" className="text-gray-600 hover:text-blue-500">
                Pricing
              </a>
              <a href="/terms" className="text-gray-600 hover:text-blue-500">
                Terms & Privacy Policy
              </a>
              <a href="/feedback" className="text-gray-600 hover:text-blue-500">
                Feedback
              </a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://twitter.com/idealcareerpath"
                className="text-gray-600 hover:text-blue-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/idealcareerpath"
                className="text-gray-600 hover:text-blue-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
