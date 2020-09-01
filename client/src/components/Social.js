import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faFacebook,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

import React from "react";

export default function SocialFollow() {
    return (
        <div class="social-container">
            <a href="https://www.linkedin.com/company/wiredclan/?viewAsMember=true"
                className="youtube social">
                <FontAwesomeIcon icon={faLinkedin} size="2x" color="gray" />
            </a>
            {/* <a href="https://www.facebook.com/learnbuildteach/"
                className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a> */}
            <a href="https://www.instagram.com/wiredclan_official/"
                className="instagram social ml-3">
                <FontAwesomeIcon icon={faInstagram} size="2x" color="gray" />
            </a>
        </div>
    );
}