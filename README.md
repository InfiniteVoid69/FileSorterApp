# FileSorterApp

This is an open source application that will allow people to select directories (folders) and sort through them moving items using their file extension to directories.

## Simple Overview
```
List of Directories:
    |
    |___ Download
            |
            |___ .exe => Download/Executables (if not exist create new)
            |___ .png, .jpg, .gif => Documents/Images (if not exist create new)
    |
    |___ Documents
            |
            |___ .mp3 => Documents/Audio (if not exist create new)
            |___ .png, .jpg, .jpeg, .webp => Documents/Images (if not exist create new)
```


## Background Task

There are also plans for having this application to run in the background and having presets created to run when certain applications to run


### When no application with presets are running
```
List of Directories:
    |
    |___ Download
            |
            |___ .jar => (Do Nothing leave it in download folder)
            |___ .png, .jpg, .gif => Documents/Images (if not exist create new)
```
###  If Minecraft is Running:
```
List of Directories:
    |
    |___ Download
            |
            |___ .jar => move to .minecraft/mods
            |___ .png, .jpg, .gif => Documents/Images (if not exist create new)

```