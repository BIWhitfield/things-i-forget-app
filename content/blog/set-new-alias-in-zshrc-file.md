---
path: /set-new-alias-in-zshrc-file/index.mdx
date: 2021-01-19T18:17:30.175Z
title: Set new alias in .zshrc file
description: Set an alias in the .zshrc file to open projects in vs code
---
```bash
$ open ~/.zshrc

// add alias to file 
alias [name]="~/file/path/to/project/ && code ."
		
// save file
// force restart of file in terminal with
$ source ~/.zshrc
```