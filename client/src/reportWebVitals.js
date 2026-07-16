<<<<<<< HEAD
const reportWebVitals = (onPerfEntry) => {
  // No-op by default. Wire up the `web-vitals` package here if you
  // later want to measure Core Web Vitals.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // intentionally left blank
=======
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
>>>>>>> upstream/main-group-B
  }
};

export default reportWebVitals;
