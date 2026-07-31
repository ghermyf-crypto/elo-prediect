import { score } from "./model.js";

document.addEventListener('DOMContentLoaded', () => {
  // --- Dynamic Navbar Construction ---
  const navBar = document.createElement('header');
  Object.assign(navBar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 40px',
    backgroundColor: 'rgba(15, 15, 15, 0.85)',
    backdropFilter: 'blur(12px)',
    webkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    zIndex: '9999',
    boxSizing: 'border-box'
  });

  const logo = document.createElement('a');
  logo.innerText = '♟ EloPredict';
  logo.href = 'index.html';
  Object.assign(logo.style, {
    color: '#ffffff',
    textDecoration: 'none',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  });

  const navGroup = document.createElement('div');
  Object.assign(navGroup.style, { display: 'flex', alignItems: 'center', gap: '20px' });

  const homeBtn = document.createElement('a');
  homeBtn.innerText = 'Home';
  homeBtn.href = 'index.html';
  Object.assign(homeBtn.style, {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: '15px',
    fontWeight: '700',
    padding: '8px 12px'
  });

  const dropdownContainer = document.createElement('div');
  Object.assign(dropdownContainer.style, { position: 'relative', display: 'inline-block' });

  const dropdownTrigger = document.createElement('button');
  dropdownTrigger.innerText = 'Other Pages ▾';
  Object.assign(dropdownTrigger.style, {
    color: '#ffffff',
    backgroundColor: '#2563eb',
    border: 'none',
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: '14px',
    fontWeight: '700',
    padding: '8px 18px',
    borderRadius: '20px',
    cursor: 'pointer'
  });

  const dropdownMenu = document.createElement('div');
  Object.assign(dropdownMenu.style, {
    display: 'none',
    position: 'absolute',
    right: '0',
    top: '100%',
    marginTop: '8px',
    backgroundColor: 'rgba(25, 25, 25, 0.95)',
    minWidth: '220px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 25, 0.1)',
    overflow: 'hidden',
    zIndex: '10000'
  });

  const blackPlayerLink = document.createElement('a');
  blackPlayerLink.innerText = 'Black Player Elo Prediction';
  blackPlayerLink.href = 'page2.html';

  const whitePlayerLink = document.createElement('a');
  whitePlayerLink.innerText = 'White Player Elo Prediction';
  whitePlayerLink.href = 'UI.html';

  const itemStyle = {
    color: '#ffffff',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: '13px',
    fontWeight: 'bold'
  };

  Object.assign(blackPlayerLink.style, itemStyle);
  Object.assign(whitePlayerLink.style, itemStyle);

  dropdownMenu.appendChild(blackPlayerLink);
  dropdownMenu.appendChild(whitePlayerLink);
  dropdownContainer.appendChild(dropdownTrigger);
  dropdownContainer.appendChild(dropdownMenu);

  dropdownTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isOpen ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!dropdownContainer.contains(e.target)) {
      dropdownMenu.style.display = 'none';
    }
  });

  navGroup.appendChild(homeBtn);
  navGroup.appendChild(dropdownContainer);
  navBar.appendChild(logo);
  navBar.appendChild(navGroup);

  // Insert navbar at the top of <body>
  document.body.insertBefore(navBar, document.body.firstChild);

  // --- Form & Button Handling ---
  const inac = document.getElementById("inac");
  const miss = document.getElementById("miss");
  const moves = document.getElementById("moves");
  const Result_1_0 = document.getElementById("Result_1-0");
  const Result_1_2 = document.getElementById("Result_1/2-1/2");
  const predictBtn = document.getElementById("result"); 

  if (predictBtn) {
    predictBtn.addEventListener("click", getstuff);
  }

  function getstuff() {
    const moveCount = Number(moves?.value || 0);
    const missCount = Number(miss?.value || 0);
    const inacCount = Number(inac?.value || 0);
    const result1 = Number(Result_1_0?.value || 0);
    const result2 = Number(Result_1_2?.value || 0);

    // Compute error rate for model's input[5]
    const validMoves = moveCount > 0 ? moveCount : 1;
    const errorRate = (missCount + inacCount) / validMoves;

    // Feature array expected by model.js:
    // [0] Inaccuracies, [1] Mistakes, [2] Total Moves, [3] Result White, [4] Result Black, [5] Error Rate
    const features = [missCount, inacCount, moveCount, result1, result2,];

    const predictedElo = Math.round(score(features));
    
    const outputElement = document.getElementById("output");
    if (outputElement) {
      outputElement.textContent = predictedElo;
    }
  }
});
