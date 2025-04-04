@echo off
for %%f in (*.jpg) do (
    powershell -Command "Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile('%%f'); $img.Save('%%~nf.gif', [System.Drawing.Imaging.ImageFormat]::Gif); $img.Dispose()"
)
echo Done!
pause
