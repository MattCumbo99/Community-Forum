module.exports = mongoose => {
    var schema = mongoose.Schema(
        // Subject to change!
        {
            postId:Number,
            title:String,
            author:String,
            content:String,
            isArchived:Boolean,
            comments:Array
        },
        { timestamps:true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const ForumPost = mongoose.model("posts", schema);
    return ForumPost;
}