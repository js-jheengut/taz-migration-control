export default Backbone.Model.extend({
  defaults: {
    label: '',
    active: false,
  },

  getSlug() {
    return this.get('label').toLowerCase();
  },
});
