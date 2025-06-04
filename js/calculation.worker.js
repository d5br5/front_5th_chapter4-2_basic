// Heavy calculation worker
self.onmessage = function (e) {
  // Simulate heavy operation
  for (let i = 0; i < 10000000; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
  }

  // Send completion message back to main thread
  self.postMessage("calculation complete");
};
