inputFile := "start.user.js"
savePath := "C:\Users\PC\Documents\Dropbox\Personal\!Programming\OperaUserScripts\"
saveAs := "sangupackage.user.js"

FileEncoding, UTF-8-RAW
workingDirectory = %A_WorkingDir%
SetWorkingDir, %A_ScriptDir%

ParseSaveAndBackupFile(inputFile, savePath, saveAs, 1)
;ParseSaveAndBackupFile("release.user.js", "..\site\", saveAs, 0)
;ParseSaveAndBackupFile("..\site\index_toMerge.php", "..\site\", "index.php", 0)

SetWorkingDir, workingDirectory

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

ParseSaveAndBackupFile(inputFile, savePath, saveFileName, keepBackup)
{
	; Keep backups of merges?
	if keepBackup
	{
		IfExist, %savePath%%saveFileName%
		{
			backupCount := 0
			backupFileName = %savePath%%saveFileName%
			while FileExist(backupFileName)
			{
				backupFileName = backup\%saveFileName%%backupCount%
				backupCount++
			}
			FileMove, %savePath%%saveFileName%, %backupFileName%
			
			if ErrorLevel
			{
				MsgBox backup directory does not exist?
			}
		}
	}
	else
	{
		FileDelete, %savePath%%saveFileName%
	}

	formattedOutput := ParseFile(inputFile, 0)	
	FileAppend, %formattedOutput%, %savePath%%saveFileName%
}

return