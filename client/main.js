//subscription
nail_design = Meteor.subscribe("designImages");

Modal.allowMultiple = true  // To enable insertions of multiple modals

Template.carousel.helpers({
    images: function(){
        $('.owl-carousel').css("display", "block");
        return DesignImages.find();
        }
});

Template.contact.helpers({
    clicked: function(){
        return Session.get("sendEmail");
    }
});

Template.headerLink.helpers({
    svgLink : function(id){
        return "../svg/" + id + ".svg";
    }
});

Template.imageModal.helpers({
    image: function(){
        if (Session.get("clicked_image")){
            return DesignImages.findOne({_id: Session.get("clicked_image")});
        }
    }
});

Template.header.events({
    'click .scroll-link': function(e){
        e.preventDefault();
        var path = e.currentTarget.attributes['href'].value;
        var section = $("#" + path);
        window.history.pushState(path, "", "/" + path);

        $('html, body').animate({
            scrollTop: section.offset().top
            }, 1000);
        if (Session.get("previous_active")){
            var prev_active_s = Sections.findOne({"id": Session.get("previous_active")});
            Sections.update(prev_active_s._id, {$set: {active: false}});
            };
        var section_update = Sections.findOne({id: path});
        if (!section_update.active){
            Sections.update({_id:section_update._id}, {$set: {active: true}});
            };
        Session.set("previous_active", path);
  },

  'click .navbar-brand': function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  }
});


Template.carousel.onRendered(function() {
    var _this = this;
      this.autorun(function(c) {
        if (nail_design.ready()) {
          owl = _this.$(".owl-carousel");
          owl.owlCarousel({
              autoplay: true, //Set AutoPlay to 3 seconds
              autoplayTimeout: 4000,
              autoplayHoverPause: true,
              dots: true,
              autoplaySpeed: 2000,
              loop: true,
              dotsEach: 8,
              navText: [
                    "<i class='icon-chevron-left icon-white'>&lt;</i>",
                    "<i class='icon-chevron-right icon-white'>&gt;</i>"
                    ],
              responsiveClass:true, 
              responsive:{ 
                  0:{
                      items:1,
                      nav:false
                      }, 
                  600:{ 
                      items:2,
                      nav:true 
                      },
                  1000:{
                      items:4,
                      nav:true
                      } 
                  }

          });
          $('.owl-carousel').on('click', '.item', function () {

            if(this.id) {
              Session.set("clicked_image", this.id);
              console.log("Image clicked:" + this.id);
              Modal.show("imageModal");
            }
            else
              console.log("Empty id");
          });
          c.stop();
        }
      });
});

Template.image.events({
    "mouseover img": function(event){
        console.log("Mouse over");
        event.preventDefault();
        var image = DesignImages.findOne({_id: event.currentTarget.id});
        event.currentPath.tooltip({ 'placement': 'left' , 'title' : image.description});
    }
});

Template.contact.events({
    "click .js-open-model": function(event){
        event.preventDefault();
        Modal.show('contact_form');
        Session.set("sendEmail", true);
    }
});

Template.contact_form.events({
    "click .js-send":function(event){
        event.preventDefault();
        console.log(event);
        var name = event.currentTarget.form[1].value;
        var contact = event.currentTarget.form[2].value;
        var text = event.currentTarget.form[3].value;
        Modal.hide("contact_form");
        // for Firefox
        $('.modal').css('display', 'none');
        Meteor.call('sendEmail',
                    'smatchenia@gmail.com',
                    'postmaster@sandboxf30ffc0b236a46f2bce99e4a6a33b24b.mailgun.org',
                    'Nail Appointment request',
                    name + ". " + text + ". Contact information: " + contact);
    }
});

Template.imageModal.onRendered(function(){
    $('.modal .modal-body').css('overflow-y', 'auto');
    var height = $(window).height();
    console.log("WINDOW HEIGHT: " + height);
    $('.modal img').css('max-height', height * 0.85);
    $('.modal .modal-content').css('height', height * 0.9);
    $('.modal .modal-content').css('width', height * 0.85 * 0.8);
    // for Firefox
    $('.modal').css('display', 'block');
    $(".modal").removeClass('in');

});

Template.mainPage.onRendered(function(){
    scrollToPath();
    updateOnScroll();
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
    $('.layout-page').css('background-image', "url(" + Sections.findOne({id: 'home'}).backgroundImage.url + ")");
});

function updateOnScroll(){
  $(window).on('scroll', function(){
    if(Session.get('scrolling')) return;

    var sections = $('.section');
    var scrollPosition = window.pageYOffset;
    var pastSections = sections.filter(function(index, element){
      return $(element).offset().top <= scrollPosition;
    });
    if(pastSections.length > 0){
      var lastSection = pastSections[pastSections.length - 1];
      var newPath = lastSection.attributes['id'].value;
      var currentPath = location.pathname.slice(1);
      if(currentPath !== newPath){
        window.history.replaceState(newPath, "", "/" + newPath);
        Meteor.call("resetActiveSections");
        var section_update = Sections.findOne({id: newPath});
        Sections.update({_id:section_update._id}, {$set: {active: true}});
      }
    } else if(location.pathname.slice(1)){
      window.history.replaceState(newPath, "", "/");
    }

  });
  }

function scrollToPath(){
  var path = Iron.Location.get().path.slice(1);
  if(path){
    var element = $("#" + path);
    if(element.length > 0){
      $(document).scrollTop(element.offset().top);
    }
  }
}
