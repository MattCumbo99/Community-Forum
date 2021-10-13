module.exports = mongoose => {
    var schema = mongoose.Schema(
        // Subject to change!
        {
            username:String,
            password:String,
            privilege:Number,
            pfpUrl:String,
            email:String,
            dateCreated:Date,
            birthday:Date,
            signature:String,
            location:String,
            messages:Array,
            profileComments:Array,
            posts:Array,
            comments:Array
        },
        { timestamps:false }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("Users", schema);
    return User;
};