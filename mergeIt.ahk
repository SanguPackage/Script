inputFile := "start.user.js"
saveAs := "sangupackage.user.js"

; Save current changes
Send ^s

FileEncoding, UTF-8-RAW
workingDirectory = %A_WorkingDir%
SetWorkingDir, %A_ScriptDir%

; savePaths
IniRead, savePath, mergeIt.ini, SavePaths, operaSavePath, C:\CloudDrives\Dropbox\Personal\!Programming\OperaUserScripts\
IniRead, firefoxLocation, mergeIt.ini, SavePaths, firefoxSavePath, C:\Users\Wouter\AppData\Roaming\Mozilla\Firefox\Profiles\xtz5hi2x.default\gm_scripts\Sangu_Package\sangupackage.user.js
IniRead, sourceLocation, mergeIt.ini, Site, sourceLocation, C:\Users\Wouter\AppData\Roaming\Mozilla\Firefox\Profiles\xtz5hi2x.default\gm_scripts\Sangu_Package\sangupackage.user.js
IniRead, chromeRunSavePath, mergeIt.ini, SavePaths, chromeRunSavePath, C:\CloudDrives\Dropbox\Personal\!Programming\OperaUserScripts\
IniRead, chromeInstallSavePath, mergeIt.ini, SavePaths, chromeInstallSavePath, C:\CloudDrives\Dropbox\Personal\!Programming\UnixCode\TribalWars\sangupackage-chrome-store

; update version
versionFileName = version.txt
newVersion := GetNewVersion(versionFileName)
; MsgBox FINALOK: %newVersion%
UpdateVersion(newVersion, versionFileName)
ParseAndSaveFile(inputFile, savePath, saveAs)

; release version does not include build nr
StringSplit, versionArray, newVersion, .
newReleaseVersion = %versionArray1%.%versionArray2%
UpdateVersion(newReleaseVersion, versionFileName)

ParseAndSaveFile("release.user.js", sourceLocation, saveAs)
ParseAndSaveFile(sourceLocation . "index_toMerge.php", sourceLocation, "index.php")
UpdateVersion(newVersion, versionFileName)

; Autocopy to Firefox greasemonkey directory
; I *really* *really* should've used something else but Autohotkey for this
FileCopy, %savePath%%saveAs%, %firefoxlocation%, 1

; Autocopy for Chrome (with manifest.json)
FileCopy, %savePath%%saveAs%, %chromeRunSavePath%, 1
FileCopy, greasemonkey\manifest.json, %chromeRunSavePath%, 1
FileCopy, greasemonkey\favicon.png, %chromeRunSavePath%, 1

; Autocopy for chrome WEB STORE
FileCopy, %savePath%%saveAs%, %chromeInstallSavePath%, 1
FileCopy, greasemonkey\manifest.json, %chromeInstallSavePath%, 1
FileCopy, greasemonkey\favicon.png, %chromeInstallSavePath%, 1

; Check it in browser :)
SetTitleMatchMode RegEx
IfWinExist, ^.* \(\d+\|\d+\) - Tribal Wars - .*$
{
	WinActivate
	Send {F5}
}
 
; Restore system state
SetWorkingDir, workingDirectory

; Below are functions etc

GetNewVersion(versionFileName)
{
	currentVersion =
	FileRead, currentVersion, %versionFileName%
	StringSplit, versionNumber, currentVersion, .
	versionNumber3 := versionNumber3 + 1
	newVersion = %versionNumber1%.%versionNumber2%.%versionNumber3%

	return %newVersion%
}

UpdateVersion(newVersion, versionFileName)
{
	FileDelete, %versionFileName%
	FileAppend, %newVersion%, %versionFileName%
}

ParseFile(fileName, indentCount)
{
	if not FileExist(fileName)
		MsgBox Couldn't find: %fileName%

	replacedFile =
	Loop, Read, %fileName%
	{
		replacedFile .= ParseLine(A_LoopReadLine, indentCount) . "`r"
	}
	StringTrimRight, replacedFile, replacedFile, 1
	return %replacedFile%
}

ParseLine(line, indentCount)
{
	found =
	FoundInclude := RegExMatch(line, "(^\s*)?//\<!--@@INCLUDE "".*"" INDENT=\d //--\>", found)
	if FoundInclude
	{
		; //<!--@@INCLUDE "\importit.txt" INDENT=X //-->
		toIncludeFileName := RegExReplace(found, "^\s*")
		StringMid, toIncludeFileName, toIncludeFileName, 18 ; jump till filename
		closingQuotePosition := InStr(toIncludeFileName, """")
		StringMid, newIndent, toIncludeFileName, closingQuotePosition + 9 ; Jump to indent
		StringMid, newIndent, newIndent, 1, 1 ; Get indent
		StringMid, toIncludeFileName, toIncludeFileName, 1, closingQuotePosition - 1 ; Get filename
		
		If toIncludeFileName
		{
			toIncludeContent := ParseFile(toIncludeFileName, newIndent)
			StringReplace, line, line, %found%, %toIncludeContent%
		}
		else
		{
			StringReplace, line, line, %found%
		}
	}
	else 
	{
		currentDateReplacer := "//<!--@@INCLUDE CURRENTDATE //-->"
		IfInString, line, %currentDateReplacer%
		{
			currentDate = 
			FormatTime, currentDate, , d MMMM yyyy
			StringReplace, line, line, %currentDateReplacer%, %currentDate%
		}
		else if indentCount
		{
			Loop %indentCount%
			{
				;line := "    " . line
				line := A_TAB . line
			}
		}
	}
	
	return %line%
}

SaveFile(fileContent, savePath, saveFileName)
{
	FileDelete, %savePath%%saveFileName%
	FileAppend, %fileContent%, %savePath%%saveFileName%
}

ParseAndSaveFile(inputFile, savePath, saveFileName)
{
	formattedOutput := ParseFile(inputFile, 0)
	SaveFile(formattedOutput, savePath, saveFileName)
	return %formattedOutput%
}

return