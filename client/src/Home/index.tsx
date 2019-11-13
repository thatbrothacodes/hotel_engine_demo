import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import Search from '../components/Search';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            borderRadius: '30px'
        },
        root: {
            backgroundColor: theme.palette.primary.main,
            height: '100%'
        },
        searchBoxInput: {
            backgroundColor: theme.palette.common.white,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    })
);

export default withRouter((props: RouteComponentProps) => {
    const classes = useStyles();
    const [query, setQuery] = React.useState('');
    
    const handleQueryChange = (q: string) => {
        setQuery(q);
    };

    const handleSearchClick = () => {
        props.history.push(`/search?q=${query}`);
    }

    return (
        <div className={classes.root}>
            <Grid className={classes.container} justify="center" alignItems="center" container>
                <Grid item xs={6}>
                    <Typography align="center" variant="h3" gutterBottom>
                        <GitHubIcon fontSize="large" /> Repository Search
                    </Typography>
                    <Paper className={classes.paper}>
                        <Search
                            query={query}
                            onQueryChange={handleQueryChange}
                            onSearchClick={handleSearchClick}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
});
