import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import BookIcon from '@material-ui/icons/Book';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Search from '../components/Search';

import { searchRepositories, searchNextRepositories, searchPrevRepositories } from '../actions';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
      margin: 10,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    chip: {
      margin: theme.spacing(0, 1, 1, 0)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    headerLink: {
      textDecoration: 'none',
      color: '#ffffff'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    listRoot: {
      display: 'flex',
      flexDirection: 'column',
    },
    listItemAvatar: {
      marginTop: '0px'
    },
    paperRoot: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      height: '70vh',
      marginTop: '20px'
    },
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
    },
    searchPaper: {
      padding: theme.spacing(1, 2, 1, 2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: '30px'
    },
    spinnerContainer: {
      height: '100%'
    },
    tableWrapper: {
      overflow: 'auto',
    },
    repositoryDetails: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    repositoryTopicDetails: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center'
    },
    toolbar: theme.mixins.toolbar,
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    }
  }),
);

type SortDirection =
  "desc" |
  "asc";

type SortOrder =
  "best+match" |
  "stars";

interface IComponentProps {
  repositories: any,
  pages: number,
  total: number,
  loading: boolean,
  searchRepositories: (query :string, sort :string, order :string) => void,
  searchNextRepositories: (query :string, sort :string, order :string, page :number) => void,
  searchPrevRepositories: (query :string, sort :string, order :string, page :number) => void
};

const pageSize = 30;

function Results(props: IComponentProps) {
  const classes = useStyles();
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const [orderBy, setOrderBy] = React.useState<SortOrder>("best+match");
  const [sortDir, setSortDir] = React.useState<SortDirection>("desc");
  const pageEndIndex = (page + 1) * pageSize;
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryString = params.get('q') || '';
    
    setQuery(queryString);
    props.searchRepositories(queryString, orderBy, sortDir);
  },[location.search]);

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected :string[] = event.target.value.split(' ');
    const field :SortOrder = selected[0] as SortOrder;
    const direction :SortDirection = selected[1] as SortDirection;

    setOrderBy(field);
    setSortDir(direction);
    setPage(0);

    props.searchRepositories(query, field, direction);
  };

  const handleSearchClick = () => {
    setOrderBy("best+match");
    setSortDir("desc");
    setPage(0);
    
    navigate(`/search?q=${query}`);
  }

  const handleQueryChange = (q: string) => {
    setQuery(q);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    const apiPage = newPage + 1;

    setPage(newPage);

    if(newPage > page) {
      props.searchNextRepositories(query, orderBy, sortDir, apiPage);
    } else {
      props.searchPrevRepositories(query, orderBy, sortDir, apiPage);
    }
      
  };

  const sortItems = (a :any, b :any) => {
    let sortOrder = "";

    if(orderBy === "stars") {
      sortOrder = "stargazers_count";
    } else {
      sortOrder = "score";
    }

    if(sortDir === "desc") {
      return b[sortOrder] - a[sortOrder];
    }

    return a[sortOrder] - b[sortOrder];
  }

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link className={classes.headerLink} to="/">Hotel Engine Demo</Link>
          </Typography>
          <div className={classes.search}>
            <Paper className={classes.searchPaper}>
                <Search
                  query={query}
                  onQueryChange={handleQueryChange}
                  onSearchClick={handleSearchClick}
                />
              </Paper>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box>
          <Grid container justifyContent="flex-end">
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                variant="outlined"
                value={orderBy + ' ' + sortDir}
                onChange={handleChangeSort}>
                <MenuItem value="best+match desc">Best Match</MenuItem>
                <MenuItem value="stars desc">Most Stars</MenuItem>
                <MenuItem value="stars asc">Fewest Stars</MenuItem>
            </Select>
          </Grid>
        </Box>
        <Paper className={classes.paperRoot}>
          {!props.loading && 
            <List className={classes.listRoot}>
              {
                Object.values(props.repositories).sort(sortItems).slice(page * pageSize, pageEndIndex).map((row :any, index :number) => {
                  let stars :string = '';
                  const converted :number = parseInt(row.stargazers_count, 10);
                  
                  if(converted > 1000) {
                    stars = `${(converted / 1000).toFixed(1)}k`;
                  } else {
                    stars = converted.toString();
                  }

                  return (
                    <React.Fragment key={row.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar className={classes.listItemAvatar}>
                          <Avatar className={classes.avatar}>
                            <BookIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.full_name}
                          secondaryTypographyProps={{
                            "component": "div"
                          }}
                          secondary={
                            <div>
                              <Typography
                                component="div"
                                variant="body2"
                                color="textPrimary">
                                {row.description}
                              </Typography>
                              <div className={classes.repositoryTopicDetails}>
                                {
                                  row.topics.map((e :string, i :number) => {
                                    return (
                                      <Chip className={classes.chip} key={i} label={e} />
                                    )
                                  })
                                }
                              </div>
                              <div className={classes.repositoryDetails}>
                                <div className={classes.repositoryDetails}>
                                  <StarIcon fontSize="small" />
                                  &nbsp;{stars}
                                </div>
                                &nbsp;&nbsp;
                                <div className={classes.repositoryDetails}>
                                  <SubtitlesIcon fontSize="small" />
                                  &nbsp;&nbsp;{row.language}
                                </div>
                                &nbsp;&nbsp;
                                <div className={classes.repositoryDetails}>
                                  <PersonIcon fontSize="small" />
                                  &nbsp;&nbsp;{row.owner.login}
                                </div>
                              </div>
                            </div>
                          }/>
                      </ListItem>
                      {index !== pageEndIndex - 1 &&
                        <Divider key={row.full_name} />
                      }
                    </React.Fragment>
                  )
                })
              }
            </List>}
            {props.loading &&
              <Grid className={classes.spinnerContainer} container alignItems="center" justifyContent="center">
                <CircularProgress size={140} />
              </Grid>
            }
        </Paper>
        <TablePagination
          component="div"
          count={props.total}
          rowsPerPage={pageSize}
          page={page}
          rowsPerPageOptions={[]}
          backIconButtonProps={{
              'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
              'aria-label': 'next page',
          }}
          onPageChange={handleChangePage} />
      </main>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const total = state.repositories.count;
  return {
      total,
      loading: state.repositories.loading,
      pages: Math.trunc(total / pageSize),
      repositories: state.repositories.items
  }
}

export default connect(mapStateToProps, { 
  searchRepositories,
  searchNextRepositories,
  searchPrevRepositories
})(Results);
