type User = {
  _id: string;
  name?: string;
  email: string;
  role: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/admin/users", {
    cache: "no-store", // 🔥 real-time data
  });

  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <h1>Manage Users</h1>

      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.role.toUpperCase()} – {user.email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
