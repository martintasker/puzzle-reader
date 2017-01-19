import marked from 'marked';

class PuzzleReader {
  constructor(mdString) {
    this.mdString = mdString;
    const htmlString = marked(mdString);
    const h1Sections = this._geth1Sections(htmlString);
    this.rubric = h1Sections.rubric.join('');
    this.puzzle = {text: this._getPuzzleSections(h1Sections.puzzle)};
  };

  _geth1Sections(htmlString) {
    const lines = htmlString.split('\n');
    const output = {rubric: [], puzzle: []};
    var outLabel = "";
    lines.forEach(function(line) {
      if (!line) {
        return;
      }
      var h1Label = ((line) => {
        const rx = /<h1 id=\"(.*)?\".*<\/h1>/
        const matches = line.match(rx);
        if (!matches) {
          return "";
        }
        return matches[1];
      })(line);
      if (h1Label) {
        outLabel = h1Label;
        output[outLabel] = output[outLabel] || [];
        return;
      }
      if (outLabel) {
        output[outLabel].push(line);
      }
    });
    return output;
  }

  _getPuzzleSections(puzzleHTML) {
    const html = puzzleHTML.join(' ');
    const sections = html.split(/<h2.*section<\/h2>/);
    const paraSections = sections.map(section => section.split(/<\/?p>/).filter(line => line!=="" && line!==" "));
    var res = [];
    for (var i = 0; i<sections.length; ++i) {
      if (i>0) {
        res.push("br");
      }
      paraSections[i].forEach(function(para) {
        res.push({p: para});
      });
    }
    return res;
  }

  getPuzzle() {
    return this.puzzle;
  }

  getRubric() {
    return this.rubric;
  }
}

export default PuzzleReader;
