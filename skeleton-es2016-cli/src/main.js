import environment from './environment';
import XHR from 'i18next-xhr-backend'; // <-- your previously installed backend plugin
import 'bootstrap';


//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
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
    })    
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
