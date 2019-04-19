import fse from 'fs-extra';
import glob from 'glob';

glob(
    "**/apolloTypes",
    // @ts-ignore
    null,
    (er: any, folders: { forEach: (arg0: (folder: string) => void) => void; }) => folders.forEach(folder => {
        fse.remove(folder, err => {
            console.error(err)
        })
    })
);