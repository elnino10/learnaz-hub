import Teacher from "../assets/teacher.png";

const Navbar = () => {
  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1>Dashboard</h1>
      <div className="flex pr-12 flex-row items-start justify-start py-0 pr-0 pl-5 box-border relative">
        <img
          className="h-12 w-12 pt-2 m-2 absolute !m-[0] top-[-18px] left-[-49px] rounded-[50%] object-cover"
          alt=""
          src={Teacher}
        />
        <div className="flex-1 relative font-thin whitespace-nowrap z-[1]">
          Admin name
        </div>
      </div>
    </div>
  );
};

export default Navbar;
