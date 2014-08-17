[Sangu Package](http://www.sangu.be) - Warlord TW extension
=============

The Sangu Package is a Greasemonkey script for Firefox, 
Opera and Chrome (Tampermonkey) that improves [Tribal Wars](http://www.tribalwars.nl) gameplay speed 
and optimizes gameplay flow by
adding extra features on pretty much every page, most notably the village overview pages.

Support
-------

The Sangu Package supports all TribalWars.nl worlds.
All features should work on the latest versions of Opera, FireFox and Chrome.

Code
----

The code is pure JavaScript with extensive use of jQuery.

Code structure:

 - **config\** : server and world config, user settings and translations.
 - **func\** : Functions of all kinds. (UI, DateTime, Debug, Persistence, Number and TW Building helpers)
 - **global\** : Features active on all pages. (activator, friends, incomingsindicator, map jumper, ...)
 - **greasemonkey\** : Code specific for Greasemonkey/UserScript.
 - **overviews\** : The features for the Tribal Wars overview pages. **Most code is in here**
 - **page\** : The features for specific Tribal Wars pages. **... and in here**.
 - **mergeIt.ahk** : The Autohotkey script that creates `sangupackage.user.js` from `start.user.js`.
 - **mergeIt.ini** : Configuration for `mergeIt.ahk`.
 - **release.user.js** : The release version of the script.
 - **start.user.js** : The file that is merged by `mergeIt.ahk` to `sangupackage.user.js`.
 - **version.txt** : Current version of Sangu Package.

Building the script from source
-------------------------------

An [Autohotkey](http://ahkscript.org/) script (mergeIt.ahk) can be used to assemble the different js files
into "sangupackage.user.js".
To do this: Download and install Autohotkey, then double click mergeIt.ahk when in the same directory as the source files
and it will create the complete Greasemonkey script. Configure the path for Opera UserScripts and FireFox Greasemonkey in
`mergeIt.ini`

This (Autohotkey) means the script can currently only be assembled on a Windows machine. (This was perhaps not really
thought through:). If a non Windows person wants to join the project, I'm sure we can come up with a solution that works
for both environments :)

Contributing
------------

**The Sangu Package is currently looking for a project maintainer**

Contact
-------

You can contact me at package@sangu.be.
