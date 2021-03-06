import $ from 'jquery';
import _ from 'underscore';
import d3 from 'd3';
import L from 'leaflet';
import limax from 'limax';

export default Backbone.Model.extend({
  defaults: {
    year: 2010,
    map: undefined,
    layer: undefined,
    data: {},
  },

  initialize() {
    this.on('change:year', (model, value) => this.updateLayer(value));
    return this;
  },

  getRange(range = [0, 1]) {
    const scale = this.get('layerScale');
    return scale ? d3.scale.linear().domain(scale).range(range) : undefined;
  },

  getData(type) {
    return this.get('data')[type] || [];
  },

  /* get dataset for a single year */
  _getDataValueForYear(type, year) {
    const data = this.get('data');
    const scoped = data[type] || [];
    let result;

    if (scoped === undefined || scoped.length === 0) {
      return;
    }

    result = scoped.find(item => Object.keys(item)[0] == year);

    if (result === undefined) {
      return;
    }

    return result[year].value || undefined;
  },

  getPopupContent() {
    return false;
  },

  getMap() {
    return this.get('map');
  },

  /* draw a layer on the map */
  addLayer() {
    const layer = this.get('layer');
    const popupContent = this.getPopupContent();
    const map = this.getMap();

    if (popupContent !== false) {
      layer.bindPopup(popupContent);
    }

    layer.addTo(map);
    this.updateLayer();

    return layer;
  },

  removeLayer() {
    const layer = this.get('layer');
    const map = this.getMap();

    if (layer) {
      layer.removeFrom(map);
    }

    return layer;
  },

  updateLayer() {
    const rawYear = this.get('year');
    const year = parseInt(rawYear, 10);
    this.setLayerYear(year);
    return this;
  },
});
