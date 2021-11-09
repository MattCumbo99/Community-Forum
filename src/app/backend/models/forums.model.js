module.exports = mongoose => {
    var schema = mongoose.Schema(
        // Subject to change!
        {
            name:String,
            description:String,
            subCategories:Array
        },
        { timestamps:false }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Ban = mongoose.model("Forums", schema);
    return Ban;
};