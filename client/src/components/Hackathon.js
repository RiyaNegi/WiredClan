import React, { PureComponent } from "react"
import Timer from "./Timer"
import hackathon from "./hackathon2.png"

class Hackathon extends PureComponent {
    render() {
        return (
            <div className="mt-4">
                <span className="">
                    <img className="col-12" src={hackathon} style={{ height: 300 }} alt="hackathon" />
                    {/* <div className="col-4 timer-box"><Timer /></div> */}
                </span>
                <div className="mt-3">
                    click here to enter -->
                    <button className="sign-btn">
                        Enter
                    </button>
                </div>
            </div>
        )
    }
}

export default Hackathon