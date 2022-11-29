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
        data-repo="arxiv/discussion/docs"
        data-repo-id="R_kgDOHzoccw"
        data-category-id="DIC_kwDOHzocc84CQwr5"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-lang="en"
        crossorigin="anonymous"
        async>

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