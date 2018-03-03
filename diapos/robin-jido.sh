#!/bin/sh

# https://pandoc.org/ fait la conversion de markdown à HTML5

pandoc robin-jido.md --template=template --incremental --from=markdown --to=revealjs --email-obfuscation=none --smart --standalone --output=robin-jido.html

sed 's/★/\\*/g' robin-jido.md | sed 's/<br>/ /g' | sed 's/❤/ /' | sed 's/lang: fr$/lang: french/' | pandoc --from=markdown --to=latex --email-obfuscation=none --smart --standalone --output=robin-jido.pdf
