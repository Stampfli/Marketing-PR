define("ghost/routes/debug", 
  ["ghost/routes/authenticated","ghost/mixins/style-body","ghost/mixins/loading-indicator","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var styleBody = __dependency2__["default"];
    var loadingIndicator = __dependency3__["default"];

    var DebugRoute = AuthenticatedRoute.extend(styleBody, loadingIndicator, {
        classNames: ['settings'],

        beforeModel: function (transition) {
            this._super(transition);

            var self = this;
            this.store.find('user', 'me').then(function (user) {
                if (user.get('isAuthor') || user.get('isEditor')) {
                    self.transitionTo('posts');
                }
            });
        },

        model: function () {
            return this.store.find('setting', {type: 'blog,theme'}).then(function (records) {
                return records.get('firstObject');
            });
        }

    });

    __exports__["default"] = DebugRoute;
  });