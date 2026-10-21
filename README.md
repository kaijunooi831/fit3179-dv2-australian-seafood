# Australia’s seafood shift

An Australian seafood industry data story by Ooi Kai Jun for FIT3179 DV2.

Static HTML/CSS/JavaScript using Vega, Vega-Lite and Vega-Embed. Serve this directory via HTTP; there is no build step. All runtime scripts and chart data are local.

Read [the source list](data/SOURCES.md) for the data sources. The [specification manifest](specs/index.json) lists every chart and its data file. Each assessed chart has readable JSON in this repository:

1. [Production trend](specs/01-sector-trend.json)
2. [Jurisdiction slope](specs/02-jurisdiction-slope.json)
3. [Jurisdiction-share distribution](specs/13-jurisdiction-distribution.json)
4. [Aquaculture choropleth](specs/03-aquaculture-choropleth.json)
5. [Production symbol map](specs/04-production-symbols.json)
6. [Jurisdiction value mosaic](specs/14-jurisdiction-mosaic.json)
7. [Aquaculture heatmap](specs/05-aquaculture-heatmap.json)
8. [National treemap](specs/06-national-treemap.json)
9. [Value and volume scatterplot](specs/07-value-volume.json)
10. [Value-change waterfall](specs/08-value-waterfall.json)
11. [Export waffle](specs/09-export-waffle.json)
12. [Export rank bump chart](specs/10-export-bump.json)
13. [Export flow map](specs/12-export-flow.json)

This repository contains only the website and its public aggregate data, geography, chart specifications, software and font licences.

## Reading the code

- `index.html` contains the story, chart containers and shared map-year control.
- `css/styles.css` controls page layout, typography and chart controls.
- `js/main.js` loads the manifest, validates shared data responses and calls `vegaEmbed` for each container. It also handles navigation, resizing and the shared map-year control.
- `specs/index.json` maps container IDs to readable chart specifications and data files.
- Eleven charts use Vega-Lite: `data`, `transform`, `mark`/`layer`, `encoding`, and `params` for bound controls. The treemap and flow map use Vega for hierarchical layout and projected paths, with named data, scales, signals and marks.
- The two Australian map specs expose `mapYear`; the shared HTML slider updates both through the Vega View API. The flow map and ranked bars share `partnerFocus` within one Vega specification.

Library versions are pinned and bundled locally. The specifications use version 6 schemas to match these libraries. Data paths are relative to the webpage root, including when hosted under the GitHub Pages project path.

Before embedding, `main.js` inserts the checked CSV/JSON contents into the in-memory spec as `data.values`, preserving format options. This makes **View Source**, **View Compiled Vega** and **Open in Vega Editor** self-contained, including nested map lookups. Repository specs retain their readable relative URLs. Editor copies use initial parameter values; the page font, HTML controls and cross-chart JavaScript are not exported.
