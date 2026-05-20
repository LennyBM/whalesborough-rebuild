import re

src = open('assets/css/whalesborough.css', 'r', encoding='utf-8').read()

# Split into string-literal and code segments so we never touch whitespace
# inside quoted CSS values (e.g. content: " (" attr(href) ")").
parts = []
i, n = 0, len(src)
while i < n:
    c = src[i]
    if c in '"\'':
        q = c
        j = i + 1
        while j < n and src[j] != q:
            if src[j] == '\\':
                j += 1
            j += 1
        parts.append(('S', src[i:j + 1]))
        i = j + 1
    elif c == '/' and i + 1 < n and src[i + 1] == '*':
        j = src.find('*/', i + 2)
        j = n if j == -1 else j + 2
        i = j  # drop comment
    else:
        k = i
        while k < n and src[k] not in '"\'' and not (src[k] == '/' and k + 1 < n and src[k + 1] == '*'):
            k += 1
        parts.append(('C', src[i:k]))
        i = k

res = []
for kind, txt in parts:
    if kind == 'S':
        res.append(txt)
        continue
    txt = re.sub(r'\s+', ' ', txt)
    # Only strip around structural punctuation. Leave whitespace around
    # + - > ~ alone: combinators tolerate it and calc() REQUIRES it.
    txt = re.sub(r'\s*([{};,])\s*', r'\1', txt)
    txt = re.sub(r'\s*:\s*', ':', txt)
    txt = txt.replace(';}', '}')
    res.append(txt)

mini = ''.join(res).strip()
open('assets/css/whalesborough.min.css', 'w', encoding='utf-8', newline='').write(mini)
orig = len(src.encode('utf-8'))
new = len(mini.encode('utf-8'))
print(f"original={orig}B  minified={new}B  saved={100 - 100 * new // orig}%")
