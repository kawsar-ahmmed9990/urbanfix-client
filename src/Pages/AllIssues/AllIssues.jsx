import React from "react";
// import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import IssueCard from "../../components/Logo/IssueCard/IssueCard";

const AllIssues = () => {
  //   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ["allissue"],
    queryFn: async () => {
      const res = await axiosSecure("/issues");
      return res.data;
    },
  });
  return (
    <div
      className="my-7 max-w-11/12 mx-auto md:gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    "
    >
      {issues.map((issue) => (
        <IssueCard key={issue._id} issue={issue}></IssueCard>
      ))}
    </div>
  );
};

export default AllIssues;
