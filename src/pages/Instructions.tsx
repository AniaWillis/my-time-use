import { Link } from "react-router";
import clsx from "clsx";

import darkLog from "../assets/time-log-dark.png";
import lightLog from "../assets/time-log-light.png";
import darkSummary from "../assets/summary-dark.png";
import lightSummary from "../assets/summary-light.png";
import darkReview from "../assets/review-dark.png";
import lightReview from "../assets/review-light.png";

import Button from "../components/Button";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

function Instructions() {
  const { isAuthenticated } = useAuth();
  const { componentTheme } = useTheme();

  const h2Style =
    "font-heading text-xl sm:text-2xl mt-8 mb-2 font-bold text-cyan-600";
  const h3Style = "font-heading text-lg sm:text-xl mt-4 mb-1 font-semibold";
  const pStyle = "font-body text-sm sm:text-base leading-[1.2]";
  const listStyle = "list-outside pl-5 font-body mt-1 text-sm sm:text-base ";
  const liSpanStyle = "font-semibold";

  return (
    <main className="flex flex-col px-4 sm:px-6 gap-8">
      <section>
        <h2 className={`${h2Style}`}>How to Use 'my timeUse'</h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start items-center">
          <div>
            <h3 className={`${h3Style}`}>Duration of Tracking</h3>
            <p className={`${pStyle}`}>
              Track your daily activities for a complete two-week period (14
              days), making sure to include both weekdays and weekends.
            </p>
            <h3 className={`${h3Style}`}>How Often to Record</h3>
            <p className={`${pStyle}`}>
              For the most accurate insights, log your activities throughout the
              day. You may choose to record in real-time or at regular intervals
              (e.g., every hour). Avoid waiting until the end of the day, as
              this can lead to missed or inaccurate details.
            </p>
            <h3 className={`${h3Style}`}>What to Record for Each Time Block</h3>
            <p className={`${pStyle}`}>
              For every activity you log, include the following:
            </p>
            <ul className={clsx("list-disc", listStyle)}>
              <li>
                <span className={`${liSpanStyle}`}>Start and End Time</span>{" "}
                (e.g., 7:00 AM – 7:30 AM)
              </li>
              <li>
                <span className={`${liSpanStyle}`}>Activity Description</span>{" "}
                (e.g., “Email correspondence,” “Scrolling social media,”
                “Watching TV,” “Family dinner”)
              </li>
              <li>
                <span className={`${liSpanStyle}`}>Category</span> (e.g., Work,
                Study, Exercise, Leisure, Family, Chores, etc.)
              </li>
              <li>
                <span className={`${liSpanStyle}`}>Energy Level / Focus</span> -
                a quick self-rating (High, Medium, Low)
              </li>
              <li>
                <span className={`${liSpanStyle}`}>Notes</span> (Optional) – Add
                any insights or reflections that may help you assess how you
                spent your time. For example, note what improved or hindered
                your focus.
              </li>
              <li>
                <span className={`${liSpanStyle}`}>
                  Multitasking and Interruptions/Distractions
                </span>{" "}
                (Optional)
              </li>
            </ul>
            <h3 className={`${h3Style}`}>Be Honest</h3>
            <p className={`${pStyle}`}>
              The accuracy of your data is key. Log each activity
              truthfully—even short or “unproductive” ones—to get a true picture
              of your habits.
            </p>
            <h3 className={`${h3Style}`}>Be Consistent</h3>
            <p className={`${pStyle}`}>
              Record entries daily, including weekends, holidays, and any days
              off. This will help you uncover patterns across different types of
              days.
            </p>
          </div>

          <figure className="min-w-[350px] max-w-[425px] pt-4">
            <div className="border border-cyan-600 p-2 rounded-sm">
              <h4 className="font-heading font-medium">Sample Time Log</h4>
              <hr />
              <img src={componentTheme === "dark" ? darkLog : lightLog} />
            </div>
          </figure>
        </div>
      </section>
      <section>
        <h2 className={`${h2Style} `}>After Two Weeks: Analyzing Your Time</h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start items-center">
          <div>
            <h3 className={`${h3Style}`}>Evaluate Time Efficiency</h3>
            <p className={`${pStyle}`}>
              Review each activity using the following 5-point Time Use
              Efficiency Scale:
            </p>
            <ol className={clsx("list-decimal", listStyle)}>
              <li>Very Inefficient</li>
              <li>Somewhat Inefficient</li>
              <li>Average</li>
              <li>Somewhat Efficient</li>
              <li>Highly Efficient</li>
            </ol>
            <h3 className={`${h3Style}`}>Review Time by Category</h3>
            <p className={`${pStyle}`}>
              The app will summarize how many hours you spent in each category
              (Work, Exercise, Leisure, Sleep, etc.). You can also view a
              category breakdown for specific days to understand how your time
              use varies.
            </p>
            <h3 className={`${h3Style}`}>Identify Patterns</h3>
            <p className={`${pStyle}`}>
              Look for trends in how you use your time. Consider:
            </p>
            <ul className={`list-disc ${listStyle}`}>
              <li>Which activities consistently take up your time </li>
              <li>When you feel most and least productive </li>
              <li>
                How much time is spent on essential vs. non-essential tasks{" "}
              </li>
              <li>
                How much of your day is spent on low-value or unintentional
                activities{" "}
              </li>
            </ul>
            <p className={`${pStyle}`}>Reflect on questions like:</p>
            <ul className={`list-disc ${listStyle}`}>
              <li>
                Am I using my time in ways that align with my priorities?{" "}
              </li>
              <li>Where is time being wasted? </li>
              <li>When am I most productive? </li>
              <li>
                What habits or changes could improve how I manage my time?{" "}
              </li>
            </ul>

            <h3 className={`${h3Style}`}>Set Meaningful Goals</h3>
            <p className={`${pStyle}`}>
              Use your insights to create clear, achievable goals for improving
              your time management going forward.
            </p>
          </div>
          <figure className="min-w-[350px] max-w-[425px] flex flex-col gap-4 pt-4">
            <div className="border border-cyan-600 p-2 rounded-sm">
              <h4 className="font-heading font-medium">Sample Summary</h4>
              <hr />
              <img
                src={componentTheme === "dark" ? darkSummary : lightSummary}
              />
            </div>
            <div className="border border-cyan-600 p-2 rounded-sm">
              <h4 className="font-heading font-medium">
                Sample User's Insights
              </h4>
              <hr />
              <img src={componentTheme === "dark" ? darkReview : lightReview} />
            </div>
          </figure>
        </div>
      </section>
      <div className="flex justify-center items-center my-12">
        <Link to={isAuthenticated ? "/time-log" : "/login"}>
          <Button
            textSize="sm:text-lg text-base"
            label="Start recording"
            version="version2"
          />
        </Link>
      </div>
    </main>
  );
}

export default Instructions;
