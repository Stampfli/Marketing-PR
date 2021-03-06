define("ghost/views/post-item-view", 
  ["ghost/views/item-view","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var itemView = __dependency1__["default"];

    var PostItemView = itemView.extend({
        classNameBindings: ['isFeatured:featured', 'isPage:page'],

        isFeatured: Ember.computed.alias('controller.model.featured'),

        isPage: Ember.computed.alias('controller.model.page'),

        doubleClick: function () {
            this.get('controller').send('openEditor');
        },

        click: function () {
            this.get('controller').send('showPostContent');
        }

    });

    __exports__["default"] = PostItemView;
  });