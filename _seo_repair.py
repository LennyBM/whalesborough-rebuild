#!/usr/bin/env python3
"""Fix malformed og:image tags produced by the first batch pass."""
import re
from pathlib import Path

BASE = Path(r"c:\Users\User\Desktop\Whalesborough Rebuild")
SKIP = {"design-system", "logo-preview.html", "_seo_batch.py", "_seo_repair.py"}

fixed = 0
for path in sorted(BASE.rglob("*.html")):
    if any(s in str(path) for s in SKIP):
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    orig = text

    # 1. Close the unclosed og:image tag (missing />)
    #    Pattern: property="og:image" content="..." followed by newline without />
    text = re.sub(
        r'(property="og:image" content="[^"]+")(\s*\n)',
        r'\1 />\2',
        text
    )

    # 2. Fix double-close on twitter:image line: ...jpg" /> />  → ...jpg" />
    text = re.sub(r'(" )/> />', r'\1/>', text)

    if text != orig:
        path.write_text(text, encoding="utf-8")
        fixed += 1
        print(f"  FIXED  {path.relative_to(BASE)}")

print(f"\nRepaired {fixed} files.")
