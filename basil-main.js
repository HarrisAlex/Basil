const container = document.getElementById("posts-container-wrapper");
const root = ReactDOM.createRoot(container);

function WriteToJSON(file) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "fileWrite.php?json='[" + file + "]';", true);
    console.log("fileWrite.php?json=" + file);
    xhttp.onload = function () {
        console.log(this.responseURL);
    };

    xhttp.send();
}

function CreatePostsFile(postsArray) {
    var jsonOutput = "";

    for (var i = 0; i < postsArray.length; i++) {
        jsonOutput += JSON.stringify({
            title: postsArray[i].props.title, 
            text: postsArray[i].props.text,
            user: postsArray[i].props.user,
            likes: 1
        });
    }

    return jsonOutput;
}

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            likeState: props.initialLikes
        };

        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
    }

    raiseLikeState () {
        this.setState({likeState: this.state.likeState + 1});
    }

    lowerLikeState () {
        this.setState({likeState: this.state.likeState - 1});
    }

    setLikeState (value) {
        this.setState({likeState: value});
    }

    handleLike() {
        this.raiseLikeState();

        if (this.state.likeState > 0) {
            this.setLikeState(0);
        }

        WriteToJSON(CreatePostsFile(posts));

        root.render(
            <div className="posts-container">
                {posts}
            </div>
        );
    }

    handleDislike() {
        this.lowerLikeState();

        if (this.state.likeState < 0) {
            this.setLikeState(0);
        }

        WriteToJSON(CreatePostsFile(posts));

        root.render(
            <div className="posts-container">
                {posts}
            </div>
        );
    }

    handleReport() {

    }
    
    render() {
        return (
            <div className="post" id={this.props.id}>
                <div className="post-header">
                    <h2 className="post-title">{this.props.title}</h2>
                    <h4 className="post-user">{this.props.user}</h4>
                </div>
                <p className="post-text">{this.props.text}</p>
                <div className="post-footer">
                    <button onClick={this.handleLike} className={this.state.likeState > 0 ? "liked" : "notLiked"}>Like</button>
                    <button onClick={this.handleDislike} className={this.state.likeState < 0 ? "disliked" : "notDisliked"}>Dislike</button>
                    <button onClick={this.handleReport}>Report</button>
                </div>
            </div>
        );
    }
}

var postsJson = JSON.parse(posts);

var posts = [];

for (var i = 0; i < postsJson.length; i++) {
    var post = postsJson[i];
    posts.push(<Post key={i} id={post.user + '-' + post.title} user={post.user} title={post.title} text={post.text} initialLikes={post.likes}/>);
}

root.render(
    <div className="posts-container">
        {posts}
    </div>
);