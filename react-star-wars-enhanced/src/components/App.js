import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Grid, Typography} from "@material-ui/core";
import {fetchPeople, loaderLinear, fetchFilms, fetchAllPeople} from '../actions'
import Loader from './Loader'
import TableWrapper from './Table'
import Person from "./Person";
import {withStyles} from "@material-ui/core/styles/index";

class App extends Component {
    componentDidMount() {
        this.props.loaderLinear(true)
        this.props.fetchPeople(1)
        this.props.fetchFilms()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.count && !this.props.count) {
            this.fetchManyPeople(nextProps.count)
        }
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

    fetchManyPeople = (count) => {
        let pages = [];
        if (this.props.count) {
            for (let i = 1; i <= Math.ceil(count / 10); i++) {
                pages.push(i)
            }
        }
        this.props.fetchAllPeople(9)
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {this.props.showLoader ? <Loader/> : null}
                    {this.renderHeader()}
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
    count: 0,
};

App.propTypes = {
    showLoader: PropTypes.bool,
    loadingSpinner: PropTypes.bool,
    count: PropTypes.number,
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
        count: state.people.count,
    }
}

export default connect(mapStateToProps, {
    fetchPeople,
    loaderLinear,
    fetchFilms,
    fetchAllPeople
})(withStyles(styles)(App))

