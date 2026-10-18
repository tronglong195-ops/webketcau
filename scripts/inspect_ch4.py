import fitz
import pytesseract
from PIL import Image
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

doc = fitz.open("source/pdf/tap1.pdf")

# We know from earlier session:
# Book page = PDF page + 2 (so PDF page = Book page - 2)
# Let's find Chapter 4 start around Book page 60-65 -> PDF page 58-63
# And Chapter 5 start around Book page 110-120
print("Inspecting TOC or Chapter 4 pages...")
for pdf_idx in [58, 59, 60, 61, 62, 63, 64, 65]:
    page = doc[pdf_idx]
    pix = page.get_pixmap(dpi=150)
    img_path = f"extract/temp_p{pdf_idx}.png"
    pix.save(img_path)
    ocr_text = pytesseract.image_to_string(Image.open(img_path), lang="vie+eng")
    os.remove(img_path)
    first_lines = [l.strip() for l in ocr_text.split("\n") if l.strip()][:4]
    print(f"PDF {pdf_idx} (Book ~{pdf_idx+2}):", first_lines)
