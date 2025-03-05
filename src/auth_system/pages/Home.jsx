import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-lightBackground dark:bg-dark text-darkText dark:text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-card p-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-bold">RewardsHub</div>
        <div>
          <Link
            to="/login"
            className="px-4 py-2 bg-highlight hover:bg-highlightHover rounded text-white mr-2 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-lightHighlight hover:bg-lightHighlightHover rounded text-white transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-grow text-center px-4 mt-4">
        <img
          src="https://source.unsplash.com/600x400/?rewards,money"
          alt="Earn Rewards"
          className="w-full max-w-xl rounded-lg shadow-lg mb-6"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Earn Rewards for Completing Simple Tasks
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Download apps, complete tasks, and earn points that you can redeem for
          exciting rewards. Start earning today!
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-highlight hover:bg-highlightHover text-white rounded-full text-lg font-semibold transition mb-3"
        >
          Join & Start Earning
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-lightCard dark:bg-card">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border border-lightBorder dark:border-borderGray rounded-lg shadow-md bg-white dark:bg-dark">
            <img
              src="https://source.unsplash.com/200x150/?task,checklist"
              alt="Complete Tasks"
              className="mx-auto mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-bold mb-2 text-darkText dark:text-white">
              Complete Tasks
            </h3>
            <p className="text-grayText">
              Finish simple app downloads, reviews, and surveys to earn points.
            </p>
          </div>
          <div className="text-center p-6 border border-lightBorder dark:border-borderGray rounded-lg shadow-md bg-white dark:bg-dark">
            <img
              src="https://source.unsplash.com/200x150/?wallet,money"
              alt="Earn Points"
              className="mx-auto mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-bold mb-2 text-darkText dark:text-white">
              Earn Points
            </h3>
            <p className="text-grayText">
              Every completed task rewards you with points that you can collect.
            </p>
          </div>
          <div className="text-center p-6 border border-lightBorder dark:border-borderGray rounded-lg shadow-md bg-white dark:bg-dark">
            <img
              src="https://source.unsplash.com/200x150/?gift,shopping"
              alt="Redeem Rewards"
              className="mx-auto mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-bold mb-2 text-darkText dark:text-white">
              Redeem Rewards
            </h3>
            <p className="text-grayText">
              Convert your points into cash, gift cards, or exclusive rewards.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card p-4 text-center text-grayText">
        <p>&copy; {new Date().getFullYear()} RewardsHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
