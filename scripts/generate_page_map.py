import json
import re
import os
import time
import fitz
from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def detect_page_number(page):
    pix = page.get_pixmap(dpi=120)
    img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    w, h = img.size

    # Look in top 8% of page (left and right)
    cfg = r'--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789'
    
    # Left box (e.g. top-left corner)
    box_tl = img.crop((int(w * 0.02), int(h * 0.01), int(w * 0.22), int(h * 0.08)))
    # Right box (e.g. top-right corner)
    box_tr = img.crop((int(w * 0.78), int(h * 0.01), int(w * 0.98), int(h * 0.08)))
    
    txt_l = pytesseract.image_to_string(box_tl, config=cfg).strip()
    txt_r = pytesseract.image_to_string(box_tr, config=cfg).strip()
    
    candidates = []
    for txt in [txt_l, txt_r]:
        for token in re.findall(r'\b\d{1,3}\b', txt):
            val = int(token)
            if 1 <= val <= 500:
                candidates.append(val)
    return candidates

def map_volume(pdf_path, name):
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Mapping {name}: {total_pages} pages...")
    
    detected = {}
    # We sample every 5 pages, plus first 20 and last 20
    pages_to_check = set(range(1, min(25, total_pages + 1)))
    pages_to_check.update(range(max(1, total_pages - 25), total_pages + 1))
    pages_to_check.update(range(1, total_pages + 1, 5))
    
    for pno in sorted(pages_to_check):
        page = doc[pno - 1]
        nums = detect_page_number(page)
        if nums:
            # Pick candidate closest to expected (pno)
            best = min(nums, key=lambda x: abs(x - pno))
            if abs(best - pno) < 30: # plausible offset
                detected[pno] = best
                print(f"  [{name}] PDF {pno} -> Book {best} (diff {best - pno})")
                
    return detected, total_pages

def build_full_map(detected, total_pages, default_offset):
    # Interpolate page map
    # PDF page -> Book page
    pdf_to_book = {}
    book_to_pdf = {}
    
    # We find continuous segments with constant offset
    # offset = book - pdf
    known_points = sorted(detected.keys())
    
    for p in range(1, total_pages + 1):
        # find closest known point
        if p in detected:
            b = detected[p]
        else:
            # find surrounding known points
            prev_p = [k for k in known_points if k < p]
            next_p = [k for k in known_points if k > p]
            if prev_p and next_p:
                p1, p2 = prev_p[-1], next_p[0]
                offset1 = detected[p1] - p1
                offset2 = detected[p2] - p2
                if offset1 == offset2:
                    b = p + offset1
                else:
                    # interpolate
                    frac = (p - p1) / (p2 - p1)
                    b = int(round(detected[p1] + frac * (detected[p2] - detected[p1])))
            elif prev_p:
                b = p + (detected[prev_p[-1]] - prev_p[-1])
            elif next_p:
                b = p + (detected[next_p[0]] - next_p[0])
            else:
                b = p + default_offset
                
        pdf_to_book[str(p)] = b
        if str(b) not in book_to_pdf: # keep first occurrence
            book_to_pdf[str(b)] = p
            
    return {"pdf_to_book": pdf_to_book, "book_to_pdf": book_to_pdf}

def main():
    os.makedirs('extract', exist_ok=True)
    
    res = {}
    for name, path, default_offset in [
        ('tap1', 'source/pdf/tap1.pdf', 2),
        ('tap2', 'source/pdf/tap2.pdf', -1),
        ('tap3', 'source/pdf/tap3.pdf', -1)
    ]:
        det, total = map_volume(path, name)
        res[name] = build_full_map(det, total, default_offset)
        
    with open('extract/page-map.json', 'w', encoding='utf-8') as f:
        json.dump(res, f, ensure_ascii=False, indent=2)
        
    print("Saved extract/page-map.json successfully!")

if __name__ == '__main__':
    main()
