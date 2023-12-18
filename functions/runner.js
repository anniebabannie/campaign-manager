function doHeavyLifting() {
  const timeout = setInterval(() => {
    console.log("I AM DOING IMPORTANT WORK")
  }, 1000)
  
  setTimeout(() => {
    clearInterval(timeout)
    console.log("Stopping process.....");
    process.exit();
  }, 10000)
}

doHeavyLifting();