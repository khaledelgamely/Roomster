import { Link } from "react-router-dom";
import "./footer.css";
const LandingPageFooter = () => {
  return (
    <div className=" mt-5 footer">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-5">
          <div className="socail">
            <p>Roomster</p>
            <h6 style={{color:'#ffff'}}>Our mission is to connect people with comfortable,<br/> affordable, and safe living spaces, wherever they may be. </h6>
            <div className="effect aeneas">
              <div className="buttons">
                <a
                  rel="noreferrer"
                  href="https://www.facebook.com/RoomsterCorp/?locale=ar_AR"
                  target="_blank"
                  className="fb"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://twitter.com/roomster"
                  target="_blank"
                  className="tw"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/roomster/"
                  target="_blank"
                  className="insta"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/roomster/about/"
                  target="_blank"
                  className="in"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <div className="List">
            <h5>Useful Links</h5>
            <ul>
              <a href="https://www.linkedin.com/company/roomster-corp-/"><li>About us</li></a>
              <Link to="/profile"><li>My profile</li></Link>
              <a href="https://www.linkedin.com/company/roomster-corp-/"> <li>Pricing plans</li></a>
              <a href="https://www.linkedin.com/company/roomster-corp-/"><li>Contacts Us</li></a>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <div className="List">
            <h5>Support</h5>

            <ul>
            <Link to ="/terms"><li>Terms</li></Link>
            <li>Help Center</li>
             <li>FAQ</li>
             <li>Bookmarks</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 mb-5">
          <div className="List">
            <h5>Latest News</h5>
            <ul>
            <Link to="/privacy"> <li>Privacy</li></Link>
            <li>Collections</li>
             <li>News</li>
             <li>Affiliate Program</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;
