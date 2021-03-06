import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import SearchIcon from 'material-ui-icons/Search'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui-icons/Clear'
import { CircularProgress } from 'material-ui/Progress'
import { filterResults, clearFilter } from '../../../store/actions'

const styleSheet = createStyleSheet('FilterBar', (theme) => ({
  'filterBarContainer': {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.only('xs')]: {

    },
  },
  'searchInput': {
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: (theme.spacing.unit / 2),
    borderRadius: 4,
    alignItems: 'center',
  },
  'input': {
    'border': 0,
    'backgroundColor': 'rgba(0,0,0,0)',
    ...theme.typography.body1,
    'color': theme.palette.common.fullWhite,
    '&:focus': {
      outline: 'none',
    },
    '&::placeholder': {
      color: 'rgba(255,255,255,0.5)',
    },
    '&::-webkit-inline-placeholder': {
      color: 'rgba(255,255,255,0.5)',
    },
  },
  'icon': {
    width: 18,
    height: 18,
  },
  'loading': {
    color: 'white',
  },
  'button': {
    width: 'auto',
    height: 'auto',
  },
  'copyRight': {
    color: 'white',
    marginRight: (theme.spacing.unit * 2),
  },
}))

class FilterBar extends Component {
  constructor() {
    super()
    this.state = {
      searchText: '',
    }
  }

  onClearPress = (event) => {
    event.preventDefault()
    this.setState({ searchText: '' }, () => {
      this.props.clearFilter()
    })
  }
  handleChange = (event) => {
    this.setState({ searchText: event.target.value })
  }
  handleChangeFilter = (event) => {
    this.setState({ searchText: event.target.value })
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.props.filterResults(event.target.value)
    }
  }
  render() {
    const { classes, isSearching, filter } = this.props

    return (
      <div className={classes.filterBarContainer}>
        <div className={classes.searchInput} style={{ backgroundColor: (!filter) ? classes.searchInput.backgroundColor : 'rgba(0,0,0,0.3)' }}>
          <input
            name="search"
            value={this.state.searchText}
            type="text"
            className={classes.input}
            placeholder={'Type here to search...'}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          { (!isSearching && !filter) && (
            <SearchIcon className={classes.icon} />
          ) }
          { (!isSearching && filter) && (
            <IconButton color="contrast" onClick={this.onClearPress} className={classes.button} aria-label="Clear search filter">
              <ClearIcon className={classes.icon} />
            </IconButton>
          ) }
          { isSearching && (
            <CircularProgress color="accent" className={classes.loading} size={18} />
          ) }
        </div>
      </div>
    )
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isSearching: PropTypes.bool,
  // eslint-disable-next-line
  filterResults: PropTypes.func,
  clearFilter: PropTypes.func,
  filter: PropTypes.string,
}

const mapStateToProps = (state) => ({
  isSearching: state.app.characters.isSearching,
  filter: state.app.characters.filter,
})

const enhance = compose(
  withStyles(styleSheet),
  connect(mapStateToProps, { filterResults, clearFilter }),
)

export default enhance(FilterBar)
