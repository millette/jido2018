#!/bin/sh

# https://pandoc.org/ fait la conversion de markdown à HTML5

pandoc intro-jido.md --variable=theme:sky --template=template --incremental --from=markdown --to=revealjs --email-obfuscation=none --smart --standalone --output=intro-jido.html

sed 's/★/\\*/g' intro-jido.md |sed 's/❤/ /' | sed 's/lang: fr$/lang: french/' | pandoc --from=markdown --to=latex --email-obfuscation=none --smart --standalone --output=intro-jido.pdf
