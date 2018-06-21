import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchDone, fetchPerson} from "../actions";
import PropTypes from "prop-types";
import {
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

class Filters extends Component {
    constructor() {
        super();
        this.state = {
            filtersConf: {},
            open_eye_color: false,
            open_gender: false,
            open_hair_color: false,
            open_skin_color: false,
            eye_color: '',
            gender: '',
            hair_color: '',
            skin_color: '',
            filterOption: {
                eye_color: '',
                gender: '',
                hair_color: '',
                skin_color: '',
            }
        }
    }

    componentDidMount() {
        this.configureFilters()
    }

    configureFilters = () => {
        let filters = this.props.people.reduce((acc, cur, index) => {
            acc.eye_color = acc.eye_color.indexOf(cur.eye_color) === -1 ? [...acc.eye_color, cur.eye_color] : acc.eye_color;
            acc.gender = acc.gender.indexOf(cur.gender) === -1 ? [...acc.gender, cur.gender] : acc.gender;
            acc.hair_color = acc.hair_color.indexOf(cur.hair_color) === -1 ? [...acc.hair_color, cur.hair_color] : acc.hair_color;
            acc.skin_color = acc.skin_color.indexOf(cur.skin_color) === -1 ? [...acc.skin_color, cur.skin_color] : acc.skin_color;
            if (index === this.props.people.length - 1) {
                acc.eye_color.sort();
                acc.gender.sort();
                acc.hair_color.sort();
                acc.skin_color.sort();
            }
            return acc
        }, {
            eye_color: [],
            gender: [],
            hair_color: [],
            skin_color: []
        })
        this.setState({
            filtersConf: filters
        })
    }

    handleClose = (id) => {
        this.setState({
            [id]: false
        })
    }
    handleOpen = (id) => {
        this.setState({
            [id]: true
        })
    }

    handleChange = event => {
        this.setState({
            filterOption: {
                ...this.state.filterOption,
                [event.target.name]: event.target.value,
            }
        }, () => {
            this.props.onFilterPeople(this.state.filterOption)
        });
    };

    renderFilters = () => {
        const {classes} = this.props;
        return Object.keys(this.state.filtersConf).map((key, index) => {
            return (
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Grid container justify="center">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor={`controlled-open-select${key}`}>
                                {key.charAt(0).toLocaleUpperCase() + key.slice(1).replace(/_/g, " ")}
                            </InputLabel>
                            <Select
                                open={this.state[`open_${key}`]}
                                onClose={() => this.handleClose(`open_${key}`)}
                                onOpen={() => this.handleOpen(`open_${key}`)}
                                value={this.state.filterOption[key]}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: key,
                                    id: `controlled-open-select${key}`,
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.filtersConf[key].map((elem, index) => (
                                    <MenuItem key={index} value={elem}>{elem}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )
        });
    }


    render() {
        return (
            <div>
                <Grid container justify="space-between">
                    {this.renderFilters()}
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

Filters.defaultProps = {
    people: [],
};

Filters.propTypes = {
    people: PropTypes.array,
    onFilterPeople: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        people: state.people.peopleList,
    }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Filters))

