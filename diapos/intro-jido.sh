#!/bin/sh

# https://pandoc.org/ fait la conversion de markdown à HTML5

pandoc intro-jido.md --template=template --incremental --from=markdown+smart --to=revealjs --email-obfuscation=none --standalone --output=intro-jido.html

sed 's/★/\\*/g' intro-jido.md |sed 's/❤/ /' | sed 's/lang: fr$/lang: fr-CA/' | pandoc --from=markdown+smart --to=latex --email-obfuscation=none --standalone --output=intro-jido.pdf
