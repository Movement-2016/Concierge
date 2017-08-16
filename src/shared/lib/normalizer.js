
class Normalizer {

  constructor(content) {
    this._content = content;
  }

  get db() {
    this.fixOrderColor();

    this._db = {
      menu: this.fixMenu(),
      donateTiles: this.fixDonateTiles(),
      news: this.fixNews(),
      states: this.fixStates(),
      tagCategories: this.fixCategories(),
      tags: this.fixTags(),
      advisors: this.fixAdvisors(),
      groups: this.fixGroups(),
      testimonials: this.fixTestimonials()
    };

    return this._db;
  }

  fixID(rec) {
    return this.mapRec( { ID: 'id', 'term_id': 'id' }, [] , rec );
  }

  mapRec(map,skip,rec) {
    const nums = [ 'parent', 'order '];
    const reducer = (target,key) => {
      if( skip && skip.includes(key) ) {
        return target;
      }
      target[ map[key] || key ] = nums.includes(key) ? Number(rec[key]) : rec[key];
      return target;
    };

    return Object.keys(rec).reduce( reducer, {} );
  }

  fixPostBare(post) {
    const map = {
      ID: 'id',
      post_content: 'body',
      post_title: 'title',
      post_name: 'slug'
    };
    const skip = [ 'fields' ];
    return this.mapRec(map,skip,post);
  }

  fixPost(post) {
    return { ...this.fixPostBare(post), ...post.fields };
  }

  fixMenu() {
    return this._content.menu.map( this.fixID, this );
  }

  fixDonateTiles() {
    return this._content.posts.donatetile.map( this.fixPost, this );
  }

  fixNews() {
    return this._content.posts.news.map( p => (p.category = p.fields.category[0], delete p.fields.category, p) ).map( this.fixPost, this );
  }

  fixOrderColor() {
    const o = this._content.colorOrder;
    o.map( name => this.statesDict[name].order = o.indexOf(name) );
  }

  fixStates() {
    return Object.keys(this.statesDict).map( k => this.statesDict[k] ).map( this.fixID, this );
  }

  get statesDict() {
    return this._content.taxonomies.state.terms;
  }

  fixCategories() {
    const tax = this._content.taxonomies;

    this._types = {
      'issue-area': { id: 1, tag: true },
      constituency: { id: 2, tag: true },
      'nonprofit-type': { id: 3, tag: false } 
    };

    return Object.keys( this._types ).map( slug => ({ ...this._types[slug], slug, name: tax[slug].label }) );
  }

  fixTags() {
    const tax = this._content.taxonomies;
    const tags = [];
    const map = {
      term_id: 'id'
    };
    const skip = [ 'description', 'parent' ];
    Object.keys(this._types).forEach( slug => {
      const type = this._types[slug];
      Object.keys(tax[slug].terms).reduce( (arr,term) => (arr.push( { ...this.mapRec(map,skip,tax[slug].terms[term]), category: type.id } ), arr), tags );
    });
    return tags;
  }

  fixAdvisor(rec) {
    const map = {
      post_name: 'id',
      post_title: 'name'
    };
    const skip = [ 'ID', 'post_content', 'post_name' ];
    return { ...this.mapRec( map, skip, rec), sort: rec.post_name.split('-').pop() };
  }

  fixAdvisors() {
    return this._content.posts.advisor.map( this.fixAdvisor, this );
  }

  fixGroup(rec) {
    const map = {};
    const skip = [ 'state', 'nonprofit-type', 'constituency', 'issue-area' ];
    let grp = { ...this.fixPostBare(rec), ...this.mapRec(map,skip,(rec.fields || {})) };

    const tax = this._content.taxonomies;

    if( rec.fields ) {
      grp.tags = [];
      Object.keys( this._types ).forEach( cat => {
        ((rec.fields || {})[cat] || []).forEach( tag => {
          grp.tags.push(tax[cat].terms[tag].term_id);
        });
      });

      grp.state = tax.state.terms[ rec.fields.state[0] ].term_id;
    } else {
      grp.state = tax.state.terms[ 'national' ].term_id;
      grp.tags = [];
    }

    return grp;
  }

  fixGroups() {
    return this._content.posts.group.map( this.fixGroup, this );
  }

  fixTestimonial(rec) {
    const map = {
      ID: 'id',
      post_content: 'body',
      post_title: 'author',
      post_name: 'slug',      
    };
    const skip = [ 'fields' ];
    const fmap = { 
      author_title: 'title',
      image: 'image'
    };
    return { ...this.mapRec( map, skip, rec ), ...this.mapRec( fmap, [], rec.fields ) };
  }

  fixTestimonials() {
    return this._content.posts.testimonial.map( this.fixTestimonial, this );
  }

}

module.exports = Normalizer;

