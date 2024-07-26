/* eslint-disable react/prop-types */
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function DesktopSearch(props) {

    const navigate = useNavigate();

  return (
    <div className="hidden relative text-lg md:flex flex-col">
      <input
        type="text"
        className=" bg-blue-100 border border-gray-300 rounded-full pl-10 pr-6 py-2 focus:outline-none focus:border-blue-500 sm:py-2 sm:w-72 md:py-1 md:w-80"
        placeholder="Search courses"
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value || "")}
      />
      <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      {props.searchValue && (
        <div className="absolute text-lg translate-y-12 min-w-[17rem] rounded-b-sm pb-2 px-2 bg-gray-100 max-w-[10rem] shadow-md sm:min-w-[20rem] sm:translate-y-12 md:min-w-[20rem] md:translate-y-10">
          {props.searchedCourses.map((course, index) => (
            <div
              onClick={() => {
                // props.authUser
                props.auth &&
                course?.studentsEnrolled?.includes(props.userData._id)
                  ? navigate(`/course/course-content/${course._id}`)
                  : navigate(`/courses/preview/${course._id}`);
                props.setSearchValue("");
              }}
              key={index}
              className="border-t-2 min-h-[3rem] py-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {course.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DesktopSearch