import React, { Component } from "react"
import { Link } from "react-router-dom";


class FAQ extends Component {
    render() {
        return <div className="faq-card p-3">
            <label className="text-muted">FAQ</label>
            <label className="faq-text">
                <li>If participating as a team, only one member needs to register for the hackathon(You can add teammates later).</li>
                <li>You only need an awesome idea to register (But you do need to provide a functioning demo/project before publishing).</li>
                <li>Voting will be crowd-sourced. Top-voted project will win.</li>
                <li>Plagiarized projects will be disqualified.</li>
                <li>Icons provided by < a target="_blank" href="https://icons8.com" className="text-muted"> Icons8</a >.</li>
            </label>
            {/* <Link to="#" className="mt-0"><h6>Learn more</h6></Link> */}

        </div>
    }
}

export default FAQ