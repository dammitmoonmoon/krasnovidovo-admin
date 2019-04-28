const glob = require('glob');
const fs = require('fs-extra');

glob(
    "**/apolloTypes",
    // @ts-ignore
    null,
    (_er, folders) => folders.forEach(folder => {
        fs.remove(folder, err => {
            console.error(err)
        })
    })
);
