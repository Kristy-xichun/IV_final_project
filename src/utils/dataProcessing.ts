// Data processing utilities for London Airbnb visualization

export interface Listing {
  id: number;
  neighbourhood: string;
  latitude: number;
  longitude: number;
  room_type: string;
  price: number;
  calculated_host_listings_count: number;
  number_of_reviews: number;
  reviews_per_month: number;
  availability_365: number;
}

export interface BoroughSummary {
  neighbourhood: string;
  count: number;
  median_price: number;
  avg_price: number;
  pct_entire: number;
  pct_private: number;
  pct_shared: number;
  avg_hlc: number;
  lat: number;
  lng: number;
}

export type HostType = 'all' | 'individual' | 'small' | 'medium' | 'professional';

export function getHostType(listingsCount: number): Exclude<HostType, 'all'> {
  if (listingsCount === 1) return 'individual';
  if (listingsCount <= 5) return 'small';
  if (listingsCount <= 20) return 'medium';
  return 'professional';
}

export function aggregateByBorough(
  listings: Listing[],
  hostFilter: HostType = 'all'
): BoroughSummary[] {
  // Filter by host type
  const filtered = hostFilter === 'all'
    ? listings
    : listings.filter(l => getHostType(l.calculated_host_listings_count) === hostFilter);

  // Group by neighbourhood
  const groups = new Map<string, Listing[]>();
  for (const l of filtered) {
    if (!groups.has(l.neighbourhood)) groups.set(l.neighbourhood, []);
    groups.get(l.neighbourhood)!.push(l);
  }

  // Aggregate
  const results: BoroughSummary[] = [];
  for (const [neighbourhood, items] of groups) {
    if (items.length < 10) continue; // minimum threshold

    const prices = items.map(l => l.price).sort((a, b) => a - b);
    const median_price = prices[Math.floor(prices.length / 2)];
    const avg_price = prices.reduce((a, b) => a + b, 0) / prices.length;
    const entire = items.filter(l => l.room_type === 'Entire home/apt').length;
    const priv = items.filter(l => l.room_type === 'Private room').length;
    const shared = items.filter(l => l.room_type === 'Shared room').length;
    const avg_hlc = items.reduce((s, l) => s + l.calculated_host_listings_count, 0) / items.length;

    results.push({
      neighbourhood,
      count: items.length,
      median_price: Math.round(median_price),
      avg_price: Math.round(avg_price),
      pct_entire: Math.round(entire / items.length * 1000) / 10,
      pct_private: Math.round(priv / items.length * 1000) / 10,
      pct_shared: Math.round(shared / items.length * 1000) / 10,
      avg_hlc: Math.round(avg_hlc * 10) / 10,
      lat: items.reduce((s, l) => s + l.latitude, 0) / items.length,
      lng: items.reduce((s, l) => s + l.longitude, 0) / items.length,
    });
  }

  return results.sort((a, b) => b.count - a.count);
}

export function priceColorHex(price: number, maxPrice: number): string {
  const t = Math.min(price / maxPrice, 1);
  const r = Math.round(60 + t * 195);
  const g = Math.round(160 - t * 100);
  const b = Math.round(150 - t * 55);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
