import React, {Component} from 'react';
import {connect} from 'react-redux'
import {test, fetchPeople, fetchPerson, fetchDone, changePage, setActivePeople} from '../actions'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableCell, TableHead, TableRow, Hidden} from '@material-ui/core';
import Pagination from './Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles/index";
import Filters from './Filters'

class TableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            activePeople: [],
            activePeoplePerPage: [],
        }
    }

    componentDidMount() {
        this.props.setActivePeople(this.props.activePeople.length ? this.props.activePeople : this.props.people);
        this.setState({
            activePage: this.props.activePage,
            activePeople: this.props.people
        }, () => {
            this.setactivePeoplePerPage(this.state.activePage)
        })
        this.props.fetchDone(false);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.afterFetch && nextProps.afterFetch) {
            this.props.history.push(`/person/${this.props.id}`);
            this.props.fetchDone(false);
        }
    }

    filterPeople = (obj) => {
        let keys = Object.keys(obj).filter(elem => obj[elem]);
        let people = this.props.people.filter(elem => {
            return keys.every(item => obj[item] === elem[item])
        })
        this.props.setActivePeople(people);
        this.setState({
            activePeople: people
        }, () => {
            this.setactivePeoplePerPage(1)
            this.props.changePage(1);
        })
    }

    setactivePeoplePerPage = (activePage) => {
        this.setState({
            activePeoplePerPage: this.props.activePeople.slice((activePage * 10 - 10), (activePage * 10))
        })
    }

    handleClickRow = (event, elem) => {
        let id = elem.url.match(/[0-9]+/g)[0];
        this.props.fetchPerson(id);
    }

    renedrTable = () => {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={8}>
                    <div style={{position: 'relative'}}>
                        {this.props.loadingSpinner && this.props.people.length ? (
                            <div className={classes.spiner}>
                                <CircularProgress size={50}/>
                            </div>
                        ) : null}
                            <div>
                                <Filters onFilterPeople={this.filterPeople}/>
                        {this.state.activePeoplePerPage.length ? (
                                <Table>
                                    <Hidden only="xs">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Height</TableCell>
                                                <TableCell>Mass</TableCell>
                                                <TableCell>Skin color</TableCell>
                                                <TableCell>Gender</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Hidden>
                                    <TableBody>
                                        {this.state.activePeoplePerPage.map((elem, index) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    onClick={event => this.handleClickRow(event, elem)}
                                                    style={{cursor: 'pointer'}}
                                                    classes={{
                                                        root: classes.tableBodyRow
                                                    }}
                                                >
                                                    <TableCell
                                                        datatitle="Name:"
                                                        classes={{root: classes.tableBodyData}}
                                                    >
                                                        {elem.name}
                                                    </TableCell>
                                                    <TableCell
                                                        datatitle="Height:"
                                                        classes={{root: classes.tableBodyData}}
                                                    >
                                                        {elem.height}
                                                    </TableCell>
                                                    <TableCell
                                                        datatitle="Mass:"
                                                        classes={{root: classes.tableBodyData}}
                                                    >
                                                        {elem.mass}
                                                    </TableCell>
                                                    <TableCell
                                                        datatitle="Skin color:"
                                                        classes={{root: classes.tableBodyData}}
                                                    >
                                                        {elem.skin_color}
                                                    </TableCell>
                                                    <TableCell
                                                        datatitle="Gender:"
                                                        classes={{root: classes.tableBodyData}}
                                                    >
                                                        {elem.gender}
                                                    </TableCell>
                                                </TableRow>

                                            );
                                        })}
                                    </TableBody>
                                </Table>
                        ) : this.noData()}
                            </div>
                    </div>
                </Grid>
                {this.state.activePeoplePerPage.length ? (
                    <Pagination
                        count={this.state.activePeople.length}
                        people={this.state.activePeople}
                        handleClick={this.handleClick}
                    />
                ) : null}
            </Grid>
        )
    }

    handleClick = (elem) => {
        if (elem !== this.props.activePage) {
            this.setState({
                activePage: elem === 'prev' ? this.props.activePage - 1 : elem === 'next' ? this.props.activePage + 1 : elem,
            }, () => {
                this.props.changePage(this.state.activePage);
                this.setactivePeoplePerPage(this.state.activePage);
            })
        }
    }

    noData = () => (
        <Grid container justify="center">
            <div style={{padding: '200px 0'}}>
                {this.props.error}
            </div>
        </Grid>
    )

    render() {
        return (
            <div>
                {this.renedrTable()}
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3
    },

    spiner: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(96,125,139,0.1)',
    },

    tableBodyRow: {
        //Small Screen
        display: "block",
        height: "auto",
        marginTop: 10,
        backgroundColor: "#CFD8DC",

        [theme.breakpoints.up("sm")]: {
            height: 48,
            display: "table-row",
            border: 0,
            backgroundColor: "#ffffff"
        },
        '&:hover': {
            backgroundColor: '#ECEFF1',
        },
    },

    tableBodyData: {
        display: "block",
        padding: 12,
        fontSize: 14,
        textAlign: "right",
        border: 0,

        // Adding each data table head from here
        "&:before": {
            content: "attr(datatitle)",
            float: "left",
            fontWeight: 600,
            color: "#00000"
        },
        "&:last-child": {
            padding: 12,
        },

        [theme.breakpoints.up("sm")]: {
            display: "table-cell",
            padding: "20px 24px",
            fontSize: 14,
            textAlign: "left",
            borderBottom: "1px solid #ccc",

            "&:before": {
                content: "",
                display: "none"
            }
        }
    }
});

TableWrapper.defaultProps = {
    people: [],
    activePeople: [],
    loading: false,
    loadingSpinner: false,
    count: 0,
    activePage: 1,
    error: '',
    films: [],
};

TableWrapper.propTypes = {
    people: PropTypes.array,
    activePeople: PropTypes.array,
    loading: PropTypes.bool,
    loadingSpinner: PropTypes.bool,
    count: PropTypes.number,
    activePage: PropTypes.number,
    error: PropTypes.string,
    films: PropTypes.array,
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        people: state.people.peopleList,
        activePeople: state.people.activePeople,
        count: state.people.count,
        activePage: state.people.activePage,
        id: state.person.id,
        error: state.error,
        afterFetch: state.loader.fetchDone,
        films: state.films.filmsList,
    }
}

export default connect(mapStateToProps, {
    fetchPeople,
    fetchPerson,
    fetchDone,
    changePage,
    setActivePeople
})(withRouter(withStyles(styles)(TableWrapper)))

