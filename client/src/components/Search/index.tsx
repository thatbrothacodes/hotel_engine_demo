import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

interface IComponentProps {
    onSearchClick: () => void,
    onQueryChange: (query: string) => void,
    query: string
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        searchBoxInput: {
            backgroundColor: theme.palette.common.white,
            '&:before': {
                borderBottom: 'none',
            },
            '&:hover': {
                borderBottom: 'none',
            },
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
          }
    })
);

export default (props: IComponentProps) => {
    const classes = useStyles();

    const handleQueryEnter = (event :React.KeyboardEvent) => {
        if(event.key.toLowerCase() === 'enter') {
            props.onSearchClick();
        }
    }

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onQueryChange(event.target.value);
    }

    const handleSearchClick = () => {
        props.onSearchClick();
    }

    return (
        <InputBase
            id="input-with-icon-textfield"
            placeholder="Search..."
            className={classes.searchBoxInput}
            onChange={handleQueryChange}
            value={props.query}
            onKeyPress={handleQueryEnter}
            fullWidth
            endAdornment={
                <InputAdornment position="start">
                    <IconButton disabled={props.query.length < 3} color="primary" onClick={handleSearchClick} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }/>
    );
}