import React from 'react';
import GroupSelection from './GroupSelection.jsx';
import StateGroup from './StateGroup.jsx';

const tags = ['501c3', '501c4', 'pac', 'african-american', 'arab', 'asian',
  'latino', 'native-american', 'white', 'women', 'youth', 'economic-justice',
  'racial-justice', 'immigrant-rights', 'lgbtq', 'reproductive-justice',
  'climate'];

export default class SelectPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const store = context.store.getState ();
    this.state = {
      groups: store.groups,
      checked: [true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true],
    };
    this.onTagChecked = this.onTagChecked.bind (this);
    this.onTagsChecked = this.onTagsChecked.bind (this);
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      const store = this.context.store.getState ();
      this.setState ({
        groups: store.groups,
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  onTagChecked (index, checked) {
    const newChecked = this.state.checked.slice ();
    newChecked[index] = checked;
    this.setState ({ checked: newChecked });
  }

  onTagsChecked (start, end, checked) {
    const newChecked = this.state.checked.slice ();
    for (let i = start; i < end; i++) {
      newChecked[i] = checked;
    }
    this.setState ({ checked: newChecked });
  }

  render () {
    let groups = [];

    const orgTags = [];
    for (let i = 0; i < 3; i++) {
      if (this.state.checked[i]) {
        orgTags.push (tags[i]);
      }
    }

    // assemble array of focus tags from checked categories
    let allTags = true;
    const activeTags = [];
    for (let i = 3; i < this.state.checked.length; i++) {
      if (this.state.checked[i]) {
        activeTags.push (tags[i]);
      } else {
        allTags = false;
      }
    }

    // remove all items that do not match all active tags
    const selection = this.state.groups.filter ((group) => {
      let anyActive = allTags;
      // return true on any matching tag
      for (const tag of activeTags) {
        if (group.tags.indexOf (tag) > -1) {
          anyActive = true;
        }
      }
      if (anyActive === false) {
        return false;
      }

      for (const tag of orgTags) {
        if (group.tags.indexOf (tag) > -1) {
          return true;
        }
      }
      return false;
    });

    // collect unselected groups
    const stateGroups = [];
    let set = [];
    let lastState;
    let lastColor;
    for (const group of selection) {
      if (lastState !== group.state) {
        if (set.length > 0) {
          stateGroups.push (
            <StateGroup
              key={lastState}
              groups={set}
            />
          );
          set = [];
        }
        lastState = group.state;
        if (lastColor !== group.color) {
          stateGroups.push (
            <div id={`${group.color}-states`} />
          );
          lastColor = group.color;
        }
      }
      set.push (group);
    }
    if (set.length > 0) {
      if (lastColor === undefined) {
        stateGroups.push (
          <div id={`${set[0].color}-states`} />
        );
      }
      stateGroups.push (
        <StateGroup
          key={lastState}
          groups={set}
        />
      );
      set = [];
    }

    if (stateGroups === 0) {
      groups.push (<span>No organizations match all criteria selected</span>);
    } else {
      groups.push (stateGroups);
    }

    return (
      <div>
        <div className='orgArea'>
          <GroupSelection
            tags={tags}
            tagsChecked={this.state.checked}
            onTagChecked={this.onTagChecked}
            onTagsChecked={this.onTagsChecked}
          />
          <div className='groupsArea'>
            {groups}
          </div>
        </div>
      </div>
    );
  }
}

SelectPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
