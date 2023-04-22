# arXiv-CE

CE stands for Cloud Edition.

This is the public documentation site for the project to move arXiv to the cloud. We will use this place to share our plans with the arXiv community, and also seek feedback and suggestions from the community. We will try to keep this site up to date as our plans become implementations and as our implementations are put into production.

We're inviting community participation in this effort. See [Open For public Discussion](About_this_site/Public_Forum) 

## Why is arXiv moving to the cloud?

First, see the [legacy issues described here](legacy.md). 

What moving to the cloud will enable:

1. Flexible, real-time scaling nearly without limits to keep up with our growth
1. A more modern development devops environment
    * deployment via Docker images
    * Kubernetes like infrastructure for bulk deployment with no downtime
    * better integrated logging and monitoring
    * support for integrated CI/CD suites
1. Better international support
    * Cornell has excellent bandwidth in North America, but download times are poor overseas
1. Greater reliability
    * Cornell IT has, in general, provided exemplary uptime over the last 15 years
    * But we have, on a couple of occasions, experienced downtime due to Cornell IT actions
    * There is no geogrpahic diversity
        - We are dependent on a set of servers housed in a single facility
        - Restoring services if that facility were to become unavailable for an extended period of time would be a monumental effort
    * The major cloud vendors all have geographically diverse datacenters
        - unlikely that more than one would fail simultaneously





