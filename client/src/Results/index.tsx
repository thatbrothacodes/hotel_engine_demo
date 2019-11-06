import * as React from 'react';
import { connect } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import Chip from '@material-ui/core/Chip';

import { searchRepositories, searchNextRepositories, searchPrevRepositories } from '../actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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
      height: '540px'
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

interface IComponentProps extends RouteComponentProps {
  repositories: any,
  pages: number,
  total: number,
  searchRepositories: (query :string, sort :string, order :string) => void,
  searchNextRepositories: (query :string, sort :string, order :string, page :number) => void,
  searchPrevRepositories: (query :string, sort :string, order :string, page :number) => void
};

const pageSize = 30;

function Results(props: IComponentProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const [orderBy, setOrderBy] = React.useState<SortOrder>("best+match");
  const [sortDir, setSortDir] = React.useState<SortDirection>("desc");
  const pageEndIndex = (page + 1) * pageSize;

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const queryString = params.get('q') || '';
    
    setQuery(queryString);
    props.searchRepositories(queryString, orderBy, sortDir);
  },[props.location]);

  const handleChangeSort = (property: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    let direction :SortDirection = "desc";
    let sortOrder :SortOrder =  "best+match";

    if(property === "stargazers_count") {
      sortOrder = "stars";
    } else {
      sortOrder = "best+match";
    }

    if(sortOrder === orderBy) {
      direction = (sortDir === "desc") ? "asc" : "desc";
      setSortDir(direction);
    } else {
      setSortDir("desc");
      setOrderBy(sortOrder);
    }

    props.searchRepositories(query, sortOrder, direction);
  };

  const onSearchClick = () => {
    setOrderBy("best+match");
    setSortDir("desc");
    setPage(0);
    props.history.push(`/search?q=${query}`);
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    const apiPage = newPage + 1;  
    handleChangeSort("best+match");

    setPage(newPage);

    if(newPage > page) {
      props.searchNextRepositories(query, orderBy, sortDir, apiPage);
    } else {
      props.searchPrevRepositories(query, orderBy, sortDir, apiPage);
    }
      
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
            Hotel Engine Demo
          </Typography>
          <div className={classes.search}>
            <Paper className={classes.searchPaper}>
              <TextField
                  id="input-with-icon-textfield"
                  placeholder="Search..."
                  onChange={handleQueryChange}
                  value={query}
                  fullWidth
                  InputProps={{
                      className: classes.searchBoxInput,
                      endAdornment: (
                          <InputAdornment onClick={onSearchClick} position="start">
                              <SearchIcon />
                          </InputAdornment>
                      )
                  }}/>
              </Paper>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.paperRoot}>
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
                    <>
                      <ListItem key={row.id} alignItems="flex-start">
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
                                  {row.language}
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
                        <Divider />
                      }
                    </>
                  )
                })
              }
            </List>
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
                onChangePage={handleChangePage} />
      </main>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const total = state.repositories.count;
  return {
      total,
      pages: Math.trunc(total / pageSize),
      repositories: state.repositories.items
  }
}

export default connect(mapStateToProps, { 
  searchRepositories,
  searchNextRepositories,
  searchPrevRepositories
})(withRouter(Results));
