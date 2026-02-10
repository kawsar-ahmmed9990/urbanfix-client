import { useEffect, useState } from "react";
import axios from "axios";

const PaymentsAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data.filter((u) => u.subscriptionDate)));
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{new Date(u.subscriptionDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsAdmin;
