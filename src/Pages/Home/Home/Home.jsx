import React from "react";
import Banner from "../../../components/Banner/Banner";
import Features from "../../../components/Features/Features";
import HowItWorks from "../../../components/HowItWorks/HowItWorks";
import UserRoles from "../../../components/UserRoles/UserRoles";
import Testimonials from "../../../components/Testimonials/Testimonials";
import LatestResolvedIssues from "../../../components/LatestResolvedIssues/LatestResolvedIssues";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestResolvedIssues></LatestResolvedIssues>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <UserRoles></UserRoles>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
