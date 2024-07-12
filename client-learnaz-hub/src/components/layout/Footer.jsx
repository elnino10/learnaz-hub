import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="text-white p-8 w-full bg-gray-900"
    >
      {/* correct routing */}
      <div className="pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/signup">Teach On Learnaz-Hub</Link>
        <Link to="/signup">About Learnaz-Hub</Link>
        <Link to="/signup">Contact us</Link>
        <Link to="/signup">Help</Link>
        <Link to="/signup">Terms</Link>
        <Link to="/signup">Privacy Policy</Link>
      </div>
      <div>
        <div className="flex gap-6">
          <SocialIcon
            style={{ height: 40, width: 40 }}
            bgColor="gray"
            url="https://linkedin.com/#"
          />
          <SocialIcon
            style={{ height: 40, width: 40 }}
            url="https://facebook.com/#"
            network="facebook"
            bgColor="gray"
          />

          <SocialIcon
            style={{ height: 40, width: 40 }}
            url="https://twitter.com/in/#"
            network="twitter"
            bgColor="gray"
          />
        </div>
      </div>
      <div className="pt-12 flex justify-between">
        <div className="text-bold text-2xl">Learnaz-Hub</div>
        <div>
          <p>© {currentYear} Learnaz-Hub</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
