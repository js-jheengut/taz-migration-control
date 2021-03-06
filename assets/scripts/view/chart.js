import $ from 'jquery';
import Backbone from 'backbone';
import c3 from 'c3';

export default Backbone.View.extend({
  fetchData() {
    const promises = [];
    const promiseData = [];

    this.options.countries.forEach(name => {
      const promise = this.options.api.findCountryByISOCode(name)
        .then(data => {
          if (data !== undefined) {
            promiseData.push(data);
          }
        });

      promises.push(promise);
    });

    return $.when.apply($, promises).then(data => promiseData);
  },

  buildChart(options) {
    this.$el.addClass(`chart--${this.type}`);
    return c3.generate(options);
  },

  renderChart(data) {
    return false;
  },

  initialize(options) {
    this.options = options;
    return this.fetchData().then(data => this.renderChart(data));
  },
});
