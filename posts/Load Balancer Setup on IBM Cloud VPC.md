---
author: "Francisco Ramos do Ó"
title: How To Setup a Load Balancer on IBM Cloud VPC
source: https://cloud.ibm.com/docs/vpc?topic=vpc-nlb-vs-elb
clipped: 2024-10-30T14:14:00.000Z
tags:
  - networking
  - ibm cloud
  - load balancer
---

Load balancing is a critical component in modern cloud architectures, enabling high availability, fault tolerance, and optimal resource utilization. This guide focuses on implementing a load balancer solution in IBM Cloud VPC (Virtual Private Cloud) using two Virtual Server Instances (VSIs) distributed across different zones in Madrid.

 **Use Cases:**

- Web applications requiring high availability
- Applications with varying traffic loads
- Services requiring fault tolerance
- Systems needing geographical distribution

## Architecture Overview

A comprehensive guide for setting up and troubleshooting a load balancer with multiple VSIs on IBM Cloud VPC.

![IBM Cloud VPC Load Balancer Architecture](/images/ibm-vpc-load-balancer-architecture.png)

## Prerequisites
- IBM Cloud Account
- VPC created
- SSH key pair
- Basic knowledge of Linux commands

## Step 1: Create Virtual Server Instances (VSIs)

1. Create first VSI:
```bash
# Madrid-01 Zone
Name: vsi-madrid-01
Zone: madrid-01
Profile: bx2-2x8
Image: Ubuntu 22.04
```

2. Create second VSI:
```bash
# Madrid-02 Zone
Name: vsi-madrid-02
Zone: madrid-02
Profile: bx2-2x8
Image: Ubuntu 22.04
```

3. Assign floating IPs to both VSIs for initial setup (this is necessary to SSH into both machines).

## Step 2: Install and Configure Web Servers

1. SSH into each VSI:
```bash
ssh -i <private-key> root@<floating-ip>
```

2. Install Apache2:
```bash
# On both VSIs
sudo apt update
sudo apt install apache2 -y
```

3. Create unique index pages:
```bash
# On VSI-01
echo "<h1>Server 1 - Madrid-01</h1>" | sudo tee /var/www/html/index.html

# On VSI-02
echo "<h1>Server 2 - Madrid-02</h1>" | sudo tee /var/www/html/index.html
```

4. Verify local installation:
```bash
# Test locally on each server
curl localhost

# Test using private IP
curl 10.251.0.4    # VSI-01
curl 10.251.64.4   # VSI-02
```

## Step 3: Create Load Balancer

1. Access VPC Load Balancers section
2. Click "Create"
3. Configure basic settings:
```plaintext
Name: mad-load-balancer
Type: Application Load Balancer
Subnets: Select both Madrid-01 and Madrid-02
```

4. Create Backend Pool:
```plaintext
Name: madrid-vsi-apache2
Protocol: HTTP
Method: Round robin
Health check path: /
Health check port: 80
Health check interval: 5s
```

5. Add VSIs to Backend Pool:
```plaintext
Select both VSIs
Port: 80
```

6. Configure Frontend Listener:
```plaintext
Protocol: HTTP
Port: 80
```

## Step 4: Configure Security Groups

1. Create Security Group:
```plaintext
Name: lb-security-group
```

2. Add Inbound Rules:
```plaintext
Rule 1 - SSH:
- Protocol: TCP
- Port: 22
- Source: Your IP

Rule 2 - HTTP:
- Protocol: TCP
- Port: 80
- Source: 0.0.0.0/0

Rule 3 - ICMP:
- Protocol: ICMP
- Type: 8
- Code: Any
```

3. Add Outbound Rules:
```plaintext
Allow all outbound traffic:
- Protocol: ALL
- Destination: 0.0.0.0/0
```

## Step 5: Testing

1. Basic Connectivity:
```bash
# Test load balancer
curl http://<load-balancer-ip>

# Multiple requests to verify distribution
for i in {1..10}; do curl -s http://<load-balancer-ip>; done
```

2. Apache Benchmark Testing:
```bash
# Install ab tool
sudo apt install apache2-utils

# Run load test
ab -n 1000 -c 10 http://<load-balancer-ip>/
```

## Troubleshooting Guide

### 1. VSI Connectivity Issues

Check Apache status:
```bash
sudo systemctl status apache2
```

Verify port listening:
```bash
sudo ss -tulnp | grep apache
```

Check Apache configuration:
```bash
sudo nano /etc/apache2/ports.conf
# Should contain: Listen 80
```

### 2. Load Balancer Issues

1. Health Check Status:
   - Check backend pool health status in UI
   - Verify health check settings
   - Review health check logs

2. Security Group Verification:
```bash
# Test connectivity from VSI
curl -v localhost
curl -v <other-vsi-private-ip>
```

3. Network ACL Verification:
   - Check inbound rules
   - Verify outbound rules
   - Confirm subnet configurations

### 3. Common Issues and Solutions

1. No Response from Load Balancer:
   - Check security group rules
   - Verify listener configuration
   - Confirm backend pool health

2. Intermittent Connectivity:
   - Check health check thresholds
   - Verify network stability
   - Review VSI resources

3. Uneven Distribution:
   - Verify load balancing method
   - Check session persistence settings
   - Review health check results

## Monitoring and Maintenance

1. Regular Health Checks:
```bash
# Create monitoring script
#!/bin/bash
while true; do
    curl -s -w "\n" http://<load-balancer-ip>
    sleep 5
done
```

2. Performance Monitoring:
   - Monitor throughput
   - Check response times
   - Review error rates
     <br>

3. Logging:
```bash
# Check Apache logs
sudo tail -f /var/log/apache2/access.log
sudo tail -f /var/log/apache2/error.log
```

## Best Practices

1. Security:
   - Keep security groups minimal
   - Regularly update systems
   - Monitor access logs

2. Performance:
   - Configure appropriate health checks
   - Monitor backend pool status
   - Set proper timeout values

3. Maintenance:
   - Regular backup of configurations
   - Document all changes
   - Keep monitoring active

## Additional Resources
- IBM Cloud VPC Documentation
- Apache Documentation
- Load Balancer Best Practices Guide

Remember to always test in a development environment before implementing changes in production.

### Round Robin Load Balancing 101

The server response alternates between Server 1 and Server 2 because of the Round Robin load balancing algorithm. Let me explain it simply:

![Round Robin Load Balancing Diagram](/images/round-robin-load-balancing.png)

Here's what happens:

1. First Request:
```bash
$ curl http://load-balancer-ip
<h1>Server 1 - Madrid-01</h1>
```
- Load balancer receives your request
- Sends it to Server 1
- You see Server 1's response

2. Second Request:
```bash
$ curl http://load-balancer-ip
<h1>Server 2 - Madrid-02</h1>
```
- Load balancer receives your next request
- Sends it to Server 2
- You see Server 2's response

3. Third Request:
```bash
$ curl http://load-balancer-ip
<h1>Server 1 - Madrid-01</h1>
```
- Back to Server 1
- The cycle continues

It's like a traffic officer directing cars alternately to two different parking lots:
1. First car → Lot 1
2. Second car → Lot 2
3. Third car → Lot 1 again
4. Fourth car → Lot 2 again

This ensures that:
- Both servers share the work equally
- No single server gets overloaded
- If one server fails, the other can take over

You can test this pattern with:
```bash
# Run this to see the alternating pattern
for i in {1..6}; do
    echo "Request $i:"
    curl -s http://load-balancer-ip
    echo "----------------"
    sleep 1
done
```

This is the simplest form of load balancing (Round Robin). Think of it as taking turns - each server gets a turn to handle a request, one after the other.

Note: This guide provides a basic example of load balancer configurations and automation scripts for demonstration and learning purposes. For production environments, additional security measures, compliance requirements, and best practices must be implemented.