import { useState } from "react";

const INPUT_CLASS = "w-full p-2 border border-input rounded-lg";
const BUTTON_CLASS = "rounded-lg";

const ProfileEdit = () => {
  const [firstName, setFirstName] = useState("Chiamaka");
  const [lastName, setLastName] = useState("Ogbodo");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookUsername, setFacebookUsername] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [biography, setBiography] = useState("");
  const [linkedInResourceId, setLinkedInResourceId] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");

  return (
    <div className="w-full flex flex-col bg-card text-card-foreground p-6">
      <div className="mt-24 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        <button
          className={`bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 ${BUTTON_CLASS}`}
        >
          Edit
        </button>
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
              value={firstName}
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
              value={lastName}
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
                value={twitterURL}
                onChange={(e) => setTwitterURL(e.target.value)}
              />
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="Username"
                value={twitterUsername}
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
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
              />
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="Username"
                value={facebookUsername}
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
              value={biography}
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
                value={linkedInURL}
                onChange={(e) => setLinkedInURL(e.target.value)}
              />
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="Resource ID"
                value={linkedInResourceId}
                onChange={(e) => setLinkedInResourceId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 ${BUTTON_CLASS}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
