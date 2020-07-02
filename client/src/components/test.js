import React, { PureComponent } from 'react';

import { ToastContainer, toast } from 'react-toastify';

class HomePage extends PureComponent {
    render() {
        const notify = () => toast("Wow so easy !");

        return (
            <div>
                <button onClick={notify}>Notify !</button>
                <ToastContainer />
            </div>
        );
    }
}


export default HomePage;