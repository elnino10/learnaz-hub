import {Link} from 'react-router-dom'
import student from "../assets/student5ani.gif";
import image from "../assets/teacher.png";


const users = [
  {
    id: 1,
    firstName: "Amara",
    lastName: "Okeke",
    email: "hey.mail.com",
    role: "user",
    imageUrl: image
  },
];

function UserDashboard() {
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("localhost/users");
  //       setUsers(response.data);
  //
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div className="h-screen pt-16">
      {users.map((user) => (
        <div key={user.id} className="flex items-center p-16 pl-4">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-900 text-white text-2xl">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
          <div className="text-4xl text-gray-700 font-bold pl-12">
            Welcome back, {user.firstName}
          </div>
        </div>
      ))}
      <div className="text-gray-700 bg-gray-100 flex w-full justify-between p-16 pl-4">
        <div className="text center pl-28 pt-20 w-50 text-center">
          <h2 className="text-4xl font-bold">Learning that gets you</h2>
          <p className="mt-2 text-2xl text-lg">
            Skills for your present and your future.
            <p>Keep Learning</p>.
          </p>
        </div>
        <div className="mb-8 w-50">
          <img src={student} className="w-full h-64 object-cover rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;