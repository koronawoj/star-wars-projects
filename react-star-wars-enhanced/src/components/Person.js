import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchDone, fetchPerson} from "../actions";
import PropTypes from "prop-types";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core';


class Person extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        }
    }

    componentDidMount() {
        this.props.fetchDone(false);
        if (Object.keys(this.props.person).length === 0 && !this.props.error) {
            this.props.fetchPerson(this.props.match.params.id)
        }
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderFilms = () => {
        let helperArr = this.props.person.films.map(elem => elem.match(/[0-9]+/g)[0]);
        let titles = this.props.films.filter((elem) => {
            return helperArr.indexOf(elem.id) !== -1
        })
        return titles.map((elem, index) => (
            <Typography
                key={index}
                variant="subheading"
                gutterBottom
                color="primary"
            >
                {elem.title}
            </Typography>
        ))
    }

    renderPerson = () => {
        const style = {
            actionContainer: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0'
            },

            showMore: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                padding: '0'
            }
        }
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={8}>
                    <div>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Person">
                                        {this.props.person.name ? this.props.person.name.charAt(0).toLocaleUpperCase() : '*'}
                                    </Avatar>
                                }
                                title={this.props.person.name || ''}
                                subheader={`Birth date: ${this.props.person.birth_year || ''}`}
                            />
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Gender</TableCell>
                                            <TableCell numeric>{this.props.person.gender}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Height</TableCell>
                                            <TableCell numeric>{this.props.person.height}cm</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Mass</TableCell>
                                            <TableCell numeric>{this.props.person.mass}kg</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Skin color</TableCell>
                                            <TableCell numeric>{this.props.person.skin_color}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Eye color</TableCell>
                                            <TableCell numeric>{this.props.person.eye_color}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Hair color</TableCell>
                                            <TableCell numeric>{this.props.person.hair_color}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>

                            <CardActions>
                                <CardActions
                                    style={style.actionContainer}>
                                    <div>
                                        <Typography
                                            variant="headline"
                                            gutterBottom
                                            color="primary"
                                        >
                                            Films
                                            found: {this.props.person.films ? this.props.person.films.length : 0}
                                        </Typography>
                                    </div>
                                    <div>
                                        <div style={style.showMore}>
                                            <Typography
                                                variant="subheading"
                                                gutterBottom
                                                color="primary"
                                            >
                                                Show more
                                            </Typography>
                                            <div>
                                                <IconButton
                                                    onClick={this.handleExpandClick}
                                                    aria-expanded={this.state.expanded}
                                                    aria-label="Show more"
                                                >
                                                    <ExpandMoreIcon
                                                        style={this.state.expanded ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0)'}}/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </CardActions>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    {this.props.person.films ? this.renderFilms() : null}
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="raised"
                            color="primary"
                            style={{marginTop: '10px'}}
                            onClick={() => this.props.history.push("/")}
                        >
                            Back to List
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    };

    render() {
        return (
            <div>
                {!this.props.loading ? (
                    this.props.person && !this.props.error ? (
                        this.renderPerson()
                    ) : <div>{this.props.error || 'No person found'}</div>
                ) : null}
            </div>
        );
    }
}

Person.defaultProps = {
    person: {},
    error: '',
    films: [],
};

Person.propTypes = {
    person: PropTypes.object,
    error: PropTypes.string,
    films: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        person: state.person.personObj,
        error: state.error,
        films: state.films.filmsList,
    }
}

export default connect(mapStateToProps, {fetchPerson, fetchDone})(Person)

