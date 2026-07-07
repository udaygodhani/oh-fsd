// src/components/graph/TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ 
  symbol = "BTCUSD", 
  height = "100%",
  interval = "D"
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      "symbol": symbol,
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#0A0618",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_widget",
      "width": "100%",
      "height": "100%",
      "hide_top_toolbar": false,
      "hide_legend": false,
      "save_image": false,
      "backgroundColor": "#0A0618"
    });

    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [symbol, interval]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-purple-500/20 bg-[#0A0618]">
      <div 
        ref={containerRef} 
        className="tradingview-widget-container"
        style={{ height }}
      />
    </div>
  );
};

export default TradingViewWidget;