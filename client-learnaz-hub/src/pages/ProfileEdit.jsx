/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import axios from "axios";

const INPUT_CLASS = "w-full p-2 border border-input rounded-lg";
const BUTTON_CLASS = "rounded-lg";

const ProfileEdit = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookUsername, setFacebookUsername] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [biography, setBiography] = useState("");
  const [linkedInResourceId, setLinkedInResourceId] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [coursesEnrolled, setCoursesEnrolled] = useState(0);
  const [coursesCreated, setCoursesCreated] = useState(0);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/api/v1/users/${props.userData?._id}`;

  useEffect(() => {
    if (props.userData) {
      setFirstName(props.userData.firstName);
      setLastName(props.userData.lastName);
      setTwitterUsername(props.userData.twitterUsername);
      setTwitterURL(props.userData.twitterURL);
      setFacebookUsername(props.userData.facebookUsername);
      setFacebookURL(props.userData.facebookURL);
      setBiography(props.userData.biography);
      setLinkedInResourceId(props.userData.linkedInResourceId);
      setLinkedInURL(props.userData.linkedInURL);
      setCoursesEnrolled(props.userData.coursesEnrolled?.length);
      setCoursesCreated(props.userData.coursesCreated?.length);
    }
  }, [props]);

  const editProfileHandler = (e) => {
    e.stopPropagation();
    props.setEditClicked(true);
  };

  // update user data in database
  const saveProfileHandler = async (e) => {
    e.preventDefault();

    const updatedData = {
      firstName,
      lastName,
      twitterUsername,
      twitterURL,
      facebookUsername,
      facebookURL,
      biography,
      linkedInResourceId,
      linkedInURL,
    };

    try {
      const res = await axios.patch(apiUrl, updatedData);
      console.log(res.data);
    } catch (error) {
      console.log("Error updating user data: ", error);
    }
  };

  return (
    <div className="w-full flex flex-col bg-card text-card-foreground p-6">
      <div className="mt-24 mx-20 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        {!props.editClicked ? (
          <button
            onClick={editProfileHandler}
            className={`bg-secondary text-secondary-foreground font-bold hover:underline font-serif hover:bg-secondary/80 px-4 py-2 ${BUTTON_CLASS}`}
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => props.setEditClicked(false)}
            className={`bg-gray-600 text-white hover:underline font-serif hover:bg-secondary/80 px-4 py-2 ${BUTTON_CLASS}`}
          >
            Cancel
          </button>
        )}
      </div>

      <form className="space-y-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-muted-foreground mb-2">
              First Name
            </label>
            <input
              type="text"
              className={INPUT_CLASS}
              value={firstName || ""}
              disabled={!props.editClicked}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-2">
              Last Name
            </label>
            <input
              type="text"
              className={INPUT_CLASS}
              value={lastName || ""}
              disabled={!props.editClicked}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-2">Twitter</label>
            <div className="flex space-x-2">
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="http://www.twitter.com/"
                value={twitterURL || ""}
                disabled={!props.editClicked}
                onChange={(e) => setTwitterURL(e.target.value)}
              />
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="Username"
                value={twitterUsername || ""}
                disabled={!props.editClicked}
                onChange={(e) => setTwitterUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground mb-2">Facebook</label>
            <div className="flex space-x-2">
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="http://www.facebook.com/"
                value={facebookURL || ""}
                disabled={!props.editClicked}
                onChange={(e) => setFacebookURL(e.target.value)}
              />
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="Username"
                value={facebookUsername || ""}
                disabled={!props.editClicked}
                onChange={(e) => setFacebookUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-muted-foreground mb-2">
              Biography
            </label>
            <textarea
              className={`${INPUT_CLASS} h-24`}
              rows="4"
              value={biography || ""}
              disabled={!props.editClicked}
              onChange={(e) => setBiography(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block text-muted-foreground mb-2">LinkedIn</label>
            <div className="flex space-x-2">
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="http://www.linkedin.com/"
                value={linkedInURL || ""}
                disabled={!props.editClicked}
                onChange={(e) => setLinkedInURL(e.target.value)}
              />
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="Resource ID"
                value={linkedInResourceId || ""}
                disabled={!props.editClicked}
                onChange={(e) => setLinkedInResourceId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center font-serif">
          <p>
            Enrolled Courses:{" "}
            <span className="font-bold text-xl ml-1">
              {coursesEnrolled === 0 ? "NIL" : coursesEnrolled}
            </span>
          </p>
          <p className="mt-1 mx-4">•</p>
          <p>
            Courses created:{" "}
            <span className="font-bold text-xl ml-1">{coursesCreated}</span>
          </p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!props.editClicked}
            onClick={saveProfileHandler}
            className={`${
              !props.editClicked && "text-gray-400"
            } bg-primary text-primary-foreground mr-32 hover:underline font-serif text-2xl hover:bg-primary/80 ${BUTTON_CLASS}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
