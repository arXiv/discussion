# Proposal for PDF CDN

This is a proposal for how to serve PDFs from Google's CDN. This
proposal will cover how to arrange the PDF files in Google storage,
the load balancer, any services and the CDN to support the goals.

## Goals
1. Favor using Google products over writing code
1. The PDF for the current version is the hot path
1. Avoid redundant copies of the PDFs in GS
1. Serve current version at `https://arxiv.org/pdf/2001.00021.pdf`
1. Serve other versions at `https://arxiv.org/pdf/2001.00021v3.pdf`
1. Maintain long standing URL patterns
1. Not excessive time to download PDFs

The only goals we can relax are 1. favor google products, 3. avoid
redundant copies. We could relax 6 maintain URL patterns but that is
probably a policy decision. We could relax 7 but it doesn't seem too
relevant.

## Considerations
### Current version
There are two main kinds of URLs we need to handle,
the current version URLs and the versioned URLs. The current version
URLs have filenames like `1234.12345.pdf` that lack the vN version
number. These are expected to provide the user with the most current
version of that paper. This can return different content at different
times due to revisions to the paper. These revisions are not more than
once a day. The versioned have a vN like `1234.12345v3.pdf` and are
expected to return the PDF for that version. These are expected to
almost never change.

### Traffic
Looking at a 1h window on 2022-10-28. Successful PDF
requests with version number: 3766 Successful PDF requests without
version number: 42421.

### Throughput
427000 bytes/s for successful PDFs over a 1h window on 2022-10-28.

### Revisions
Over the whole corpus about 50% of papers have
revisions. Over the month of 2022-11 about 8% have revisions.

### Out of band changes
There are infrequent changes made outside of the versioning
system. Jim says they do about 1 or 2 a week. He said that almost all
of these go through set of utilities that schedule the changes to the
mirroring system. The admins don't login into the Cornell VMs and make
changes, they use a Perl script to rsync changes to their laptop, make
the changes and then use a script to rsync the changes back to the VM
and schedule the sync request for the mirrors. 

See:
[confluence: Hacking Submissions](https://confluence.cornell.edu/display/arXiv/Hacking+Submissions)
and [confluence Admin set-up for a local admin machine](https://confluence.cornell.edu/display/arXiv/Admin+set-up+for+a+local+admin+machine)


### Persistent URL and link rot
arXiv has a history maintaining URLs for the PDFs and abs pages. For
older PDFs:

    https://arxiv.org/pdf/astro-ph/0606003.pdf
    https://arxiv.org/pdf/astro-ph/0606003v99.pdf
    https://arxiv.org/pdf/astro-ph/0606003
    https://arxiv.org/pdf/astro-ph/0606003v99

For newer:

    https://arxiv.org/pdf/2001.00021 
    https://arxiv.org/pdf/2001.00021v99
    https://arxiv.org/pdf/2001.00021.pdf 
    https://arxiv.org/pdf/2001.00021v99.pdf 
    
It has been the practice at arxiv.org to do an HTTP redirect from
`https://arxiv.org/pdf/2001.00021` to
`https://arxiv.org/pdf/2001.00021.pdf` in order to have a reasonably
named download. There are also redirects from HTTP to HTTPS.

### Limitations to GCP LB rules
The GCP LB has URL mapping and rules but
they are limited. "Path matchers (and URL maps in general) do not
offer features that function like Apache LocationMatch directives. If
you have an application that generates dynamic URL paths that have a
common prefix, such as /videos/hd-abcd and /videos/hd-pqrs, and you
need to send requests made to those paths to different backend
services, you might not be able to do that with a URL map. For simple
cases containing only a few possible dynamic URLs, you might be able
to create a path matcher with a limited set of path rules. For more
complex cases, you need to do path-based regular expression matching
on your backends." see
[https://cloud.google.com/load-balancing/docs/url-map-concepts#wildcards-regx-dynamic](https://cloud.google.com/load-balancing/docs/url-map-concepts#wildcards-regx-dynamic)

### No custom 404 handling in LB
I also was looking to see if we could
route all 404s to a service but didn't find anything like that. This issue indicates that this is not a feature:
[Allow Cloud Storage users to specify an http status code for 404 pages](https://issuetracker.google.com/issues/143348697)

### CDN Cache keys
[https://cloud.google.com/cdn/docs/caching#cache-keys](https://cloud.google.com/cdn/docs/caching#cache-keys) GCP can
include headers and cookies as part of the cache key. Some of the GS
query parameters are set as default parts of the cache key when the
back end is a storage bucket.

### GS Buckets versions
CDN can cache based on query parameter
`?generation=1234`. It sounds like we can alter earlier versions. The
generations can be listed.
[https://cloud.google.com/storage/docs/object-versioning](https://cloud.google.com/storage/docs/object-versioning)

### No symbolic links in GS
GS does not support symbolic links. "...there are no plans for gsutil rsync to support operating system-specific file types like symlinks" [from the gsutil rsync docs](https://cloud.google.com/storage/docs/gsutil/commands/rsync)

### Downloaded files end with .pdf
We redirect to a URL that ends with `.pdf`. This is likely to make the
downloaded file more useful since OSs will recognize it as a PDF and
open it with the appropriate viewer. We could achieve the correct
filename with a [Content-Disposition HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition).

## Timing
The normal path at arxiv.org to get a PDF uses a redirect. The abs
pages have `arxiv.org/pdf/astro-ph/0606003` and that gets redirected to
`arxiv.org/pdf/astro-ph/0606003.pdf`. 

A request for `arxiv.org/pdf/astro-ph/0606003` is: 58ms for first
redirect, 655ms for the 2nd request that does the download.

Google serves `astro-ph/0606003v1.pdf`: 218ms wait for response, 51ms
download. This is going directly without any redirects.

These times omit DNS and SSL. These don't need to be top level
concerns but we do expect users to come without keep alive from email
clients. To arxiv.org I'm seeing these as around DNS 54ms, initial
connection+ssl: 135ms.  To google I'm seeing 50ms, initial
connection+ssl: 95ms.

These times are not averages, they are for single requests.

## Proposal that meets all goals
It seems the goal of no-code conflicts with goals of no redundancy and
current version. I'm not finding a way with the Google products to
make this happen without having a service.

The closest I can see is: We serve the PDFs from a Google Storage
bucket, via a load balancer and CDN. The objects in the bucket are
arranged so a request for the current version gets the PDF that is
current. This object will need to be updated as the paper is revised.

Consider a paper with 3 versions we'd have to have the GS bucket like this:

    https//pdf.arxiv.org/pdfs/1111.22222.pdf   | gs://pdf-bucket/pdfs/1111.22222.pdf   |
    https//pdf.arxiv.org/pdfs/1111.22222v1.pdf | gs://pdf-bucket/pdfs/1111.22222v1.pdf |
    https//pdf.arxiv.org/pdfs/1111.22222v2.pdf | gs://pdf-bucket/pdfs/1111.22222v2.pdf |
    https//pdf.arxiv.org/pdfs/1111.22222v3.pdf | gs://pdf-bucket/pdfs/1111.22222v3.pdf |

This would meet all goals except redundant copies and not all of the
long standing URL patterns.

To meet 6 maintaining long standing URL patterns we'd need more
redundancy. This is due to the lack of flexibility in URL mapping in
the LB. 

I don't see an API that says `put_content_at_CDN_key(key, content)`. We can think of a service as that API. The service gets a request from the CDN and then it can be programmed to put any content there.

I suggest that the goal of no-code, only-products forces limitations
on what URL to file mappings are possible due to the limitations of
the GCP products. A small app the mediates this is a large gain of
flexibility for a small additional complexity.

## End Game Proposal 
This is a proposal for what would be ideal without any legacy concerns other than URL patterns.

1. PDFs in GS with version numbers
1. arxiv.org presents URLs to PDFs like https://arxiv.org/pdf/1234.12345.pdf
1. The `/pdf` path URL mapped at the LB a backend with a CDN `pdf-service` an app running on Cloud Run
1. That service goes to the GS and streams the content back to the client
1. Cache warming for new PDFs as part of the announce process

This meets all goals except for 1 no-code.

## Migration proposal
This is a proposal to use the existing `arxiv.org` infrastructure at
Cornell but serve the PDFs from a CDN as an intermediate step towards
an all on cloud stance.

1. Implement the End Game Proposal but have it at a host name like `cloud.arxiv.org`
1. At announce time, build PDFs and sync to Google
1. Add `/pdf` path to arxiv-browse that uses this logic
    1. Check if CDN is fresh
    1. yes? HTTP redirect to CDN
    1. no? reverse proxy the legacy PDF endpoint

The check of CDN freshness could be cached. The reverse proxy avoids
an unnecessary HTTP redirect on the non-fresh path.

## Caching CDN Freshness
The CDN freshness will be checked from Cornell by doing a HEAD request
to the CDN and comparing the `last-modified` time with the mtime of
the Cornell PDF and the mtime of the Cornell PDF with the mtime of the
source.

One question that came up is about the CDN/GS `last-modified` time. Is
it the mtime of the original PDF at Cornell or the time the sync
happened? We can avoid this question by running `gcloud rsync -P`
which will preserve the access/modification timestamps.

But even then are there problems?

Yes, once a HEAD request is done from Cornell, there is a race
condition between the client download and the possibility of a change
of the PDF. The HEAD then HTTP Redirect transfers the happens first
ordering data about `PDF_change->PDF_sync` to the client. But in the
PDF at Cornell could change creating a new ordering.
