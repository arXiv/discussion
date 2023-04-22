# Overview of arXiv CE plan

We will be using the Google Cloud (GCP). This is mostly because Google has been generous with Cloud credits. We fully intend to rebuild arXiv to use as many cloud-centric services (more on that below), with no thought given to ever running on a legacy dedicated VM infrastructure ever again.

Won't this lock us into Google as vendor? Yes, to some extent, but not as much as it might seem. There a good comparison chart of of the services offered by GCP, Azure, and AWS here: https://www.techtarget.com/searchcloudcomputing/feature/A-cloud-services-cheat-sheet-for-AWS-Azure-and-Google-Cloud. The overall conclusion is that nearly all services offered by one vendor are also offered by the other two. We'e away that there can be differences in how each service is configured, and the APIs might be quite different. But we believe that the similarities are strong enough that it is feasible to port a complex system, such as arXiv from one to another at a cost of between 10 and 15% of the effort to create the original system. And particular, the service we expect to depend most heaviy on -- Google Cloud Run, has counterparts in each of the other Cloud vendors:


<table style="width: 100%;" class="main-article-table"> 
  <thead> 
   <tr> 
    <td style="width: 25%;"></td> 
    <td style="width: 25%;">AWS</td> 
    <td style="width: 25%;">Azure</td> 
    <td style="width: 25%;">Google Cloud</td> 
   </tr> 
  </thead> 
  <tbody> 
   <tr> 
    <td><strong>Container registry</strong></td> 
    <td>Amazon Elastic Container Registry (ECR), ECR Public</td> 
    <td>Azure Container Registry</td> 
    <td>Artifact Registry, Container Registry</td> 
   </tr> 
   <tr> 
    <td><strong>Managed container service</strong></td> 
    <td>AWS Copilot, Amazon Elastic Container Service (ECS), Amazon Elastic Kubernetes Service (EKS)</td> 
    <td>Azure Kubernetes Service (AKS)</td> 
    <td><a href="https://www.techtarget.com/searchitoperations/feature/Rounding-up-leading-container-management-software-in-detail">Google Kubernetes Engine</a><span> (GKE)</span></td> 
   </tr> 
   <tr> 
    <td><strong>Serverless containers</strong></td> 
    <td>AWS App Runner, AWS Fargate</td> 
    <td>Azure Container Instances (ACI)</td> 
    <td>Cloud Run</td> 
   </tr> 
  </tbody> 
 </table>

 ## Implementation principles

  - All code will be in Python
    * We do not intend to port any of the legacy perl or PHP code to the cloud
  - Choose a coding standards and styles, and stick to it
    - One candidate: https://peps.python.org/pep-0008/
    - Another candidate: https://peps.python.org/pep-0008/
    - Pick a dependency/package management strategy and stick to it
  - Insofar as possible, all arXiv code will be packaged in containers and deployed using Cloud Run
    * Except, maybe, for services that need large amounts of persistent in-memory data
    * Except, maybe, for some very simple, largely-applicative Cloud Functions
    * Except for managed services (see below)

## Managed services
 - In order make best use of our limited staff, we want to use managed services as much as possible
 - To keep administrative overhead down, use services from as few vendors as possible
 - If our primary Cloud vendor (GCP) has a service that meets our minimum requirements, use it, even if another vendor might have a slightly superior solution
 - Managed service we expect to use:
    - GCP Cloud SQL (mySQL and/postgresql)
    - GCP Cloud Run (so we don't have to manage our own Kubernetes Cluster)
    - GCP CDN
    - GCP Cloud Logging
    - GCP Cloud Monitoring Monitoring
    - GCP Cloud Armor for:
        - Intrusion detection
        - Protection against DOS attacks, and/or clients with excessively high load
    - GCP Pub/Sub and/or Cloud Tasks
    - Atlassion OpsGenie for alerts
        - Google doesn't have a serious comparable service to handle on-call schedules and notifications
        - We're already using OpsGenie and other Atlassian projects, so it doesn't add another vendor the mix
        - Even though PagerDuty has a superior service &#128512; <!-- smile emoji -->


## OpSec
 - The system will be build using [Infrastucture as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code#) principles -- the declarative version
 - The entire state of the system, as deployed, shall reside in Git
    - No production services shall be deployed or configured manually (this is aspirational right now)
    - Git provides many essential features for deployment management:
        - Change control (pull requests with an approval process)
        - Audit trail
        - Easy roll-back
    - Seperation of source code -- programs that implements arxiv.org, from the configuraiton that deploys arxiv.org
        - Makes it easier and cleaner to have beta, dev, test, etc. deployments
        - Makes it easier to re-use modules, perhaps for other arXiv-like services
        - Forsees other deployment targets -- potentially AWS or Azure, simply by having different deployment configutations (this only works if our code handles API differences)



    