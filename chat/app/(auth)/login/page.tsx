export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Hero Section - Left Side */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Hero Section</h1>
          <p className="text-gray-600 dark:text-gray-400">Instagram photos collage will go here</p>
        </div>
      </div>

      {/* Login Form - Right Side */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-serif mb-8 text-gray-900 dark:text-gray-100">Instagram</h1>
          </div>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-sm text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-sm text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600"
            >
              Log in
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 text-blue-900 dark:text-blue-400 font-semibold text-sm">
            <span className="text-xl">f</span>
            Log in with Facebook
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-xs text-blue-900 dark:text-blue-400">
              Forgot password?
            </a>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            You can also report content you believe is unlawful in your country
            without logging in.
          </p>

          <div className="mt-8 pt-5 border-t border-gray-300 dark:border-gray-600 text-center">
            <p className="text-sm text-gray-900 dark:text-gray-100">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
