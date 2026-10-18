import subprocess
import time
import json
import urllib.request
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# 1. Run headless Chrome with dump-dom on localhost:5173/
print("Testing Homepage http://localhost:5173/ ...")
import sys
sys.stdout.reconfigure(encoding='utf-8')

cmd1 = [chrome_path, "--headless", "--disable-gpu", "--dump-dom", "http://localhost:5173/"]
proc1 = subprocess.run(cmd1, capture_output=True, encoding="utf-8", errors="replace", timeout=15)
dom1 = proc1.stdout
print(f"Homepage DOM length: {len(dom1)}")
if "Kết Cấu Bê Tông Cốt Thép" in dom1:
    print("✅ Homepage rendered successfully! Found title 'Kết Cấu Bê Tông Cốt Thép'")
else:
    print("❌ Homepage might not have rendered expected content. First 500 chars:")
    print(dom1[:500])

# 2. Run headless Chrome with dump-dom on http://localhost:5173/tap-1/chuong-4
print("\nTesting Chapter 4 http://localhost:5173/tap-1/chuong-4 ...")
cmd2 = [chrome_path, "--headless", "--disable-gpu", "--dump-dom", "http://localhost:5173/tap-1/chuong-4"]
proc2 = subprocess.run(cmd2, capture_output=True, encoding="utf-8", errors="replace", timeout=15)
dom2 = proc2.stdout
print(f"Chapter 4 DOM length: {len(dom2)}")
if "Chương 4: Cấu kiện chịu uốn" in dom2:
    print("✅ Chapter 4 rendered successfully! Found 'Chương 4: Cấu kiện chịu uốn'")
else:
    print("❌ Chapter 4 might not have rendered expected content. First 500 chars:")
    print(dom2[:500])
