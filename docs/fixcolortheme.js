const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (e) => {
  setColorTheme();  
});

function setColorTheme() {
  if (darkModeMediaQuery.matches) document.body.setAttribute("data-md-color-scheme", "slate")
  else document.body.setAttribute("data-md-color-scheme", "default")
}

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
      setColorTheme();
    }
  };
  