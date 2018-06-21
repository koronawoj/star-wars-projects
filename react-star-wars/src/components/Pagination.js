import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {fetchDone, fetchPeople, fetchPerson} from "../actions";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles/index";

class Pagination extends Component {

    renderButton = (direction) => {
        let pages = this.calculatePages();
        let arrow;
        let disableArrow;
        if(direction === 'prev'){
            arrow = <ArrowBack/>;
            disableArrow = this.props.activePage === 1
        } else {
            arrow = <ArrowForward/>;
            disableArrow = this.props.activePage === pages.length

        }
        const {classes} = this.props;

        return (
            <Grid item className={classes.buttonWrapper}>
                <Button onClick={() => this.props.handleClick(direction)}
                        color="primary"
                        variant="fab"
                        disabled={disableArrow}
                        className={classes.buttonStyle}>
                    {arrow}
                </Button>
            </Grid>
        )
    }

    renderPagination = () => {
        const {classes} = this.props;
        let pages = this.calculatePages();
        let toRenderPages = [];

        if (this.props.activePage > 2 && this.props.activePage < pages.length - 1) {
            toRenderPages = pages.slice(this.props.activePage - 3, this.props.activePage + 2);
        } else if (this.props.activePage >= pages.length - 1) {
            toRenderPages = pages.slice(pages.length - 5);
        } else {
            toRenderPages = pages.slice(0, 5);
        }

        return toRenderPages.map(elem => {
            return (
                <Grid item key={elem} className={classes.buttonWrapper}>
                    <Button onClick={() => this.props.handleClick(elem)}
                            variant={this.props.activePage === elem ? 'raised' : null} color="primary"
                            className={classes.arrowStyle}
                    >
                        {elem}
                    </Button>
                </Grid>
            )
        });
    };

    calculatePages = () => {
        let pages = [];
        if (this.props.count) {
            for (let i = 1; i <= Math.ceil(this.props.count / 10); i++) {
                pages.push(i)
            }
        }
        return pages
    }

    render() {
        return (
            <Grid container justify="center">
                {this.renderButton('prev')}
                {this.renderPagination()}
                {this.renderButton('next')}
            </Grid>
        )
    }
}


const styles = theme => ({
    buttonWrapper: {
        width: '30px',
        padding: '30px 0',
        margin: '0 5px',
        [theme.breakpoints.up("sm")]: {
            width: '40px',
            padding: '40px 0',
            margin: '0 20px',
        },
    },

    buttonStyle: {
        width: '30px',
        minWidth: '30px',
        height: '30px',
        minHeight: '30px',
    },

    arrowStyle: {
        width: '40px',
        minWidth: '40px'
    }
});

export default withStyles(styles)(Pagination)