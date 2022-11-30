<!-- 
  Script for letting the user switch.
  Commented out so we can try the 'prefers-color-scheme' setting
  to follow the user's browser preference instead

<div class="mdx-switch" style="text-align: right"> 
        <button data-md-color-scheme="default">default</button>
        <button data-md-color-scheme="slate">slate</button>
        <button data-md-color-scheme="indigo">indigo</button>
 </div>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-scheme]")
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var attr = this.getAttribute("data-md-color-scheme")
      document.body.setAttribute("data-md-color-scheme", attr)
      var name = document.querySelector("#__code_1 code span.l")
      name.textContent = attr
    })
  })
</script> -->

<script>
// import * as DarkModeToggle from 'dark-mode-toggle.mjs';

// const toggle = document.querySelector('dark-mode-toggle');
// const nav_element = document.body;

// // Set or remove the `dark` class the first time.
// toggle.mode === 'dark'
//   ? body.classList.add('dark')
//   : body.classList.remove('dark');

// // Listen for toggle changes (which includes `prefers-color-scheme` changes)
// // and toggle the `dark` class accordingly.
// toggle.addEventListener('colorschemechange', () => {
//   body.classList.toggle('dark', toggle.mode === 'dark');
// });  

</script>

# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

giscus should show up below here

<script src="https://giscus.app/client.js"
        data-repo="arxiv/discussion"
        data-repo-id="R_kgDOHzoccw"
        data-category-id="DIC_kwDOHzocc84CQwr5"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="https://arxiv.github.io/discussion/docs/arxiv-giscus-theme.css"
        data-lang="en"
        crossorigin="anonymous"
        async>

</script>

<script>

  // code to make giscus theme track light or dark

  function getGiscusTheme() {
    const quartoTheme = localStorage.getItem("quarto-color-scheme");
    const giscusTheme = quartoTheme === "alternate" ? "dark" : "light";
    return giscusTheme;
  }

  function setGiscusTheme() {
    function sendMessage(message) {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (!iframe) return;
      iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
    sendMessage({
      setConfig: {
        theme: getGiscusTheme(),
      },
    });
  }

  function find_md_color() {
    // Get a document element we know shoud exist in the material theme
    main = document.getElementsByClassName('md-main')[0];
    color = window.getComputedStyle(main).getPropertyValue('--md-typeset-color');
    return color;
  }

  function is_dark(color) {
    const r = color >>> 16 & 0xff;  // 0x12
    const g = color >>> 8 & 0xff;   // 0x34
    const b = color & 0xff;         // 0x56
    // if the text is light, the theme must be dark
    if (r < 0x80 && g < 0x80 & b < 0x80) { return 1 }
  }

  function set_giscus_theme() {
    // this might fail from calling it before things are ready,
    // let's not spam the console
    try {
      color = find_md_color()
      if (is_dark(color)) setGiscusTheme('dark')
      else setGiscusTheme('light')
    }
    finally {};
  }

  // In the onreadystatechange of the parent document, set up the onreadystate
  // listener for the contained frame!
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      ifrm = document.querySelector('iframe.giscus-frame');
      ifrm.onload = () => {
        if (iframe.readyState === "complete") {
          alert("Ready state complete");
          set_giscus_theme();
        }
      };
      // just in case it's ready now ... 
      set_giscus_theme();
    }
  };
  


  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  darkThemeMq.addListener(e => {
    // tracking the system theme was problematic, as the material theme doesn't
    // seem to always match it. So we just try to match whether material is light or dark.
    set_discus_theme();
    // if (e.matches) {
    //   // Theme set to dark.
    //   setGiscusTheme('dark')
    // } else {
    //     setGiscusTheme('light')
    //   }
  });

</script>


<!--
  The above, with the data-theme still present:

 <script src="https://giscus.app/client.js"
        data-repo="arxiv/discussion/docs"
        data-repo-id="R_kgDOHzoccw"
        data-category-id="DIC_kwDOHzocc84CQwr5"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="https://arxiv.github.io/discussion/docs/arxiv-giscus-theme.css"
        data-lang="en"
        crossorigin="anonymous"
        async>

</script> -->