# Sportex APP

 The repo for the sportex app. 
 This is part of the Thesis of Ignacio Vargas and Agustin Garcia as a end of career project for Universidad ORT.

- [Info](#info)
- [Instalation](#installation)
- [Troubleshoot](#troubleshoot)
- [Logging](#logging)

## Info

The sportex app is created using react native.

## Installation
1. Download or copy this repository.
2. Using terminal, go to project folder and run this command:

```javascript
react-native start
react-native run-android
```
3. Run it on iOS simulator using command:
```javascript
react-native run-ios
```
4. If you dont have an emulator created, youcan run this command:
```javascript 
~/Android/Sdk/tools/bin/avdmanager create avd --force --name Nexus6P --abi google_apis/x86_64 --package 'system-images;android-26;google_apis;x86_64' --device "Nexus 6P"
```
5. **That's all.**

## Troubleshoot
1. If when runing 
```javascript
react-native start
```
The server throws:
A. A watchman error, run this:

```javascript
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
```

B. This error: "Metro Bundler can't listen on port 8081", run this:  
```javascript
sudo lsof -i :8081
```
And kill the process "node"


## Logging
To view logs run this:

```javascript
react-native log-ios
react-native log-android
```


