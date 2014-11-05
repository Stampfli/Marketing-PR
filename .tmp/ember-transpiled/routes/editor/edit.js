define("ghost/routes/editor/edit", 
  ["ghost/routes/authenticated","ghost/mixins/editor-base-route","ghost/utils/isNumber","ghost/utils/isFinite","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var base = __dependency2__["default"];
    var isNumber = __dependency3__["default"];
    var isFinite = __dependency4__["default"];

    var EditorEditRoute = AuthenticatedRoute.extend(base, {
        model: function (params) {
            var self = this,
                post,
                postId,
                paginationSettings;

            postId = Number(params.post_id);

            if (!isNumber(postId) || !isFinite(postId) || postId % 1 !== 0 || postId <= 0) {
                return this.transitionTo('error404', 'editor/' + params.post_id);
            }

            post = this.store.getById('post', postId);

            if (post) {
                return post;
            }

            paginationSettings = {
                id: postId,
                status: 'all',
                staticPages: 'all'
            };

            return this.store.find('user', 'me').then(function (user) {
                if (user.get('isAuthor')) {
                    paginationSettings.author = user.get('slug');
                }

                return self.store.find('post', paginationSettings).then(function (records) {
                    var post = records.get('firstObject');

                    if (user.get('isAuthor') && post.isAuthoredByUser(user)) {
                        // do not show the post if they are an author but not this posts author
                        post = null;
                    }

                    if (post) {
                        return post;
                    }

                    return self.transitionTo('posts.index');
                });
            });
        }
    });

    __exports__["default"] = EditorEditRoute;
  });