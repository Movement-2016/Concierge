import _serialize from 'serialize-js-model';

const serialize = ({ jsonData, model, ctx }) => _serialize(jsonData, model, ctx);

serialize.Model = _serialize.Model;

class Testimonial extends serialize.Model {
  constructor() {
    super(...arguments);
    this.idBinding = 'ID';
    this.bodyBinding = 'post_content';
    this.slugBinding = 'post_name';
    this.titleBinding = 'fields.position';

    this.imageBinding = 'fields.image';
    this.authorBinding = 'post_title';
  }
}

class Menu extends serialize.Model {
  constructor() {
    super(...arguments);
    this.getId = () => this.ID || this.term_id;

    this.labelBinding = 'label';
    this.getParent = () => Number(this.parent);
    this.orderBinding = 'order';
    this.urlBinding = 'url';
  }
}

class PostBare extends serialize.Model {
  constructor() {
    super(...arguments);
    this.idBinding = 'ID';
    this.bodyBinding = 'post_content';
    this.titleBinding = 'post_title';
    this.slugBinding = 'post_name';
  }
}

class Post extends PostBare {
  constructor() {
    super(...arguments);
    if (this.fields) {
      for (var key in this.fields) {
        this[key + 'Binding'] = 'fields.' + key;
      }
    }
  }
}

class Page extends Post {}

class Fund extends Post {}

class TeamMember extends Post {}

class TaxonomyNode extends serialize.Model {
  constructor() {
    super(...arguments);
    this.idBinding = 'term_id';
    this.nameBinding = 'name';
    this.slugBinding = 'slug';
  }
}

class State extends TaxonomyNode {
  constructor() {
    super(...arguments);
    this.descriptionBinding = 'description';
    this.parentBinding = 'parent';
    this.getCount = () => {
      if (this.parent === 0) {
        return this._ctx.states
          .filter(state => state.parent === this.term_id)
          .reduce((counts, state) => counts + state.count, 0);
      } else {
        return this.count;
      }
    };

    if (this.parent === 0) {
      this.getOrder = () => this._ctx.order.indexOf(this.slug);
    }
  }
}

class Tag extends TaxonomyNode {
  constructor() {
    super(...arguments);
    this.categoryBinding = 'category';
    this.countBinding = 'count';
  }
}

class Advisor extends serialize.Model {
  constructor() {
    super(...arguments);
    this.nameBinding = 'post_title';
    this.idBinding = 'post_name';
    this.getSort = () => this.post_name.split('-').pop();
  }
}

class Group extends PostBare {
  constructor() {
    super(...arguments);

    if (this.fields) {
      this.websiteBinding = 'fields.website';

      this.c4_donate_linkBinding = 'fields.c4_donate_link';
      this.c3_donate_linkBinding = 'fields.c3_donate_link';
      this.pac_donate_linkBinding = 'fields.pac_donate_link';
      this.imageBinding = 'fields.image';
    }

    this.getState = () =>
      this.fields
        ? this._ctx.taxonomies.state.terms[this.fields.state[0]].term_id
        : this._ctx.taxonomies.state.terms['national'].term_id;

    this.getStatename = () =>
      this.fields
        ? this._ctx.taxonomies.state.terms[this.fields.state[0]].name
        : this._ctx.taxonomies.state.terms['national'].name;

    this.getTags = () => {
      if (!this.fields) {
        return [];
      }

      const { taxonomies: tax, tagCatKeys } = this._ctx;

      const tags = [];
      tagCatKeys.forEach(cat =>
        (this.fields[cat] || []).forEach(tag => tags.push(tax[cat].terms[tag].term_id))
      );
      return tags;
    };
  }
}

const _preserialize = db => {
  const tax = db.taxonomies;

  const tagCats = {
    'issue-area': { id: 1, tag: true },
    constituency: { id: 2, tag: true },
    'nonprofit-type': { id: 3, tag: false },
  };

  const tagCatKeys = Object.keys(tagCats);

  // Utilities for tags
  const toArr = key => Object.keys(tax[key].terms).map(term => tax[key].terms[term]);

  const tagReducer = (accum, key) => [
    ...accum,
    ...toArr(key).map(tag => ({ ...tag, category: tagCats[key].id })),
  ];

  tagCatKeys.forEach(key => {
    tagCats[key].name = db.taxonomies[key].label;
    tagCats[key].slug = db.taxonomies[key].name;
  });

  return {
    states: toArr('state'),
    tagCategories: tagCatKeys.map(key => ({ ...tagCats[key] })),
    tags: tagCatKeys.reduce(tagReducer, []),
    tagCatKeys,
  };
};

const serializeContent = content => {
  try {
    const db = { ...content, ..._preserialize(content) };

    return {
      advisors: serialize({ jsonData: db.posts.advisor, model: Advisor }),
      funds: serialize({ jsonData: db.posts.fund, model: Fund }),
      testimonials: serialize({ jsonData: db.posts.testimonial, model: Testimonial }),
      teamMembers: serialize({ jsonData: db.posts.teamMember, model: TeamMember }),
      headerMenu: serialize({ jsonData: db.menus['header-menu'], model: Menu }),
      footerMenu: serialize({ jsonData: db.menus['footer-menu'], model: Menu }),

      // groups....
      tags: serialize({ jsonData: db.tags, model: Tag }),
      states: serialize({
        jsonData: db.states,
        model: State,
        ctx: { states: db.states, order: db.colorOrder },
      }),
      groups: serialize({
        jsonData: db.posts.group,
        model: Group,
        ctx: { taxonomies: db.taxonomies, tagCatKeys: db.tagCatKeys },
      }),
      tagCategories: db.tagCategories,
    };
  } catch (e) {
    console.log('ERROR DURING SERALIZE: ', e); // eslint-disable-line no-console
  }
};

const serializePage = jsonData => serialize({ jsonData, model: Page });

module.exports = { serializeContent, serializePage };
