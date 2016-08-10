import React from 'react';
import Checkbox from '../../ui/Checkbox.jsx';
import { getStateList } from '../store/groups';

const tagsStatus = ['501c3', '501c4', 'PAC'];
const tagsConstituency = ['African American', 'Arab / Middle Eastern',
  'Asian / Pacific Islander', 'Latino / Latina', 'Native American',
  'White Working Class', 'Women', 'Youth and Students'];
const tagsIssue = ['Economic Justice', 'Racial Justice', 'Immigrant Rights',
  'LGBTQ', 'Reproductive Justice', 'Climate'];

const start1 = 0;
const end1 = start1 + tagsStatus.length;
const start2 = end1;
const end2 = start2 + tagsConstituency.length;
const start3 = end2;
const end3 = start3 + tagsIssue.length;

export default class GroupSelection extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      visible1: (window.innerWidth >= 740),
      visible2: (window.innerWidth >= 740),
      visible3: (window.innerWidth >= 740),
      displayWidth: window.innerWidth,
      visible: false,
    };
    this.handleResize = this.handleResize.bind (this);
  }

  componentDidMount () {
    window.addEventListener ('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener ('resize', this.handleResize);
  }

  handleResize () {
    this.setState ({ displayWidth: window.innerWidth });
  }

  render () {
    let filterButton;
    let stateOptions;
    let tags1;
    let tags2;
    let tags3;
    if (this.state.displayWidth < 740) {
      filterButton = (this.state.visible) ? (
        <button className='filterButton' onClick={() => { this.setState ({ visible: false }); }}>
        Filters &#9651;
        </button>
      ) : (
        <button className='filterButton' onClick={() => { this.setState ({ visible: true }); }}>
        Filters &#9661;
        </button>
      );
    }
    if ((this.state.displayWidth >= 740) || (this.state.visible)) {
      // populate states select component
      stateOptions = [];
      const states = getStateList ();
      for (let state of states) {
        stateOptions.push (<option key={state} value={`#${state}`}>{state}</option>);
      }
      tags1 = [];
      if (this.state.visible1) {
        for (let i = start1; i < end1; i++) {
          tags1.push (
            <Checkbox
              key={`tag${i}`}
              id={`cb${i}`}
              index={i}
              checked={this.props.tagsChecked[i]}
              onChange={(index, checked) => { this.props.onTagChecked (index, checked); }}
              label={tagsStatus[i]}
            />
          );
        }
      }
      let start = 3;
      tags2 = [];
      if (this.state.visible2) {
        for (let i = start2; i < end2; i++) {
          tags2.push (
            <Checkbox
              key={`tag${i}`}
              id={`cb${i}`}
              index={i}
              checked={this.props.tagsChecked[i]}
              onChange={(index, checked) => { this.props.onTagChecked (index, checked); }}
              label={tagsConstituency[i - 3]}
            />
          );
        }
      }
      start = 3 + tagsConstituency.length;
      tags3 = [];
      if (this.state.visible3) {
        for (let i = start3; i < end3; i++) {
          tags3.push (
            <Checkbox
              key={`tag${i}`}
              id={`cb${i}`}
              index={i}
              checked={this.props.tagsChecked[i]}
              onChange={(index, checked) => { this.props.onTagChecked (index, checked); }}
              label={tagsIssue[i - start]}
            />
          );
        }
      }
    }
    if ((this.state.displayWidth < 740) && (this.state.visible === false)) {
      return (
        <div className='groupSelectorArea'>
          {filterButton}
        </div>
      );
    }

    return (
      <div className='groupSelectorArea'>
        {filterButton}
        <h4>Filter by:</h4>
        <div className='filterTitle'>
          <span
            className='filterTitleToggle'
            onClick={() => { this.setState ({ visible1: !this.state.visible1 }); }}
          >
            {this.state.visible1 ? '-' : '+'}
          </span>
          <span
            className='filterTitleName'
            onClick={() => { this.setState ({ visible1: !this.state.visible1 }); }}
          >
            Group Type
          </span>
          <button
            className='filterTitleButton'
            onClick={() => { this.props.onTagsChecked (start1, end1, true); }}
          >
            All
          </button>
          <button
            className='filterTitleButton'
            onClick={() => { this.props.onTagsChecked (start1, end1, false); }}
          >
            Clear
          </button>
        </div>
        <div className='filterGroup'>
          {tags1}
        </div>
        <div className='filterTitle'>
          <span
            className='filterTitleToggle'
            onClick={() => { this.setState ({ visible2: !this.state.visible2 }); }}
          >
            {this.state.visible2 ? '-' : '+'}
          </span>
          <span
            className='filterTitleName'
            onClick={() => { this.setState ({ visible2: !this.state.visible2 }); }}
          >
            Constituency
          </span>
          <button
            className='filterTitleButton'
            onClick={() => { this.props.onTagsChecked (start2, end2, true); }}
          >
            All
          </button>
          <button
            className='filterTitleButton'
            onClick={() => { this.props.onTagsChecked (start2, end2, false); }}
          >
            Clear
          </button>
        </div>
        <div className='filterGroup'>
          {tags2}
        </div>
        <div className='filterTitle'>
          <span
            className='filterTitleToggle'
            onClick={() => { this.setState ({ visible3: !this.state.visible3 }); }}
          >
            {this.state.visible3 ? '-' : '+'}
          </span>
          <span
            className='filterTitleName'
            onClick={() => { this.setState ({ visible3: !this.state.visible3 }); }}
          >
            Issue Area
          </span>
          <button
            className='filterTitleButton'
            onClick={() => { this.props.onTagsChecked (start3, end3, true); }}
          >
            All
          </button>
          <button
            className='filterTitleButton'
            onClick={() => { this.props.onTagsChecked (start3, end3, false); }}
          >
            Clear
          </button>
        </div>
        <div className='filterGroup'>
          {tags3}
        </div>
        <h4>Go To:</h4>
        <div className='filterGroup'>
          <a href='#purple-states'>Top</a>
          <a href='#purple-states'>Purple States</a>
          <a href='#lightblue-states'>Light Blue States</a>
          <a href='#lightred-states'>Light Red States</a>
          <a href='#darkblue-states'>Dark Blue States</a>
          <a href='#darkred-states'>Dark Red States</a>
          <select onChange={(e) => { window.location = e.target.value; }}>
            {stateOptions}
          </select>
        </div>
      </div>
    );
  }
}
GroupSelection.propTypes = {
  tags: React.PropTypes.arrayOf (React.PropTypes.string).isRequired,
  tagsChecked: React.PropTypes.arrayOf (React.PropTypes.bool).isRequired,
  onTagChecked: React.PropTypes.func.isRequired,
  onTagsChecked: React.PropTypes.func.isRequired,
};
