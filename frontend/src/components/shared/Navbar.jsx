export default function Navbar(props) {
  const { role } = props;
  return (
    <nav className="w-full px-10 py-6 ">
      <div className="flex justify-between items-center">
        <a className="font-bold" href="/">
          School Management
        </a>
        {role === "ADMIN" ? (
          <a
            className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
            href="/admin"
          >
            Dashboard
          </a>
        ) : role === "TEACHER" ? (
          <a
            className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
            href="/teacher"
          >
            Log in
          </a>
        ) : (
          <a
            className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
            href="/login"
          >
            Log in
          </a>
        )}
      </div>
    </nav>
  );
}