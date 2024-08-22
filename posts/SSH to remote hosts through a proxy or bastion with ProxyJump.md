---
author: "Francisco Ramos do Ó"
title: SSH to remote hosts through a proxy or bastion with ProxyJump
source: https://www.redhat.com/sysadmin/ssh-proxy-bastion-proxyjump
clipped: 2023-11-30T00:00:00.000Z
tags:
  - networking
---

The `ProxyJump`, or the `-J` flag, was introduced in `ssh` version 7.3. To use it, specify the bastion host to connect through after the `-J` flag, plus the remote host:

```shell
ssh -J <bastion-host> <remote-host>
```

You can also set specific usernames and ports if they differ between the hosts:

```shell
ssh -J user@<bastion:port> <user@remote:port>
```

The `ssh` man (or manual) page (`man ssh`) notes that multiple, comma-separated hostnames can be specified to jump through a series of hosts:

```shell
ssh -J <bastion1>,<bastion2> <remote>
```

This feature is useful if there are multiple levels of separation between a bastion and the final remote host. For example, a public bastion host giving access to a "web tier" set of hosts, within which is a further protected "database tier" group might be accessed.


