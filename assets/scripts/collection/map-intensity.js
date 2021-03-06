import BaseCollection from 'collection/map-base';
import Country from 'model/map-country-intensity';

export default BaseCollection.extend({
  model: Country,

  initialize(data, options) {
    this.dataType = 'migrationIntensity';
    return BaseCollection.prototype.initialize.call(this, data, options);
  },

  shouldAddItem(country) {
    return !country.isDonorCountry;
  },
});
