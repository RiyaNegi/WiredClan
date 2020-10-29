import React, { Component } from "react"
import { Link } from "react-router-dom";


class FAQ extends Component {
    render() {
        return <div className="faq-card p-3">
            <label className="text-muted">Code Of Conduct</label>
            <label className="faq-text">
                By participating in ~hackocracy 2020, you agree to abide by the following code of conduct:
                <li>Please treat all other hackers with the utmost respect.  We ask that you act kindly, behave professionally, and not insult or put down other attendees.  Remember that harassment and racist, sexist, or exclusionary jokes are not appropriate for this event and will result in direct disqualification of the complete team. If at any point you see a fellow hacker being harassed, please contact an organizer.</li>
                <li>Please treat our sponsors, organizers, and judges with the utmost respect. Any disrespect might have further consequences. </li>
                {/* <li>Icons provided by < a target="_blank" href="https://icons8.com" className="text-muted"> Icons8</a >.</li> */}
            </label>
            {/* <Link to="#" className="mt-0"><h6>Learn more</h6></Link> */}

        </div>
    }
}

export default FAQ