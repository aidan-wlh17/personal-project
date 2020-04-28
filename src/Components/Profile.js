import React from 'react'
import {connect} from 'react-redux'

const Profile = (props) => {
    return(
        <div>
            <p>{props.user.username}</p>
            <p>{props.user.image}</p>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Profile)