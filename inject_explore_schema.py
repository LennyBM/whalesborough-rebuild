import os

BASE = r"c:\Users\User\Desktop\Whalesborough Rebuild\exploring-cornwall"

pages = [
    ("hitting-the-coast",
     "Hitting the Coast — North Cornwall Beaches & Coastal Walks | Whalesborough",
     "Beaches, coastal paths and water activities near Whalesborough Farm Resort. Widemouth Bay, Summerleaze, and the South West Coast Path from the doorstep.",
     "https://www.whalesborough.co.uk/exploring-cornwall/hitting-the-coast/"),
    ("family-days-out",
     "Family Days Out in Cornwall — Attractions & Activities | Whalesborough",
     "Family days out near Whalesborough near Bude. Theme parks, attractions, and activities across North Cornwall for all ages.",
     "https://www.whalesborough.co.uk/exploring-cornwall/family-days-out/"),
    ("days-with-dog",
     "Days Out with Your Dog in Cornwall | Whalesborough",
     "Dog-friendly days out near Whalesborough. The best dog-friendly beaches, pubs, and walks in North Cornwall.",
     "https://www.whalesborough.co.uk/exploring-cornwall/days-with-dog/"),
    ("dog-walks",
     "Dog Walks at Whalesborough — Routes & Trails | Whalesborough",
     "Dog walking routes from Whalesborough Farm Resort near Bude. On-estate trails, the Bude Canal walk, and coastal paths for dogs.",
     "https://www.whalesborough.co.uk/exploring-cornwall/dog-walks/"),
]

for folder, name, desc, url in pages:
    fpath = os.path.join(BASE, folder, "index.html")
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'application/ld+json' in content:
        print(f"SKIP (has schema): {folder}")
        continue

    schema = f'''  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{name}",
    "description": "{desc}",
    "url": "{url}",
    "isPartOf": {{
      "@type": "Resort",
      "name": "Whalesborough Farm Resort & Spa",
      "url": "https://www.whalesborough.co.uk/"
    }},
    "breadcrumb": {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.whalesborough.co.uk/"}},
        {{"@type": "ListItem", "position": 2, "name": "Exploring Cornwall", "item": "https://www.whalesborough.co.uk/exploring-cornwall/"}},
        {{"@type": "ListItem", "position": 3, "name": "{name.split(' — ')[0]}", "item": "{url}"}}
      ]
    }}
  }}
  </script>
</head>'''

    new_content = content.replace('</head>', schema, 1)
    if new_content == content:
        print(f"WARN — no </head>: {folder}")
        continue

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"OK: {folder}")

print("Done.")
