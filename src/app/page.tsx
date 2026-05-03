'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src="/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="London Airbnb Interactive Dashboard"
      />
    </main>
  );
}
