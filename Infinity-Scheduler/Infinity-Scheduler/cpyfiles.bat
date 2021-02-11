
echo "build complete, copying files..."
xcopy "dist" "./../../.." /Y /S
xcopy "server" "./../../../server" /Y /S
