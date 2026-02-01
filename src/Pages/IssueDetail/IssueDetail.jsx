import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const IssueDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: issue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
    enabled: !!id, // id না থাকলে query run হবে না
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading issue</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{issue.title}</h2>
      <p>Status: {issue.status}</p>
      <p>Category: {issue.category}</p>
      <p>Location: {issue.location}</p>
      <img
        src={issue.photo}
        alt={issue.title}
        className="w-64 h-48 object-cover rounded"
      />
      <p className="mt-2">{issue.description}</p>
    </div>
  );
};

export default IssueDetail;
