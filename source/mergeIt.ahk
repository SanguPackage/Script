inputFile := "start.user.js"
savePath := "C:\Users\PC\Documents\Dropbox\Personal\!Programming\OperaUserScripts\"
saveAs := "sangupackage.user.js"

; Save current changes
Send ^s

FileEncoding, UTF-8-RAW
workingDirectory = %A_WorkingDir%
SetWorkingDir, %A_ScriptDir%

UpdateVersion("version.txt")
ParseAndSaveFile(inputFile, savePath, saveAs)
ParseAndSaveFile("release.user.js", "..\site\", saveAs)
ParseAndSaveFile("..\site\index_toMerge.php", "..\site\", "index.php")

; Autocopy to Firefox greasemonkey directory
; I *really* *really* should've used something else but Autohotkey for this
FileCopy, %savePath%%saveAs%, C:\Users\PC\AppData\Roaming\Mozilla\Firefox\Profiles\gg8w0cv7.default\gm_scripts\Sangu_Package\sangupackage.user.js, 1

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

UpdateVersion(versionFileName)
{
	currentVersion =
	FileRead, currentVersion, %versionFileName%
	StringSplit, versionNumber, currentVersion, .
	versionNumber3 := versionNumber3 + 1
	newVersion = %versionNumber1%.%versionNumber2%.%versionNumber3%
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