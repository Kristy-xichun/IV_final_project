# Inside London's Airbnb: An Interactive Visual Exploration

InfoVis Final Project — An interactive data-driven storytelling visualization exploring London's Airbnb market across 29 boroughs.

## Live Demo

Open `public/index.html` directly in a browser for the standalone interactive dashboard, or run the Next.js development server.

## Project Structure

```
london-airbnb-vis/
├── public/
│   ├── index.html          # Standalone interactive dashboard (all-in-one HTML)
│   └── data.csv            # Cleaned dataset (10,154 listings)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page (loads dashboard)
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Dashboard.tsx   # Main dashboard orchestrator
│   │   ├── GeoMap.tsx      # View 1: Leaflet geo-map with borough polygons
│   │   ├── BarChart.tsx    # View 2: Stacked bar chart (room types)
│   │   ├── ScatterPlot.tsx # View 3: Price vs commercialisation scatter
│   │   ├── Histogram.tsx   # View 4: Price distribution histogram
│   │   ├── GapChart.tsx    # View 5: Pro vs individual price gap
│   │   ├── DemandScatter.tsx # View 6: Price vs demand scatter
│   │   └── FilterBar.tsx   # Global host-type filter
│   ├── context/
│   │   └── SelectionContext.tsx  # Shared selection state
│   ├── data/
│   │   └── boroughs.ts     # Borough boundary polygons
│   └── utils/
│       └── dataProcessing.ts    # Data aggregation utilities
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data

- **Source**: [Inside Airbnb](http://insideairbnb.com/london)
- **Records**: 10,154 active listings (filtered to reviews since Sep 2025)
- **Attributes**: 16 fields including neighbourhood, room_type, price, calculated_host_listings_count
- **Derived**: host_type (Individual / Small / Medium / Professional)

## Visualization Design

### Six Coordinated Views

| View | Task | Chart Type | Key Encoding |
|------|------|-----------|--------------|
| Geo-Map | Spatial distribution | Leaflet + bubble overlay | Position → location, Size → count, Colour → price |
| Stacked Bar | Room type composition | Horizontal stacked bars | Length → proportion, Hue → room type |
| Scatter Plot | Price vs commercialisation | Bubble scatter | Position → price/host count, Size → listings, Colour → % entire |
| Histogram | Price distribution | Grouped bars | Height → frequency, Hue → room type |
| Diverging Bar | Pro vs individual gap | Diverging horizontal | Length → % difference, Hue → direction |
| Demand Scatter | Price vs demand | Bubble scatter | Position → price/reviews, Size → listings |

### Interactions

- **Click**: Select/deselect boroughs across all views (bidirectional)
- **Hover**: Cross-highlight + tooltip across all views
- **Brush**: Drag-select on scatter plot → filters map + bar chart
- **Global Filter**: Host-type pills filter all views simultaneously
- **Summary Stats**: Update dynamically with selection + filter

### Channel Effectiveness Ranking

| Rank | Channel | Encodes |
|------|---------|---------|
| #1 | Position (x, y) | Location, Price, Commercialisation |
| #2 | Length | Room type proportions |
| #3 | Area / Size | Listing count |
| #4 | Colour intensity | Median price gradient |
| #5 | Colour hue | Room type, host category |

## Key Findings

1. **Two Separate Markets**: Private room P90 (£102) < Entire home P10 (£89) — almost zero overlap
2. **Professional Premium Varies**: Hounslow +129%, Brent -28% — different strategies per borough
3. **Location Trumps Price**: Westminster (£182) ≈ same demand as Croydon (£73)
4. **Commercialisation Corridor**: Higher host portfolio → higher prices, concentrated in Westminster, K&C, Camden

## Team

- Member A (NetID: xxx)
- Member B (NetID: xxx)
