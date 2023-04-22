# Legacy Issues

As might be expected for a 30+ year old system, arXiv suffers from a number of legacy issues.

## growing requirements

- arXiv usage is growing
- heading from about 150k per year to 00k+
- lots of delayed feature requests
- Example: research agencies want funding meta data attached to articles
- accessibility requirements

## Inflexible infrastructure

 - services run directly on VMs
 - a new VM takes several _days_ to configure
 - configuration process is a manual based on a ~30 item checklist
 - we know there are differences between our VM nodes, and fixing this is hard
 - no comprehensive automated test suite to ensure VM is completely functional
 - CentOS 7, which is currently deployed on nearly all VMs will be EOL in a year
 - we're running an unsupported version of Apache, because the later versions would conflict with some of the legacy packages we use

## inadequate secOps

 - deploys are largely manual, and occur one at a time for each web node
 - no comphrehensive test suites
 - very few tests at all
 - too many git repos, hard to deploy a set of cooredinated components atomically
 - monitoring and alerting facilities are limited

## Aging code base

- The submission process is almost all legacy perl code
- Hard to find perl programmers
- We don't want to continue writing new perl code
- The user management system is legacy PHP code
- based on a PHP version that's no longer supported
- breaking changes in new version of PHP make upgrading problematic
- highly problematic TeX/LaTeX pipeline
  - a number of old articles no longer build in the automated process
  - we fell two years behind in the version of TeX we use for new articles
  - a LaTeX article that shows correctly in Overleaf might now compile on arXiv






 