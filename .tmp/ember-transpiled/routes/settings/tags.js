define("ghost/routes/settings/tags", 
  ["ghost/routes/authenticated","ghost/mixins/current-user-settings","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var CurrentUserSettings = __dependency2__["default"];

    var TagsRoute = AuthenticatedRoute.extend(CurrentUserSettings, {

        beforeModel: function () {
            if (!this.get('config.tagsUI')) {
                return this.transitionTo('settings.general');
            }

            return this.currentUser()
                .then(this.transitionAuthor());
        },

        model: function () {
            return this.store.find('tag');
        }
    });

    __exports__["default"] = TagsRoute;
  });