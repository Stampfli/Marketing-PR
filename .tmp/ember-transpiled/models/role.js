define("ghost/models/role", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Role = DS.Model.extend({
        uuid: DS.attr('string'),
        name: DS.attr('string'),
        description: DS.attr('string'),
        created_at: DS.attr('moment-date'),
        updated_at: DS.attr('moment-date'),

        lowerCaseName: Ember.computed('name', function () {
            return this.get('name').toLocaleLowerCase();
        })
    });

    __exports__["default"] = Role;
  });