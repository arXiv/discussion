## Open for Public Discussion!

With the [arXiv CE]() project, we'll be making a lot of changes to the way arXiv works. We believe that the wider arXiv community contains technical expertise that can be useful in reviewing and discussion our designs. To that end, we've set up this site to allow the arXiv community to enter comments &ndash; which will be publicly visible &ndash; on each page.


Some ground rules for commenting:

* All participants must agree to adibe by the overall [arXiv Code of Conduct](https://arxiv.org/help/policies/code_of_conduct)
* Please don't just chime in with unsupported opinions, but rather:
     + provide references to papers or articles that support your suggestions (bonus points for papers on arXiv &#x1f642;).
     + or provided detailed descriptions based on your own actual expeirence with similar projects/technologies
* We welcome spirited discussions, but please don't resort to personal attacks.
* We research the right to moderate posts, and even ban user if things get out of hand. We're hoping we won't ever have to this.
---
The technology used:

* The source for the content on this site is hosted on [GitHub]({{ config.repo_url }}), and mostly written in [Markdown](https://www.markdownguide.org/tools/mkdocs/) (with occaisional raw HTML)
* We use mkdocs to generate static HTML pages from markdown source via a GitHub Action
* The discusson comments are in GitHub Discussions. The "Comments" section on each page is enabled through a clever client-side Javacript application called: [giscus](https://giscus.app/)
     + If you don't care to comment on the page, or you don't have Javascript enabled, you can still participate in the discusion by going directly to [GitHub Discussions]({{ config.repo_url }}/discussions)
