import React, { Component } from "react"
import { Link } from "react-router-dom";


class FAQ extends Component {
    render() {
        return <div className="faq-card p-3">
            <label className="text-muted">Code Of Conduct</label>
            <label className="faq-text">
                By participating in Flamingo, you agree to abide by the following code of conduct:
                <li>Design competition is only for students.</li>
                <li>Please note that plagiarized entries will be disqualified immediately.
</li>
                <li>If the entry belongs to a third party, the responsibility of obtaining the permission is solely of the participant.
</li>
                <li>We may publish your entry on our Insta Handle.Please ensure that it does not breach any third party confidentiality agreement.
</li>
                <li>We do not take any responsibility of any breach of IP confidentiality of the respective client or whomsoever owns the project.
</li>
                <li>We will not be liable for any misinterpreted entry, design or content.
</li>
                {/* <li>Icons provided by < a target="_blank" href="https://icons8.com" className="text-muted"> Icons8</a >.</li> */}
            </label>
            {/* <Link to="#" className="mt-0"><h6>Learn more</h6></Link> */}

        </div>
    }
}

export default FAQ




