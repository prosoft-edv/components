const {exec} = require('child_process');
const name = process.argv[2];
exec(`ng g module pages/${name} --project documentation && ng g component pages/${name}/pages/api/${name}-api --skip-tests true --flat true --type page --project documentation && ng g component pages/${name}/pages/code-generation/${name}-code-generation --skip-tests true --flat true --type page --project documentation && ng g component pages/${name}/pages/overview/${name}-overview --skip-tests true --flat true --type page --project documentation`);
