define("ghost/routes/posts/post", 
  ["ghost/routes/authenticated","ghost/mixins/loading-indicator","ghost/mixins/shortcuts-route","ghost/utils/isNumber","ghost/utils/isFinite","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var loadingIndicator = __dependency2__["default"];
    var ShortcutsRoute = __dependency3__["default"];
    var isNumber = __dependency4__["default"];
    var isFinite = __dependency5__["default"];

    var PostsPostRoute = AuthenticatedRoute.extend(loadingIndicator, ShortcutsRoute, {
        model: function (params) {
            var self = this,
                post,
                postId,
                paginationSettings;

            postId = Number(params.post_id);

            if (!isNumber(postId) || !isFinite(postId) || postId % 1 !== 0 || postId <= 0) {
                return this.transitionTo('error404', params.post_id);
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

                    if (user.get('isAuthor') && !post.isAuthoredByUser(user)) {
                        // do not show the post if they are an author but not this posts author
                        post = null;
                    }

                    if (post) {
                        return post;
                    }

                    return self.transitionTo('posts.index');
                });
            });
        },

        setupController: function (controller, model) {
            this._super(controller, model);

            this.controllerFor('posts').set('currentPost', model);
        },

        shortcuts: {
            'enter, o': 'openEditor',
            'command+backspace, ctrl+backspace': 'deletePost'
        },

        actions: {
            openEditor: function () {
                this.transitionTo('editor.edit', this.get('controller.model'));
            },

            deletePost: function () {
                this.send('openModal', 'delete-post', this.get('controller.model'));
            }
        }
    });

    __exports__["default"] = PostsPostRoute;
  });