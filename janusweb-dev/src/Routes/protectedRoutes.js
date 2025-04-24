import React from "react";
import SignIn from "pages/Signin";
import Dashboard from "pages/Dashboard/Dashboard";
import { useHistory, useLocation } from "react-router-dom";
import SignUp from "pages/Signup";
import Property from "pages/Property";
import LandingPage from "pages/LandingPage/LandingPage";
import OnBoarding from "pages/OnBoarding/OnBoarding";
import HomePage from "pages/HomePage";
import UserAccountsPage from "pages/UserAccounts";
import PricingPlan from "pages/PricingPlan/PricingPlan";
import SuperVisionOnboardingPage from "pages/SupervisionOnBoarding/SuperVisionOnboardingPage";
import { SupervisionOnboardingWrapper } from "pages/SupervisionOnBoarding/SupervisionOnboardingWrapper";

function ProtectedRoute({ children }) {
  // Disable token check and always return children
  return children;
}

function ProtectedAuthRoute(children) {
  // Disable all route protection and always return the children component
  return children;
}

let publicRoutes = []; // Remove route restrictions

export { ProtectedRoute, ProtectedAuthRoute, publicRoutes };
