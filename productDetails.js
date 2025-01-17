
  // Change the color dynamically on hover
  const logo = document.querySelector('.logo');
        const icon = document.querySelector('.icon');

        logo.addEventListener('mouseover', () => {
            icon.style.color = '#EECAD5';
        });

        logo.addEventListener('mouseout', () => {
            icon.style.color = '#FF69B4';
        });