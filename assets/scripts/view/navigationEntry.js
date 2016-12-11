import _ from 'underscore';
import $ from 'jquery';
import i18n from 'lib/i18n';

export default Backbone.View.extend({
  tagName: 'li',

  className: 'navigation__list-item',

  initialize(options) {
    this.options = options;
    this.setActiveState();
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.options.application, 'change:slug', this.setActiveState);

    return this;
  },

  setActiveState() {
    let appSlug = this.options.application.get('slug');

    if (appSlug === 'index') {
      appSlug = '';
    }

    this.model.set('active', this.model.getSlug() === appSlug);
  },

  events: {
    'click .navigation__item': 'navigateTo',
  },

  navigateTo(event) {
    event.preventDefault();
    let target = $(event.target).attr('href');
    this.options._router.navigate(target, {trigger: true});
  },

  render() {
    const attrs = {
      i18n,
      model: this.model,
      url: `/${this.options.application.get('language')}`,
    };

    if (this.model.getSlug()) {
      attrs.url += `/${this.model.getSlug()}`;
    }

    this.$el.html(this.template(attrs));
    return this;
  },

  template: _.template(`
    <a href="<%= url %>"
       class="navigation__item <% if (this.model.get('active')) { %> navigation__item--active <% } %> ">
      <%= i18n( this.model.get('label') ) %>
    </a>
  `),
});
