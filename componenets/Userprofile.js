export default function UserProfile({ user }) {
  if (!user) {
    return null;
  }

  return (
    <div className="box-center">
      <img src={user.photoURL} className="cardd-img-center" />
      <h1>{user.username}</h1>
    </div>
  );
}
