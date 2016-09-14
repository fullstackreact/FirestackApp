#!/usr/local/env bash

adb logcat | grep $(adb shell ps | grep -i com.firestackapp | cut -c10-15) 