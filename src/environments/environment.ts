// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // api请求URL，参考https://github.com/LIU9293/musicAPI
  MUSIC_URL: 'http://localhost:3000',
  USER_URL: 'http://localhost:3000',

  // Toast消失的时间，单位毫秒
  TOAST_DELAY: 3000

};
