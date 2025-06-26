import { Link } from "react-router";

import clockImage from "../assets/melting-clock.png";

import BenefitsCard from "../components/BenefitsCard";
import Button from "../components/Button";
import ThemeToggle from "../components/ThemeToggle";

import useAuth from "../hooks/useAuth";

function Homepage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="w-full h-full flex flex-col gap-6 px-4 sm:px-6">
      <header>
        <div className="mt-8">
          <h1 className="sm:text-5xl text-4xl mb-1 font-heading font-semibold">
            my timeUse
          </h1>
          <p className="sm:text-2xl text-xl font-body">
            A 14-day Journey to Understand and Optimize my Daily Habits
          </p>
        </div>
      </header>
      <main className="mb-6">
        <section className="mt-6 sm:mt-12 mb-12 text-base sm:text-lg flex font-normal">
          <div className="flex flex-col sm:flex-row items-center">
            <figure className="w-1/3 min-w-2xs max-w-sm flex sm:self-start">
              <img src={clockImage} alt="Melting Clock Image" />
            </figure>
            <div className="grow flex flex-col gap-2">
              <h3 className="text-cyan-600 font-semibold font-heading">
                Do you ever feel like there just aren’t enough hours in the day
                to get everything done?
              </h3>
              <p>
                If you often find yourself overwhelmed by tasks, struggling to
                meet deadlines, or wishing you had more free time, learning
                better time management skills could make a huge difference.
                Effective time management helps reduce stress, improve
                productivity, and create a better work-life balance. By
                prioritizing tasks, eliminating distractions, and making the
                most of your time, you can accomplish more with less effort and
                still have time for the things you enjoy. Would you like to take
                control of your schedule and make time work for you?
              </p>
              <p>
                If your answer is yes, a great place to start is by tracking how
                you spend your time each day. The goal of this app is to help
                you gain awareness of how you actually spend your time and
                identify patterns, inefficiencies, and areas for improvement.
                With the data you collect, you can take control of your
                schedule, eliminate distractions, and make time for what truly
                matters.
              </p>
              <div className="flex md:flex-row flex-col sm:gap-8 gap-6 mt-6 items-center">
                <Link to="how-it-works">
                  <Button
                    textSize="sm:text-lg text-base"
                    label={"Learn how to use this app"}
                    version={"version1"}
                  />
                </Link>
                <Link to={isAuthenticated ? "/time-log" : "/login"}>
                  <Button
                    textSize="sm:text-lg text-base"
                    label={"Take control of your time"}
                    version={"version2"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <BenefitsCard />
        </section>
      </main>
      <ThemeToggle />
    </div>
  );
}

export default Homepage;
