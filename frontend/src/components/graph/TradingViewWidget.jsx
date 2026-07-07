// src/components/graph/TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ 
  symbol = "BTCUSD", 
  height = "680px" 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const config = {
      "symbol": symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#0A0618",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "width": "100%",
      "height": "100%",
      "hide_top_toolbar": false,
      "hide_legend": false,
      "save_image": false,
      "backgroundColor": "#0A0618",
      "gridColor": "#1A1332"
    };

    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [symbol]);

  return (
    <div className="w-full bg-[#0A0618] rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl">
      <div 
        ref={containerRef}
        className="tradingview-widget-container w-full"
        style={{ height }}
      />
    </div>
  );
};

export default TradingViewWidget;