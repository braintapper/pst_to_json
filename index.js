const extractor = require("pst-extractor");
const fs = require("fs-extra")
const resolve = require("path").resolve;
const program = require("commander");


let depth = -1;
let col = 0;
let output = [];
let options = null
let debug = false

program
  .requiredOption('-s, --source <path>', 'Source File (.pst)')
  .requiredOption('-d, --destination <path>', 'Destination File (.json)')
  .option('-v, --verbose', 'Detailed output')
  .option('-p, --pretty', 'Pretty printed JSON output');

program.parse(process.argv);

console.log(program.opts());

if (program.verbose != null) {
  debug = true
}


if (program.pretty != null) {
  options = { spaces: 2 };
}

if (fs.pathExistsSync(program.source)) {


  const pstFile = new extractor.PSTFile(resolve(program.source));

  console.log(pstFile.getMessageStore().displayName);

  processFolder(pstFile.getRootFolder());
  fs.writeJsonSync(program.destination,output, options)

} else {
  console.log("Source: " + program.source + " does not exist.");
}




/**
 * Walk the folder tree recursively and process emails.
 * @param {PSTFolder} folder
 */

function processFolder(folder) {
    depth++;
    // the root folder doesn"t have a display name
    if (depth > 0) {
        console.log(getDepth(depth) + folder.displayName);
    }
    // go through the folders...
    if (folder.hasSubfolders) {
        let childFolders = folder.getSubFolders();
        for (let childFolder of childFolders) {
            processFolder(childFolder);
        }
    }
    // and now the emails for this folder
    if (folder.contentCount > 0) {
        depth++;
        let email = folder.getNextChild();
        while (email != null) {
          output.push(email);
          if (debug) {
            console.log(getDepth(depth) +
                "Time: " + email.messageDeliveryTime +
                ", Sender: " + email.senderName +
                ", Subject: " + email.subject  );
          }
          email = folder.getNextChild();

        }
        depth--;
    }
    depth--;
}
/**
 * Returns a string with visual indication of depth in tree.
 * @param {number} depth
 * @returns {string}
 */
function getDepth(depth) {
    let sdepth = "";
    if (col > 0) {
        col = 0;
        sdepth += "\n";
    }
    for (let x = 0; x < depth - 1; x++) {
        sdepth += " | ";
    }
    sdepth += " |- ";
    return sdepth;
}
