define("ghost/controllers/modals/auth-failed-unsaved", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var AuthFailedUnsavedController = Ember.Controller.extend({
        editorController: Ember.computed.alias('model'),

        actions: {
            confirmAccept: function () {
                var editorController = this.get('editorController');

                if (editorController) {
                    editorController.get('model').rollback();
                }

                window.onbeforeunload = null;

                window.location = this.get('ghostPaths').adminRoot + '/signin/';
            },

            confirmReject: function () {
            }
        },

        confirm: {
            accept: {
                text: 'Leave',
                buttonClass: 'btn btn-red'
            },
            reject: {
                text: 'Stay',
                buttonClass: 'btn btn-default btn-minor'
            }
        }
    });

    __exports__["default"] = AuthFailedUnsavedController;
  });