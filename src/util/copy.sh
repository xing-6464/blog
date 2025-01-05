#!/bin/bash
cd `当前目录`
cp access.log $(date +%Y-%m-%d).access.log
echo "" >> access.log
