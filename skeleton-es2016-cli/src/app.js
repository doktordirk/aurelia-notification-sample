import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class App {
  constructor(i18n){
    this.i18n = i18n;
  }

  configureRouter(config, router) {
    let tt = this.i18n.tr('Welcome');
console.log('translate:', tt)
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], title: this.i18n.tr('Welcome'), name: 'welcome',      moduleId: 'welcome',      nav: true},
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
