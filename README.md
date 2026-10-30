# orders-service (demo)

Order service of a fictional online store. This repository is a demo environment for an n8n course:
an AI agent investigates an incident using its releases and, after a human approves, files reports in its Issues.

The code is not meant to run in production. All data is fictional.

## How to read the releases

Every release has three different points in time:

| What | Where to see it | What it means |
| --- | --- | --- |
| Commit date | git history | when the code was written |
| Release date | GitHub Releases | when the version was built and published |
| **Deployed at** | first line of the release notes | when the version reached production |

Only the last one matters for incident investigation: a release can sit published for days before it is deployed.
