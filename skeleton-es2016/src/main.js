import 'bootstrap';

import XHR from 'i18next-xhr-backend'; // <-- your previously installed backend plugin

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-notification', config => {
        config.configure({
          translate: true,  // 'true' needs aurelia-i18n to be configured
          notifications: {
            'success': '',
            'some': 'my-error'
          }
        });
    })
      .plugin('aurelia-i18n', (instance) => {
      // register backend plugin
      instance.i18next.use(XHR);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: '/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        lng : 'de',
        attributes : ['t','i18n'],
        fallbackLng : 'en',
        debug : false
      });
    });

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
