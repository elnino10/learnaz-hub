/* eslint-disable react/prop-types */
import student from "../assets/images/teacher2.png";
import iconTeam from "../assets/images/iconTeam.png";
import iconTeach from "../assets/images/iconTeach2.png";
import iconIcome from "../assets/images/iconIncome.png";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const sharedClasses = {
  primaryBg: "bg-primary",
  primaryFg: "text-primary",
  secondaryBg: "bg-secondary",
  secondaryFg: "text-secondary-foreground",
  cardBg: "bg-card",
  cardPadding: "p-6",
  cardRounded: "rounded-lg",
  buttonPadding: "px-6 py-3",
  buttonRounded: "rounded-lg",
  buttonMarginTop: "mt-4",
  navPadding: "py-4 px-8",
  headerPadding: "py-16 px-8",
  sectionPadding: "px-8 py-12",
  footerPadding: "py-4 px-8",
  textCenter: "text-center",
  textBold: "font-bold",
  textLarge: "text-lg",
  textSmall: "text-sm",
  textExtraLarge: "text-4xl",
  textMedium: "text-2xl",
  gridCols: "grid-cols-1 md:grid-cols-3",
  gridGap: "gap-8",
  flex: "flex",
  justifyBetween: "justify-between",
  itemsCenter: "items-center",
  grid: "grid",
  mxAuto: "mx-auto",
  mb4: "mb-4",
  mb2: "mb-2",
};

const CourseCreator = (props) => {
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  let apiUrl = "";
  if (props.authUser) {
    apiUrl = `${baseUrl}/users/${props.authUser.id}`;
  }

  const applyInstructorHandler = async () => {
    try {
      if (props.authUser && props.authUser.role !== "instructor") {
        const res = await axios.patch(apiUrl, { role: "instructor" });
        console.log(res.data);
        alert(res.data.message);
        navigate("/home", { state: {id: props.authUser.id} });
      } else if (!props.authUser) {
        navigate("/instructor-signup");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`mt-20 ${sharedClasses.primaryBg} ${sharedClasses.primaryFg} min-h-screen`}
    >
      <section className="text-gray-700 bg-gray-100 w-[100%] mx-auto py-5 px-36 flex items-center justify-between flex-col md:flex-row">
        <div>
          <img src={student} className="h-[20rem] w-[30rem] object-cover" />
        </div>
        <div className="max-w-50 my-10 text-center">
          <h2 className="text-4xl font-bold">Come Teach With Us</h2>
          <p className="text-lg">
            Become an instructor and change lives — including your own
          </p>
          <button
            onClick={applyInstructorHandler}
            className={`px-6 mt-5 rounded-lg bg-gray-700 text-white hover:bg-gray-900 ${sharedClasses.secondaryFg} ${sharedClasses.buttonPadding} ${sharedClasses.buttonRounded}`}
          >
            Apply Now
          </button>
        </div>
      </section>
      <section className={sharedClasses.sectionPadding}>
        <h2
          className={`text-gray-700 ${sharedClasses.textMedium} ${sharedClasses.textBold} mb-4`}
        >
          Why Create a Course with Us?
        </h2>
        <div
          className={`${sharedClasses.grid} ${sharedClasses.gridCols} ${sharedClasses.gridGap} items-center`}
        >
          <div
            className={`${sharedClasses.cardBg} ${sharedClasses.cardPadding} ${sharedClasses.cardRounded}`}
          >
            <img
              src={iconTeach}
              alt="icon"
              className={`${sharedClasses.mxAuto} ${sharedClasses.mb4}`}
            />
            <h3
              className={`text-gray-700 ${sharedClasses.textLarge} ${sharedClasses.textBold} ${sharedClasses.mb2}`}
            >
              Easy-to-Use Platform
            </h3>
            <p className={sharedClasses.textSmall}>
              Our platform is user-friendly, making course creation a breeze.
            </p>
          </div>
          <div
            className={`${sharedClasses.cardBg} ${sharedClasses.cardPadding} ${sharedClasses.cardRounded}`}
          >
            <img
              src={iconTeam}
              alt="icon"
              className={`${sharedClasses.mxAuto} ${sharedClasses.mb4}`}
            />
            <h3
              className={`text-gray-700 ${sharedClasses.textLarge} ${sharedClasses.textBold} ${sharedClasses.mb2}`}
            >
              Reach a Global Audience
            </h3>
            <p className={sharedClasses.textSmall}>
              Connect with learners worldwide and share your expertise.
            </p>
          </div>
          <div
            className={`${sharedClasses.cardBg} ${sharedClasses.cardPadding} ${sharedClasses.cardRounded}`}
          >
            <img
              src={iconIcome}
              alt="icon"
              className={`${sharedClasses.mxAuto} ${sharedClasses.mb4}`}
            />
            <h3
              className={`text-gray-700 pt-10 ${sharedClasses.textLarge} ${sharedClasses.textBold} ${sharedClasses.mb2}`}
            >
              Earn Passive Income
            </h3>
            <p className={sharedClasses.textSmall}>
              Monetize your knowledge and earn money while you sleep.
            </p>
          </div>
        </div>
      </section>

      <section
        className={`${sharedClasses.primaryFg} ${sharedClasses.sectionPadding} ${sharedClasses.textCenter}`}
      >
        <h2
          className={`text-gray-700 ${sharedClasses.textMedium} ${sharedClasses.textBold} mb-4`}
        >
          Ready to Start Teaching?
        </h2>
        <p className={`${sharedClasses.textLarge} mb-4`}>
          Join our platform today and begin creating your course!
        </p>
        <button
          onClick={applyInstructorHandler}
          className={`px-6 py-3 mt-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900 ${sharedClasses.secondaryFg} ${sharedClasses.buttonPadding} ${sharedClasses.buttonRounded}`}
        >
          Apply Now
        </button>
      </section>
    </div>
  );
};

export default CourseCreator;
