inputFile := "start.user.js"
savePath := "" ;C:\Users\PC\Documents\Dropbox\Personal\!Programming\OperaUserScripts\
saveAs := "sangupackage.user.js"

ParseFile(fileName, indentCount)
{
	if not FileExist(fileName)
		MsgBox %fileName%

	replacedFile =
	Loop, Read, %fileName%
	{
		replacedFile .= ParseLine(A_LoopReadLine, indentCount) . "`r"
	}
	StringTrimRight, replacedFile, replacedFile, 1
	return %replacedFile%
}

ParseLine(line, ByRef indentCount)
{
	found =
	FoundInclude := RegExMatch(line, "(^\s*)?//\<!--@@INCLUDE "".*"" (INDENT(\+|-) )?//--\>", found)
	if FoundInclude
	{
		; //<!--@@INCLUDE "\importit.txt" INDENT+ //-->
		toIncludeFileName := RegExReplace(found, "^\s*")
		StringMid, toIncludeFileName, toIncludeFileName, 19
		closingQuotePosition := InStr(toIncludeFileName, """")
		StringMid, identTest, toIncludeFileName, closingQuotePosition
		StringMid, toIncludeFileName, toIncludeFileName, 1, closingQuotePosition - 1
		
		;newIndent := indentCount
		IfInString, identTest, INDENT+
			indentCount++
		IfInString, indentTest, INDENT-
			indentCount--
		
		If toIncludeFileName
		{
			toIncludeContent := ParseFile(toIncludeFileName, indentCount)
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

return