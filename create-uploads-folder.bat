@echo off
echo Creating uploads folder...
if not exist "backend\public\uploads" (
    mkdir "backend\public\uploads"
    echo Created uploads folder successfully!
) else (
    echo Uploads folder already exists!
)
pause 