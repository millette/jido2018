#!/bin/sh

# https://pandoc.org/ fait la conversion de markdown à HTML5

pandoc robin-jido.md --template=template --incremental --from=markdown+smart --to=revealjs --email-obfuscation=none --standalone --output=robin-jido.html

sed 's/★/\\*/g' robin-jido.md | sed 's/<br>/ /g' | sed 's/❤/ /' | sed 's/lang: fr$/lang: fr-CA/' | pandoc --from=markdown+smart --to=latex --email-obfuscation=none --standalone --output=robin-jido.pdf
