import marked from 'marked';

class PuzzleReader {
  constructor(mdString) {
    this.mdString = mdString;
    this.htmlString = marked(mdString);
  };

  getPuzzle() {
    return null;
  }

  getRubric() {
    return null;
  }
}

export default PuzzleReader;
