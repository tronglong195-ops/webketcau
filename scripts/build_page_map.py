import os
import re
import json
import fitz  # PyMuPDF
from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_page_number_from_header_footer(pix):
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    w, h = img.size
    
    # Check top strip (corners)
    # Left top corner (even page in standard book)
    top_left = img.crop((0, 0, int(w * 0.25), int(h * 0.12)))
    # Right top corner (odd page)
    top_right = img.crop((int(w * 0.75), 0, w, int(h * 0.12)))
    
    # OCR top left and right
    cfg = r'--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789'
    txt_tl = pytesseract.image_to_string(top_left, config=cfg).strip()
    txt_tr = pytesseract.image_to_string(top_right, config=cfg).strip()
    
    nums_tl = re.findall(r'\b\d{1,3}\b', txt_tl)
    nums_tr = re.findall(r'\b\d{1,3}\b', txt_tr)
    
    found = []
    if nums_tl:
        found.extend([int(n) for n in nums_tl])
    if nums_tr:
        found.extend([int(n) for n in nums_tr])
        
    return found

def test_pages(pdf_path, start_pdf, end_pdf):
    doc = fitz.open(pdf_path)
    for p in range(start_pdf, end_pdf + 1):
        page = doc[p - 1]
        pix = page.get_pixmap(dpi=120)
        nums = extract_page_number_from_header_footer(pix)
        print(f"PDF {p}: detected numbers {nums}")

if __name__ == '__main__':
    test_pages('source/pdf/tap1.pdf', 7, 16)
