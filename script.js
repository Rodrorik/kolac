const data = [
  { label: "Moja super žena", value: 20, color: "#D91A1A" },
  { label: "Stále moja úplne perfektná žena", value: 30, color: "#B41C1C" },
  { label: "Moja pusaa", value: 25, color: "#8F1D1E" },
  { label: "Stále len ona", value: 24, color: "#6B1F20" },
  { label: "Moja pusa ale oblečená", value: 1, color: "#212224" }
];

// Show "Calculating..." for 2 seconds
setTimeout(() => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("chart-container").style.display = "flex";
  animatePieChart();
  showLegend();
}, 2000);

function animatePieChart() {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;
  let sliceIndex = 0;
  const centerX = 150;
  const centerY = 150;
  const radius = 140;

  function drawNextSlice() {
    if (sliceIndex >= data.length) return;

    const segment = data[sliceIndex];
    const sliceAngle = (segment.value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;
    const animationSteps = 60;
    let step = 0;

    function animateSlice() {
      const progress = step / animationSteps;
      const currentEnd = startAngle + progress * (endAngle - startAngle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, currentEnd);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();

      step++;

      if (step <= animationSteps) {
        requestAnimationFrame(animateSlice);
      } else {
        startAngle = endAngle;
        sliceIndex++;
        drawNextSlice();
      }
    }

    animateSlice();
  }

  drawNextSlice();
}

function showLegend() {
  const legend = document.getElementById("legend");
  data.forEach(item => {
    const li = document.createElement("li");
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = item.color;
    li.appendChild(box);
    li.appendChild(document.createTextNode(item.label));
    legend.appendChild(li);
  });
}
