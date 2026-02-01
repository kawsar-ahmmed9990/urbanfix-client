// import React from "react";

// const IssueCard = ({ issue }) => {
//   const { photo, description, priority, title, category, status } = issue;
//   return (
//     <>
//       <div className="card bg-base-100 w-96 shadow-sm">
//         <figure>
//           <img src={photo} alt="Shoes" />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">
//             {title}
//             <div className="badge badge-secondary">{priority}</div>
//           </h2>
//           <p>{description}</p>
//           <div className="card-actions justify-between">
//             <div className="badge badge-outline">Category: {category}</div>
//             <div className="badge badge-outline">Status: {status}</div>
//           </div>
//           <div className="card-actions justify-end">
//             <div className="badge badge-outline">Fashion</div>
//             <div className="badge badge-outline">Products</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IssueCard;

import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import EditIssueModal from "./EditIssueModal";

const IssueCard = ({ issue, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    await axiosSecure.delete(`/issues/${issue._id}`);
    refetch(); // instant UI update
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <img src={issue.image} alt="" className="h-40 object-cover" />

      <div className="card-body">
        <h2 className="font-bold">{issue.title}</h2>
        <p className="text-sm">{issue.location}</p>

        <div className="flex gap-2">
          <span className="badge">{issue.status}</span>
          <span className="badge badge-warning">{issue.priority}</span>
        </div>

        <div className="card-actions mt-4">
          {issue.status === "pending" && (
            <EditIssueModal issue={issue} refetch={refetch} />
          )}

          <button onClick={handleDelete} className="btn btn-error btn-sm">
            Delete
          </button>

          <Link to={`/issues/${issue._id}`} className="btn btn-outline btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
