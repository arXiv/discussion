const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (e) => {
  setColorTheme();  
});

function setColorTheme() {
  if (darkModeMediaQuery.matches) {
    document.body.setAttribute("data-md-color-scheme", "slate")
    // I wanted to darken the Slate theme's background
    // In theory, we should have been able to declaratively set --md-default-bg-color--dark
    // But for some reason that's not a variable in the theme
    // So we programmatically man-handle --md-default-bg-color on each change of color scheme
    document.getElementsByTagName('body')[0].setAttribute("style", "--md-default-bg-color: #201f22")
  } 
  else {
    document.body.setAttribute("data-md-color-scheme", "default")
    document.getElementsByTagName('body')[0].setAttribute("style", "--md-default-bg-color: var(--md-default-bg-color--light)")
  }
}

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
      setColorTheme();
    }
  };

  