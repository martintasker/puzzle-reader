import marked from 'marked';

class PuzzleReader {
  constructor(mdString) {
    this.mdString = mdString;
    this.htmlString = marked(mdString);
    this.h1Sections = this._geth1Sections();
  };

  _geth1Sections() {
    const lines = this.htmlString.split('\n');
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

  getPuzzle() {
    return null;
  }

  getRubric() {
    return this.h1Sections.rubric;
  }
}

export default PuzzleReader;
