//define a method that the client can call
Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        //check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
  },

    resetActiveSections: function() {
        Sections.update({active: true}, {$set: {active: false}}, {multi: true});
    },

   // function to show random images in carousel
    randomImage: function(owlSelector) {
        owlSelector.children().sort(function(){
                return Math.round(Math.random()) - 0.5;
                }).each(function(){
                    $(this).appendTo(owlSelector);
                });
    }

});