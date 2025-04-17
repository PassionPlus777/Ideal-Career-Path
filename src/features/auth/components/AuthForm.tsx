import { AuthFormProps } from "../types";

const AuthForm = ({
  title,
  onSubmit,
  children,
  error,
  submitText,
  onGoogleClick,
}: AuthFormProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-2xl font-semibold text-[#0fa9ff] mb-8 text-center">
            {title}
          </h1>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-5">{children}</div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-[#29B6F6] hover:bg-[#0288d1] focus:outline-none transition-all duration-200 shadow-[0_2px_6px_-1px_rgba(41,182,246,0.5)] hover:shadow-[0_4px_12px_-1px_rgba(2,136,209,0.5)]"
            >
              {submitText}
            </button>
          </div>

          {onGoogleClick && (
            <div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onGoogleClick}
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors duration-200"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
