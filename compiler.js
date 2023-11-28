const fs = require("fs");
const filePath = process.argv[2];

const prefix = `
const print = console.log;
const printErr = console.error;
const printWarn = console.warn;
const clClear = console.clear;
const printInfo = console.info;
const system = {
    fs: require("fs"),
    os: require("os"),
    process: require("child_process")
};
const createArray = (length, defaultValue) => {
    return new Array.prototype.constructor(length).fill(defaultValue, 0, length);
}
`;

const sufix = `
(function() {
    // check the structure
    if (typeof(main) == "function") main();
    else {
        console.log("'main()' cannot be found");
        return -1;
    }
})();
`;

function execute(program) {
    fs.writeFile(`${filePath}.js`, program, (err) => {
        if (err) throw err;
    });
    console.log(eval(program));
}

run();
function run() {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        data = new String(data)+"";
        data = data.replace(/set /g, "let ")
        .replace(/define /g, "const ")
        .replace(/func /g, "function ");

        let program = `${prefix}\n\n\n${data}\n\n\n${sufix}`;
        execute(program);
    });
}