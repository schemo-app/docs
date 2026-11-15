---
title: Run a collection against an environment
weight: 2
---

Use a collection when you want to run the same API checks after changing an endpoint or configuration.

## Prepare the requests

1. Save the requests you want to check into one [collection]({{< relref "/docs/features/collections-and-environments" >}}).
2. Replace the common origin in their URLs with `{{baseUrl}}`.
3. Create an environment for each API instance and set `baseUrl` in each. Use matching variable names for any credentials or other settings the requests need.
4. Add [response assertions]({{< relref "/docs/features/scripts-and-runs" >}}) for the behavior you want to verify.

## Run and compare

Select the first environment and open the collection. Use **Run all** and review each result under **Runs**. Switch the active environment, start a new run, and compare the failed requests and their responses. If a request uses a pinned environment, check that setting before comparing.
