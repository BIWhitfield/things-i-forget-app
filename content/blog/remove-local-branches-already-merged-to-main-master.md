---
path: remove-local-branches-merged-to-main
date: 2021-09-28T09:10:50.532Z
title: Remove Local Branches Already Merged to Main/Master
description: Terminal command to remove all local branches that have already
  been merged to main/master
---
```bash
$ git branch --merged main | grep -v "\* main" | xargs -n 1 git branch -d
```