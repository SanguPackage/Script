inputFile := "start.user.js"
saveAs := "sangupackage.user.js"
savePath :=

FileEncoding, UTF-8-RAW ; If it crashes here, you've got the wrong version of Autohotkey - see readme
workingDirectory = %A_WorkingDir%
SetWorkingDir, %A_ScriptDir%

; update version
versionFileName = version.txt
newVersion := GetNewVersion(versionFileName)
UpdateVersion(newVersion, versionFileName)

ParseAndSaveFile(inputFile, savePath, saveAs)

; Restore system state
SetWorkingDir, workingDirectory

; Below are functions etc

GetNewVersion(versionFileName)
{
	currentVersion =
	FileRead, currentVersion, %versionFileName%
	StringSplit, versionNumber, currentVersion, .
	versionNumber4 := versionNumber4 + 1
	newVersion = %versionNumber1%.%versionNumber2%.%versionNumber3%.%versionNumber4%

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
	{
		MsgBox Couldn't find: %fileName% - exitting
		ExitApp
	}

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
	;MsgBox %inputFile%, %savePath%, %saveFileName%

	formattedOutput := ParseFile(inputFile, 0)
	SaveFile(formattedOutput, savePath, saveFileName)
	return %formattedOutput%
}

return