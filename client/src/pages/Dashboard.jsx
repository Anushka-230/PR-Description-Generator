import Navbar from "../components/Navbar";

const handleGithubConnect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  window.location.href =
    `http://localhost:5000/api/github/login?userId=${user.id}`;
};

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold">
          Generate AI-powered PR Descriptions
        </h1>

        <p className="text-gray-500 mt-2">
          Connect your GitHub account to generate pull request descriptions automatically.
        </p>

        <div className="mt-8 border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            GitHub Status
          </h2>

          <p className="text-red-500 mt-2">
            Not Connected
          </p>

          <button className="mt-5 bg-black text-white px-5 py-2 rounded" onClick={handleGithubConnect}>
            Connect GitHub
          </button>
        </div>

        <div className="mt-10 border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Recent Activity
          </h2>

          <p className="text-gray-500 mt-2">
            No PR descriptions generated yet.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;