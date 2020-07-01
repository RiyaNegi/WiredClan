import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";



class renderMembers extends Component {
    state = {
        email: '',
        teammates: [],
        removeSearchedUser: false
    }

    onInputChange(email) {
        this.setState({ email });
    }

    handleSearchClick() {
        this.props.fetchEmailUser(this.state.email)
        this.setState({ removeSearchedUser: false, showMessage: null })
    }

    handleAddClick(fields, { id, firstName, lastName, imageUrl }) {
        return () => {
            if (fields.getAll() && fields.getAll().filter((item) => item.id === id).length > 0) {
                this.setState({ removeSearchedUser: true, showMessage: "This user is already added in your team" })
                return
            }
            else {
                fields.push({ id, firstName, lastName, imageUrl })
            }
            this.setState({ removeSearchedUser: true })
        }
    }

    render() {
        const { fields } = this.props;
        return <div className="px-4 pb-3">
            <div className="py-2" style={{}}>
                <div className="d-flex post-comment justify-content-between">
                    <input className="search-user-input" name="email" type="email" placeholder="Search teammate via email..." value={this.state.email}
                        onChange={event => this.onInputChange(event.target.value)}
                        onKeyPress={(event => {
                            if (event.key === 'Enter') {
                                this.handleSearchClick();
                            }
                        })}
                    />
                    <button
                        className="add-user-button"
                        type="button"
                        onClick={this.handleSearchClick.bind(this)}
                    ><FontAwesomeIcon
                            icon={faSearch}
                            size="1x"
                            color="gray"
                        />
                    </button>
                </div>
                <div className="d-flex flex-column mt-3">

                    {this.state.showMessage && <span style={{ color: "red" }}>{this.state.showMessage}</span>}
                    {this.props.searchedUser && !this.state.removeSearchedUser && (<span className="d-flex search-email-card p-3  mt-2 justify-content-between">
                        <span className="font-weight-bold">Found this user:</span>{" "}
                        <span>
                            <img
                                src={this.props.searchedUser.imageUrl}
                                style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                                alt="userIcon"
                                className="mr-1 font-weight-bold"
                            />  {" "}
                            {this.props.searchedUser.firstName} {this.props.searchedUser.lastName}
                        </span>
                        <button className="add-user-button" type="button" title="Add Member"
                            onClick={this.handleAddClick(fields, this.props.searchedUser)}><FontAwesomeIcon
                                icon={faPlus}
                                size="1x"
                                color="gray"
                            /></button>
                    </span>)}
                </div>

            </div>
            <div className="font-weight-bold mt-4">Teammates</div>
            {
                (fields.getAll() && fields.getAll().map((item, index) => (
                    <div key={index} >
                        <div name={`member`} className="row font-weight-bold mt-2 d-flex justify-content-between search-email-card p-3 mx-1 " >
                            <span className="">
                                {" "}
                                <img
                                    src={item.imageUrl}
                                    style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                                    alt="userIcon"
                                    className="mr-1"
                                />  {" "}
                                {item.firstName} {item.lastName}
                            </span>
                            <button
                                className="add-user-button"
                                type="button"
                                title="Remove Member"
                                onClick={() => fields.remove(index)}
                            ><FontAwesomeIcon
                                    icon={faTimes}
                                    size="1x"
                                    color="gray"
                                /> </button>
                        </div>
                    </div>)))
            }
        </div >
    }


}


const mapStateToProps = (state) => {
    return {
        searchedUser: state.createPost.searchedUser
    };
};


export default connect(mapStateToProps, { ...postActions })(renderMembers);
