import {Deck} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';
import * as jpn from './jpn';

// Outlines of US States. Source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const US_MAP_GEOJSON =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'; //eslint-disable-line

const INITIAL_VIEW_STATE = {
  latitude: 40,
  longitude: -100,
  zoom: 3,
  bearing: 30,
  pitch: 30
};

// Set your mapbox token here
mapboxgl.accessToken = process.env.MapboxAccessToken; // eslint-disable-line

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  // Note: deck.gl will be in charge of interaction and event handling
  interactive: false,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch
});

export const deck = new Deck({
  canvas: 'deck-canvas',
  width: '100%',
  height: '100%',
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  onViewStateChange: ({viewState}) => {
    map.jumpTo({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    });
  },
  layers: [
    new GeoJsonLayer({
      data: US_MAP_GEOJSON,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      opacity: 0.4,
      getLineColor: [255, 100, 100],
      getFillColor: [200, 160, 0, 180]
    })
  ]
});

jpn.initPubSub();
jpn.mysomething();


// import {Deck, DeckGL} from '@deck.gl/core';
// import {ScatterplotLayer, TextLayer} from '@deck.gl/layers';
//
// const INITIAL_VIEW_STATE = {
//   latitude: 37.78,
//   longitude: -122.45,
//   zoom: 3
// };
//
// new Deck({
//   container: 'container',
//   mapboxApiAccessToken: 'sk.eyJ1IjoibWF0aGVtYXRpeGFsIiwiYSI6ImNqdG4wM2N0ajAwODU0OXBieGMzdmJsbW4ifQ.F78CXcIAFii6qBapbStFgQ',
//   mapStyle: 'mapbox://styles/mapbox/light-v9',
//   longitude: -122.402,
//   latitude: 37.79,
//   zoom: 12,
//   layers: [
//     new ScatterplotLayer({
//       data: [
//         {position: [-122.402, 37.79], color: [255, 0, 0], radius: 1000}
//       ],
//       opacity: 0.3
//     }),
//     new TextLayer({
//       data: [
//         {position: [-122.402, 37.79], text: 'Hello World'}
//       ]
//     })
//   ]
// });
//
//
// const deckgl = new Deck({
//   canvas: 'canvas',
//   initialViewState: INITIAL_VIEW_STATE,
//   controller: true,
//   layers: [
//     new ScatterplotLayer({
//       data: [
//         {position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}
//       ]
//     })
//   ]
// });
//
// function component() {
//   let element = document.createElement('div');
//   element.innerHTML = ['Hello', 'webpack'].join(' ');
//   console.log("stuff says hi.....");
//   return element;
//
// }
//
// document.body.appendChild(component());
