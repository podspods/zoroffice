/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Search for documents in the current collection.
db.getCollection('notifications')
  .find(
    {
      accountId: '654b98590e9e5000c7a3ec52',
      // '$str': { '$regex': '^.*upgrade', '$options': 'i' }
  });




  db.getCollection.find({}).forEach(function(doc) {
    var pattern = /pattern_to_replace/g; // Replace 'pattern_to_replace' with your actual pattern
    var replacement = "new_value"; // Replace 'new_value' with the new value

    var newDescription = doc.description.replace(pattern, replacement);
    
    db.collectionName.update(
        { _id: doc._id },
        { $set: { description: newDescription } }
    );
});

db.getCollection('notifications').find({accountId: '654b98590e9e5000c7a3ec52'  });

db.getCollection('notifications').find({level: "error"   });
db.notifications.find({ accountId: '654b98590e9e5000c7a3ec52'   })
db.notifications.find({ accountId: { $regex: "7a3ec5" } })


db.notifications.find({ "str.display3": { $regex:"Translation" }  })
db.notifications.find({ "str.display2": { $regex:"Translation" }  })
db.notifications.find({ "str.display": { $regex:"Translation" }  })
db.notifications.find({ "str.display": { $regex:/Translation/ }  })


db.notifications.find({ "str.display": { $regex:/type/ }  })
db.notifications.find({ "str.display": { $regex:/{type}/ }  })
db.notifications.find({ "str.display": { $regex:/\${type}/ }  })
db.notifications.find({ "str.display": { $regex:/[$]{([^\s>]+)}/ }  })

// %-%-%-%-%-%-%-%-%-%-%- ok Above %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-



db.notifications.find({}).forEach(function(doc) {
  var pattern = /[$]{([^\s>]+)}/g; // Replace 'pattern_to_replace' with your actual pattern
  var replacement = `str.data[${pattern}].value`; // Replace 'new_value' with the new value

  var newDescription = doc.display.replace(pattern, replacement);
  
  db.collectionName.update(
      { _id: doc._id },
      { $set: { description: newDescription } }
  );
});

