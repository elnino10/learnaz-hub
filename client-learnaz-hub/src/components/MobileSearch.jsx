/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function MobileSearch(props) {
  const navigate = useNavigate();

  return (
    <div>
      {props.showMobileSearch && (
        <div className="relative bg-white py-5 w-[30rem] translate-y-[7rem] shadow-md transition duration-500 ease-in-out">
          <div className="flex flex-col items-center">
            <input
              autoFocus
              type="text"
              className="border border-gray-400 text-2xl text-center px-2 h-[3rem] w-[20rem] rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Search courses"
              value={props.searchValue}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => props.setSearchValue(e.target.value || "")}
            />
            {props.searchValue && (
              <div className="absolute text-lg translate-y-12 rounded-b-sm pb-2 px-2 bg-white mt-5 w-[30rem] shadow-md">
                {props.searchedCourses.map((course, index) => (
                  <div
                    onClick={() => {
                      // props.authUser
                      props.auth &&
                      course?.studentsEnrolled?.includes(props.userData._id)
                        ? navigate(`/course/course-content/${course._id}`)
                        : navigate(`/courses/preview/${course._id}`);
                      props.setSearchValue("");
                      props.setShowMobileSearch(false);
                    }}
                    key={index}
                    className="border-t-2 min-h-[3rem] py-5 px-4 cursor-pointer overflow-hidden text-2xl text-ellipsis whitespace-nowrap"
                  >
                    {course.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

MobileSearch.displayName = "MobileSearch";

export default MobileSearch;
