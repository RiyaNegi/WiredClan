import React, { Component } from "react"
import { Link } from "react-router-dom";


class FAQ extends Component {
    render() {
        return <div className="faq-card p-3">
            <label className="text-muted">How To Start</label>
            <label className="faq-text">
                <li>If participating as a team, only one member needs to click on "Start", at the start of the hackathon.</li>
                <li>Once one member clicks "Start", you'll get a private post, to which you can add the rest of your teammates.</li>
                <li>Plagiarized projects will be disqualified.</li>
                <li>If page doesn't load, try a hard refresh. In case of issues, contact the organizing team.</li>
                {/* <li>Icons provided by < a target="_blank" href="https://icons8.com" className="text-muted"> Icons8</a >.</li> */}
            </label>
            {/* <Link to="#" className="mt-0"><h6>Learn more</h6></Link> */}

        </div>
    }
}

export default FAQ