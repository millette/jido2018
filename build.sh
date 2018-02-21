#!/bin/sh

# https://pandoc.org/ fait la conversion de markdown à HTML5

pandoc index.md --output=index-pandoc.json

pandoc index-pandoc.json --to=html5 --toc-depth=2 --section-divs --variable=sourcefile:index.md --template=template --toc --email-obfuscation=none --smart --standalone --output=index.html

# broken with subtitle, need newer pandoc
# pandoc index-pandoc.json --toc-depth=2 --variable=sourcefile:index.md --variable=lang:french --toc --email-obfuscation=none --smart --output=index.pdf

pandoc index-pandoc.json --toc-depth=2 --variable=sourcefile:index.md --variable=lang:french --toc --email-obfuscation=none --smart --output=index.odt


# pandoc index.md --from=markdown --to=html5 --toc-depth=2 --section-divs --variable=sourcefile:index.md --template=template --toc --email-obfuscation=none --smart --standalone --output=index.html

# pandoc index.md --toc-depth=2 --section-divs --variable=sourcefile:index.md --variable=lang:french --toc --email-obfuscation=none --smart --standalone --output=index.pdf

# pandoc index.md --toc-depth=2 --section-divs --variable=sourcefile:index.md --variable=lang:french --toc --email-obfuscation=none --smart --standalone --output=index.odt

dat .
