import React, { Component } from 'react';
import { connect } from 'react-redux';

import Graph from 'vis-react';

import { userInfoFetchData } from "../store/userInfo/actions/userInfo";


class UserTree extends Component{

    constructor(props){
        super(props)
        props.userInfo['leftLeg'] = []
    }

    componentDidMount(){
        this.props.fetchData("/api/v1/users/" + window.flaskSession );
        }




    render(){

        if(this.props.hasError){
            return <div>Error</div>
        }
        if(this.props.isLoading){
            return <div>Loading ...</div>
        }

        let userInfoJson = []

        if(this.props.userInfo['leftLeg'] != []) {
            userInfoJson = this.props.userInfo['leftLeg'].map( (json) => {
                let key = "_id"
                delete json[key]
            })
        }

        console.log(userInfoJson)

        let graph = {
            //node: JSON.parse(userInfoJson),
            edges: [
                {from: 988750842, to:934750842}
            ]
        };

        let options = {
            layout: {
                hierarchical: true
            },
            edges: {
                color: "#000000"
            }
        };

        let events = {
            select: function(event) {
                var { nodes, edges } = event;
            }
        };


        return (
            <div>

                {console.log(this.props.userInfo['leftLeg'])}
                safsa
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        hasError: state.userInfoHasError,
        isLoading: state.userInfoIsLoading
    };
};


const mapDispatchToProps = (dispatch) => {
    return{
        fetchData: (url) => dispatch(userInfoFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTree)