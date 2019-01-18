

//==============================================================================

//-- Dependencies --------------------------------
import dynamic from 'next/dynamic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { USERVISITS_QUERY, FRIENDSVISITS_QUERY } from '../services/queries.js';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import React, { Component } from 'react';
import MapIndex from '../components/MapHeader/MapIndex.js';
import Legend from '../components/MapLegend/Legend.js';

//-- Constants -----------------------------------
const testUserId = "cjqt5c95y00s40894zs7m6q4v";

//------------------------------------------------
const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
});


//== React lifecycle methods ===================================================

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return this.makeQueriesAndRenderMap();
    }
    displayMap(visitsUser, visitsFriends) {
        return (
            <React.Fragment>
                <MapIndex />
                <div>
                    <DynamicMap
                        visitsFriends={visitsFriends}
                        visitsUser={visitsUser}
                    />
                    <Legend />
                </div>
            </React.Fragment>
        );
    }


//== Query response handlers ===================================================

    //-- Query Renderers -----------------------------
    makeQueriesAndRenderMap() {
        // Not strictly necessary, but it clarifies intent
        return this.requestVisitsUser();
    }
    requestVisitsUser() {
        let query = USERVISITS_QUERY;
        let variables = {id: testUserId};
        let responseHandler = (response) => {
            return this.handleResponseVisitsUser(response);
        };
        return (
            <Query query={query} variables={variables}>
                {responseHandler}
            </Query>
        );
    }
    requestVisitsFriends(visitsUser) {
        let query = FRIENDSVISITS_QUERY;
        let variables = {id: testUserId};
        let responseHandler = (response) => {
            return this.handleResponseVisitsFriends(response, visitsUser);
        };
        return (
            <Query query={query} variables={variables}>
                {responseHandler}
            </Query>
        );
    }

    //-- Subcomponent Display ------------------------
    displayError(error) {
        return (<div>Error</div>);
    }
    displayLoading() {
        return (<div>Loading</div>);
    }

    //-- Response handlers ---------------------------
    handleResponseVisitsUser(response) {
        // Get data from response
        let error = response.error;
        let loading = response.loading;
        const visitsUser = response.data;
        // Handle loading and errors
        if(loading) {
            return this.displayLoading();
        }
        if(error) {
            return this.displayError(error);
        }
        // Continue Rendering
        return this.requestVisitsFriends(visitsUser);
    }
    handleResponseVisitsFriends(response, visitsUser) {
        // Get data from response
        let error = response.error;
        let loading = response.loading;
        const visitsFriends = response.data;
        // Handle loading and errors
        if(loading) {
            return this.displayLoading();
        }
        if(error) {
            return this.displayError(error);
        }
        // Continue Rendering
        return this.displayMap(visitsUser, visitsFriends);
    }
}
