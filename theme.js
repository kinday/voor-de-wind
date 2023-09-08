#!/usr/bin/env node

const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

function toHex(number) {
  return `00${parseInt(number, 10).toString(16)}`.slice(-2).toUpperCase()
}

function toColor(rgb, a) {
  return `#${[...rgb, a || 255].map(toHex).join('')}`
}

const DARK = {
  accent: [176, 219, 138],
  background: [0, 0, 0],
  comment: [201, 66, 53],
  foreground: [208, 208, 208],
  highlight: [255, 255, 255]
}

function generateColorScheme(type, colors) {
  const theme = {
    "$schema": "vscode://schemas/color-theme",
    "name": "Voor de Wind",
    "colors": {
      "titleBar.activeBackground": toColor(colors.background),
      "editorWhitespace.foreground": toColor(colors.highlight, 32),
      "statusBar.foreground": toColor(colors.highlight, 64),
      "activityBar.foreground": toColor(colors.highlight, 64),
      "editorRuler.foreground": toColor(colors.highlight, 16),
      "editorIndentGuide.background": toColor(colors.highlight, 16),
      "activityBar.background": toColor(colors.background),
      "statusBar.background": toColor(colors.background),
      "sideBar.background": toColor(colors.background),
      "sideBar.foreground": toColor(colors.highlight, 80),
      "tab.activeBackground": toColor(colors.background),
      "editorGroupHeader.noTabsBackground": toColor(colors.background),
      "tab.inactiveBackground": toColor(colors.background),
      "sideBarSectionHeader.background": toColor(colors.background),
      "list.activeSelectionBackground": toColor(colors.background),
      "list.inactiveSelectionBackground": toColor(colors.background),
      "list.focusBackground": toColor(colors.highlight, 64),
      "list.hoverBackground": toColor(colors.highlight, 64),
      "editor.background": toColor(colors.background),
      "editor.foreground": toColor(colors.foreground)
    },
    "tokenColors": [
      {
        "scope": "source.js",
        "settings": {
          "foreground": toColor(colors.foreground)
        }
      },
      // {
      //   "scope": "constant.numeric.line-number.find-in-files - match",
      //   "settings": {
      //     "foreground": "#8FBE00A0"
      //   }
      // },
      // {
      //   "scope": "entity.name.filename.find-in-files",
      //   "settings": {
      //     "foreground": "#E6DB74"
      //   }
      // },
      {
        "name": "Punctuation",
        "scope": [
          "punctuation",
          "meta.brace",
          "meta.delimiter",
          "keyword.operator",
          "variable.other.constant.object.js",
          "variable.other.object.js",
          "variable.language.this.js"
        ],
        "settings": {
          "foreground": toColor(colors.highlight, 54)
        }
      },
      {
        "name": "String",
        "scope": [
          "constant",
          "string",
          "string punctuation.definition.string"
        ],
        "settings": {
          "foreground": toColor(colors.accent)
        }
      },
      {
        "name": "Keywords",
        "scope": [
          "keyword",
          "storage"
        ],
        "settings": {
          "foreground": toColor(colors.highlight, 64)
        }
      },
      {
        "name": "Reset",
        "scope": [
          "support.constant.dom",
          "variable.other.readwrite.js"
        ],
        "settings": {
          "foreground": toColor(colors.highlight)
        }
      },
      {
        "name": "Comment",
        "scope": [
          "comment",
          "punctuation.definition.comment"
        ],
        "settings": {
          "foreground": toColor(colors.comment)
        }
      }
    ],
    "uuid": "4964F69D-59F0-45A1-9B55-7A0F37A19AB3",
    "colorSpaceName": "sRGB",
    "semanticClass": `theme.${type}.voor_de_wind`
  }

  return JSON.stringify(theme, null, 2)
}

if (require.main === module) {

  const darkTheme = writeFile(
    `themes/voor-de-wind-dark.json`,
    generateColorScheme('dark', DARK)
  )

  Promise.all([darkTheme])
    .then(() => console.log('Done!'))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
