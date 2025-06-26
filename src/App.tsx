import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import { ToastContainer } from "react-toastify";

import { RecordsProvider } from "./contexts/records/RecordsProvider";
import { InsightsProvider } from "./contexts/insights/InsightsProvider";

import useTheme from "./hooks/useTheme";
import useAuth from "./hooks/useAuth";

import Layout from "./components/Layout";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./pages/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Instructions = lazy(() => import("./pages/Instructions"));
const TimeLog = lazy(() => import("./pages/TimeLog"));
const Stats = lazy(() => import("./pages/Stats"));
const Review = lazy(() => import("./pages/Review"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const { componentTheme } = useTheme();
  const { isAuthenticated, loading } = useAuth();

  return (
    <>
      <RecordsProvider isAuthenticated={isAuthenticated} authLoading={loading}>
        <InsightsProvider
          isAuthenticated={isAuthenticated}
          authLoading={loading}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center mt-24">
                <Spinner size={100} />
              </div>
            }
          >
            <Layout>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="how-it-works" element={<Instructions />} />
                <Route
                  path="time-log"
                  element={
                    <ProtectedRoute>
                      <TimeLog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="stats"
                  element={
                    <ProtectedRoute>
                      <Stats />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="review"
                  element={
                    <ProtectedRoute>
                      <Review />
                    </ProtectedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <ToastContainer
                theme={componentTheme}
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Layout>
          </Suspense>
        </InsightsProvider>
      </RecordsProvider>
    </>
  );
}

export default App;
