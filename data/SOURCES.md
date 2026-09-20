# Sources and data dictionary

Prepared by Ooi Kai Jun, updated 3 October 2026. All currency is Australian dollars. Exported files contain derived public statistics; source workbooks and private assessment materials are not website assets.

## Production and trade

Publisher: Australian Bureau of Agricultural and Resource Economics and Sciences (ABARES), Department of Agriculture, Fisheries and Forestry. Authors: R Curtotti, M Dylewski and H Tuynman (2026). *Australian fisheries and aquaculture statistics 2025*. Canberra, September. DOI [10.25814/4w7h-cw80](https://doi.org/10.25814/4w7h-cw80).

- [Release page](https://www.agriculture.gov.au/abares/research-topics/fisheries/fisheries-and-aquaculture-statistics)
- [Statistical workbook](https://daff.ent.sirsidynix.net.au/client/en_AU/search/asset/1038562/2/02_DataTables_AustFishAquacStats_2025_v1.0.0.xlsx), retrieved 25 September 2026. SHA-256 `1c27eebaacc96f5393cbe8762ae88465fd5b03a72ca78ad627af6d1b5711b99b`.
- Licence: CC BY 4.0 except third-party content, logos and the Commonwealth Coat of Arms as stated by the publisher. No logos are reproduced.
- Production tables: numeric complete years 1998–99 through **2024–25p** for all seven jurisdictions and national totals. The latest year is preliminary. The revised historical observations and latest year are taken from one September 2026 vintage; older editions are comparison evidence only.
- Trade: this page uses 2014–15 through 2024–25 from the same workbook. The source report flags 2024–25 as preliminary even though workbook trade headers omit the p suffix. Export values are free-on-board; production GVP is measured at farm/first landing. These are different valuation points.
- Table 1: state aquaculture, state-managed wild-catch and Commonwealth production value; adjusted national total. Source unit A$000, divided by 1,000 for A$m.
- Table 2: adjusted national species-category value and tonnes. Source value A$000; volume tonnes using the source's jurisdiction-specific conversions. Tuna double-counting is already adjusted. Broader groups contain confidential pooled observations and non-food scope.
- Table 4: aquaculture species categories including pearls and aquarium species. Values in whole A$000 are source-rounded. The published total is the denominator; leaf sums may differ slightly through rounding.
- Table 13: mutually exclusive export commodity values; source A$000 divided by 1,000. All fisheries and aquaculture products form the denominator for concentration. No fabricated commodity-to-partner join is made.
- Table 17: 11 **selected** export destinations, edible products **including live**, source A$m. Hong Kong and China are separate source-reported economies. The selected set is not all export markets. Do not infer a national market share from their sum.

Industry value is not an edible-seafood price, profit measure or sustainability indicator. Gross aquaculture and wild-catch components exceed the adjusted national total because wild-caught Southern Bluefin Tuna used by farms is removed from the national total. The residual is never presented as an independently measured contribution. National 2024–25p volume is 295,837.99t. The workbook is used consistently.

Missingness: `na` means not available; `np` means confidential/not for publication; dash means nil/negligible; blank is distinct. These statuses are preserved in private source extraction and are never imputed as zero. Numeric zero may also mean below source precision. Current chart subsets use available numeric observations; ACT is explicitly no-data. Unlisted pilot species have not been converted into zeros.

## Inflation adjustment

Publisher: Australian Bureau of Statistics (ABS), *Consumer Price Index, Australia, July 2026*, Table 17 quarterly index numbers, original All groups Australia series A2325846C.

- [Release](https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/jul-2026)
- [Workbook](https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/jul-2026/6401017.xlsx), retrieved 11 September 2026, CC BY 4.0 under ABS website terms.
- One consistent rebased vintage: September **month** 2025 = 100. Quarterly index series is used, not monthly rates or annual percentage changes.
- Financial-year CPI = arithmetic mean of September, December, March and June quarter index levels. Require exactly four quarters. 2024–25 mean = 97.39.
- Real GVP = nominal GVP × 97.39 / financial-year CPI. Apply once to nominal Table 1 values. No already-real source series is re-deflated. These are **2024–25 dollars**, not the CPI index reference period.

## Geography

- ABS ASGS Edition 3 (2021), [digital boundaries](https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files), CC BY 4.0. Eight states/territories retained; offshore “Other Territories” omitted from this mainland-and-Tasmania jurisdiction view. The 2021 edition is a historical boundary choice for the 2024–25 observations, not a claim to be the latest geography in 2026.
- State geometry simplified with shared topology at 1,500m; islands below 20km² removed for national viewing scale. Tiny islands are cartographic omissions, not zero production. State anchors are representative interior points. Commonwealth production is unallocated on these state maps; ACT is not Commonwealth.
- [Natural Earth Admin 0 countries 1:110m](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/), public domain. 177 country features; small Singapore/Hong Kong markers use documented aggregate anchors even where low-resolution polygons are absent. Country boundaries supply context, not endorsement of territorial claims.
- Australian conic equal-area projection: standard parallels −18°, −36°, central meridian 134°E. World Equal Earth centred toward the Asia-Pacific. Line endpoints are display anchors; edges represent relationships, not observed journeys.

## Public file schemas

`year_end` is the calendar year in which the July–June financial year ends. `year` is the display financial-year label. Monetary `_m` fields are A$ million. `share` fields are fractions in [0,1]. All joins use exact named keys documented below.

| File | Grain / key | Measures and transformation |
|---|---|---|
| sector_series.csv | year_end, sector | nominal_m; Aquaculture, Wild catch (state + Commonwealth), Adjusted national |
| sector_real.csv | year_end, sector | adds real_m from ABS CPI factor |
| state_series.csv / state_real.csv | year_end, state | aquaculture_m, wild_m, total_m, aquaculture_share=aqua/(aqua+state wild), real_m |
| state_map.csv | state, 2024–25p | above + longitude/latitude from map_anchors; no Commonwealth allocation |
| state_mix_mosaic.csv | jurisdiction group, sector, 2024–25p | observed Table 1 state values; TAS, WA, SA, QLD and a disclosed NSW/VIC/NT pool. x0/x1 are each group’s share of the seven-jurisdiction total; y0/y1 partition its farmed and state-managed wild value. Rectangle area therefore represents sector value. Commonwealth excluded. |
| species_series.csv | year_end, species | Table 2 exhaustive leaf value_m and tonnes; pooled categories preserved |
| species_latest.csv | species, 2024–25p | value_m, tonnes, label, share of adjusted national total |
| species_scatter.csv | species, 2024–25p | nine named edible categories; excludes pooled/non-food groups; no ratio calculation |
| aquaculture_mix.csv | year_end, species | Table 4 16 leaves for 2015–16–2024–25p; value_m/share/source status |
| value_change.csv | order | start/end cumulative change from zero and measured category change; four largest absolute changes + nine remaining categories, ending with net change; current dollars |
| export_commodities.csv | year_end, commodity | all Table 13 numeric leaf categories, value_m, scope, source row |
| export_ranks.csv | year_end, commodity | 2024–25 top-five fixed cohort; rank computed among all export commodities in each year; descending value, alphabetical tie-break |
| waffle.csv | grid x,y | 100 squares allocated by largest remainders: 44 Rock Lobsters, 23 Salmonids, 8 Tunas, 25 All others; tooltip/key shares use the Table 13 total (others is its complement); exact combined share 75.4248% |
| export_partners.csv / partner_map.csv | year_end, partner | Table 17 selected edible exports value_m; map subset is 2024–25 with aggregate coordinates |
| cpi_financial_year.csv | year_end | CPI mean, factor_to_base_year, quarter_count=4, series ID, base financial year |
| australia_states.geojson | properties.state | state_code/abbrev, simplified D3-compatible polygons |
| world.geojson | country feature | simplified D3-compatible world context |
| map_anchors.csv | kind,name | code, longitude/latitude, anchor_basis; never observed farms/ports |

## Software

Vega 6.2.0, Vega-Lite 6.4.3 and Vega-Embed 7.1.0 are served locally, with BSD-3-Clause licence files in `vendor/`. Specifications are human-readable JSON. Data links and specifications are relative to the website root for GitHub project-subpath hosting. Typography uses locally bundled Latin subsets of Geist and Source Serif 4, under SIL OFL 1.1. Sources: [Geist](https://github.com/google/fonts/tree/main/ofl/geist) and [Source Serif 4](https://github.com/google/fonts/tree/main/ofl/sourceserif4); licence texts are in `fonts/`. No external scripts, analytics or font requests are used.

The dropdown chevron is from [Radix Icons](https://github.com/radix-ui/icons/blob/main/packages/radix-icons/icons/chevron-down.svg), embedded locally under the MIT licence in `vendor/radix-icons-LICENSE`.

## Map design references

Circle area scaling follows the [EU scaled-symbol map guidance](https://data.europa.eu/apps/data-visualisation-guide/scaled-symbol-maps). Circles use a shared zero-origin size scale across sector choices; their coordinates are jurisdiction display anchors.

The [Axis Maps classification guide](https://www.axismaps.com/guide/data-classification) and [Datawrapper's classed/unclassed comparison](https://www.datawrapper.de/blog/classed-vs-unclassed-color-scales) inform the choropleth's continuous 0–100% sequential ramp. Seven observed jurisdiction shares are not forced into arbitrary bins; the exact values are available in text, tooltips and tables. The Week 8–9 course notes support this choice and explain why dot/bin maps, cartograms and scalar-field contours would be less truthful or less readable for these aggregate observations.

The export map's proportional shaft widths, curved relationships and direction arrows are informed by [Jenny et al. (2018), Design principles for origin–destination flow maps](https://doi.org/10.1080/15230406.2016.1262280), with the [Monash research record](https://research.monash.edu/en/publications/design-principles-for-origin-destination-flow-maps/). Curves are arranged in projected display space, not observed routes. Arrowheads indicate direction; the ranked value key uses the same eleven monetary observations and destination highlight. The year remains 2024–25 preliminary.

The jurisdiction-distribution view follows Vega-Lite’s [min–max box-plot example](https://vega.github.io/vega-lite/examples/boxplot_minmax_2D_vertical.html): four observed years, seven jurisdiction shares in each, with median, middle-half box and full-range whiskers. With only seven observations per year, it describes the observed states rather than a population estimate. The [Vega-Lite mosaic example](https://vega.github.io/vega-lite/examples/rect_mosaic_labelled_with_offset.html) supports variable-width columns partitioned by a second category; here both dimensions come from measured Table 1 value. The mosaic is a seven-jurisdiction composition, not the adjusted national total or a physical flow.
