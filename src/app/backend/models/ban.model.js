module.exports = mongoose => {
    var schema = mongoose.Schema(
        // Subject to change!
        {
            username:String,
            reason:String,
            lengthText:String,
            author:String,
            expiryDate:Date,
            unbanned:Boolean,
            unbanReason:String,
            unbanAuthor:String
        },
        { timestamps:true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Ban = mongoose.model("Bans", schema);
    return Ban;
};