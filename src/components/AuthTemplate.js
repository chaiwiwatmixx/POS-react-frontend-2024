const AuthTemplate = ({ children, mainTopic, subTopic }) => {
  return (
    <div className="login">
      <div className="container sm:px-10">
        <div className="block xl:grid grid-cols-2 gap-4">
          {/* <!-- BEGIN: Register Info --> */}
          <div className="hidden xl:flex flex-col min-h-screen">
            <a href="" className="-intro-x flex items-center pt-5">
              <img
                alt="Rubick Tailwind HTML Admin Template"
                className="w-6"
                src="dist/images/logo.svg"
              />
              <span className="text-white text-lg ml-3">
                <span className="font-medium">WIN</span> POS{" "}
              </span>
            </a>
            <div className="my-auto">
              <img
                alt="Rubick Tailwind HTML Admin Template"
                className="-intro-x w-1/2 -mt-16"
                src="dist/images/kit-pos-terminal.png"
              />
              <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                A few more clicks to
                <br />
                {subTopic} to your account.
              </div>
              <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">
                Manage all your POS accounts in one place
              </div>
            </div>
          </div>
          <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
        <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
          <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
            {mainTopic}
          </h2>
          <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center">
            A few more clicks to {subTopic} to your account. Manage all your
            pos accounts in one place
          </div>
          {children}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
