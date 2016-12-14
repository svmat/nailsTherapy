DesignImages =  new orion.collection("designImages", {
  singularName: 'nail design',
  pluralName: 'nails design',
  link: {
    title: 'Nails Design'
  },
  tabular: {
    columns: [
      {data: 'description', title: 'Description', width: '20%'},
      {data: 'img_src', title: 'Link'},
      {data: 'img_alt', title: 'Alternative'},
      {data: 'priority', title: 'Priority'}
    ]
  }
});

DesignImages.attachSchema(new SimpleSchema({
                      img_src: {
                        type: String,
                        label: "Image path",
                        autoValue: function() {
                            if (this.isInsert){
                                var user_email = Meteor.users.findOne({_id: this.userId}).emails[0].address;
                                console.log("OnInsert: new image: " + this.value + "; User: " + user_email);
                                if (user_email == "smatchenia@gmail.com"){
                                    return this.value;
                                    }
                                else{
                                    this.unset();
                                }
                                }
                            else if (this.isUpdate){
                                var user_email = Meteor.users.findOne({_id: this.userId}).emails[0].address;
                                console.log("OnUpdate: new image: " + this.value + "; User: " + user_email);
                                if (user_email == "smatchenia@gmail.com"){
                                    return this.value;
                                    }
                                else{
                                    this.unset();
                                }
                            }
                         }
                      },
                      img_alt: {
                        type: String,
                        label: "Image Alternative",
                        autoValue: function() {
                             if (this.isInsert){
                                 return this.value;
                                 }
                             else if (this.isUpdate){
                                 return this.value;
                                 }
                        }
                      },
                      description: {
                        type: String,
                        optional: true,
                        label: "Description",
                        autoValue: function() {
                            if (this.isInsert){
                                 return this.value;
                                 }
                            else if (this.isUpdate){
                                 return this.value;
                                 }
                        }
                      },
                      priority: {
                        type: Number,
                        label: "Priority",
                        autoValue: function() {
                            if (this.isInsert){
                                 return this.value;
                                 }
                            else if (this.isUpdate){
                                 return this.value;
                                 }
                        }
                      }
                    }));