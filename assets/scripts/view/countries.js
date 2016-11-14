import _ from 'underscore';
import SubNavigationCollection from 'collection/sub-navigation';
import SubNavigationView from 'view/sub-navigation';

export default Backbone.View.extend({
  className: 'countries',

  initialize() {
    this.collection = new SubNavigationCollection([], {
      url: '/data/countries.json',
    });

    this.subnavView = new SubNavigationView({
      attributes: this.attributes,
      collection: this.collection,
    });

    return this;
  },

  render() {
    this.$el.html(this.template());
    this.subnavView.render().$el.prependTo(this.$el);
    return this;
  },

  template: _.template(`
    <p>Country view</p>
  `),
});
