module.exports = mongoose => {
    var schema = mongoose.Schema(
        // Subject to change!
        {
            reportId:Number,
            sender:String,
            user:String,
            reason:String,
            details:String,
            status:Number
        },
        { timestamps:true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Ban = mongoose.model("Reports", schema);
    return Ban;
};