import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Grid, Typography} from "@material-ui/core";
import {fetchPeople, loaderLinear, fetchFilms} from '../actions'
import Loader from './Loader'
import TableWrapper from './Table'
import Person from "./Person";
import EnhancedTable from "./Test";
import {withStyles} from "@material-ui/core/styles/index";

class App extends Component {
    componentDidMount() {
        this.props.loaderLinear(true)
        this.props.fetchPeople(1)
        this.props.fetchFilms()
    }

    renderHeader = () => {
        const {classes} = this.props;

        return (
        <Grid
            container
            justify="center"
        >
            <div className={classes.headerStyle}>
                Star Wars Characters
            </div>
        </Grid>
    )
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {this.props.showLoader ? <Loader/> : null}
                    {this.renderHeader()}
                    {/*<EnhancedTable/>*/}
                    <Switch>
                        <Route exact path="/" component={() => <TableWrapper
                            loading={this.props.showLoader}
                            loadingSpinner={this.props.loadingSpinner}
                        />}/>
                        <Route path="/person/:id" component={(props) => <Person
                            {...props}
                            loading={this.props.showLoader}
                        />}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

App.defaultProps = {
    showLoader: false,
    loadingSpinner: false,
};

App.propTypes = {
    showLoader: PropTypes.bool,
    loadingSpinner: PropTypes.bool,
};

const styles = theme => {
    return ({
        headerStyle: {
            color: theme.palette.primary[500],
            fontSize: 18,
            margin: '20px 0',
            [theme.breakpoints.up("sm")]: {
                fontSize: 32,
            },
        }
    });
}

function mapStateToProps(state) {
    return {
        showLoader: state.loader.linearLoader,
        loadingSpinner: state.loader.loadingSpinner,
    }
}

export default connect(mapStateToProps, { fetchPeople, loaderLinear, fetchFilms })(withStyles(styles)(App))

