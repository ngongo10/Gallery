@echo off
echo ===================================================
echo   DICH VU CAP NHAT WEBSITE - NGO THANH SINH
echo ===================================================
echo.
echo Dang quet cac thay doi (Anh moi, thong tin moi)...
git add -A

echo.
echo Dang luu lai cac thay doi...
git commit --no-verify -m "update: cap nhat anh va du lieu moi nhat"

echo.
echo Dang day len GitHub de cap nhat len Web (Vercel)...
git push origin main

echo.
echo ===================================================
echo   DA HOAN THANH! Web se tu dong cap nhat sau 1 phut.
echo ===================================================
echo.
pause
