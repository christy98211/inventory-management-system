const mongoose =  require('mongoose');
const { Schema } = mongoose;

const Role = new Schema({
    code: { 
        type: String 
    },
    name: { 
        type: String 
    },
    description: { 
        type: String 
    },
    is_active: { 
        type: Boolean 
    },
    assign_role: { 
        type: Array 
    },
    created_by: { 
        type: Schema.Types.ObjectId,
        ref: 'users',
    }, 
    updated_by: { 
        type: Schema.Types.ObjectId,
        ref: 'users',    
    },
    created_at: { 
        type: Date 
    }, 
    updated_at: { 
        type: Date 
    },
}, { toJSON: { 
    virtuals: true } });

Role.pre('save', function (next) {
    var currentDate = new Date();
    if (this.isNew) {
    // this.status = false;
    console.log("IS NEW CALLED!!")
    this.created_at = currentDate;
    this.updated_at = currentDate;
     
    } else {
    console.log("IS NEW IS FALSE!!")
    this.updated_at = currentDate;
    }
    next();
});
    

const role = mongoose.model('roles', Role, 'roles');
module.exports =  role