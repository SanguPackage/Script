inputFile := "start.user.js"
savePath := "C:\Users\PC\Documents\Dropbox\Personal\!Programming\OperaUserScripts\"
saveAs := "sangupackage.user.js"

workingDirectory = %A_WorkingDir%
SetWorkingDir, %A_ScriptDir%

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
		StringMid, toIncludeFileName, toIncludeFileName, 19
		closingQuotePosition := InStr(toIncludeFileName, """")
		StringMid, newIndent, toIncludeFileName, closingQuotePosition + 9
		StringMid, newIndent, newIndent, 1, 1
		StringMid, toIncludeFileName, toIncludeFileName, 1, closingQuotePosition - 1
		
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
	else if indentCount
	{
		Loop %indentCount%
		{
			;line := "    " . line
			line := A_TAB . line
		}
	}
	
	return %line%
}

; Keep backups of merges?
IfExist, %savePath%%saveAs%
{
	backupCount := 0
	backupFileName = %savePath%%saveAs%
	while FileExist(backupFileName)
	{
		backupFileName = backup\%saveAs%%backupCount%
		backupCount++
	}
	FileMove, %savePath%%saveAs%, %backupFileName%
	FileCopy, %inputFile%, %backupFileName%_source
}

formattedOutput := ParseFile(inputFile, 0)
FileAppend, %formattedOutput%, %savePath%%SaveAs%

SetWorkingDir, workingDirectory

return