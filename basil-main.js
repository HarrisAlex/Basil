const container = document.getElementById("posts-container-wrapper");
const root = ReactDOM.createRoot(container);

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLike() {
        
    }

    handleDislike() {

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
                    <button onClick={this.handleLike}>Like</button>
                    <button onClick={this.handleDislike}>Dislike</button>
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
    posts.push(<Post key={i} id={post.user + '-' + post.title} user={post.user} title={post.title} text={post.text} />);
}

root.render(
    <div className="posts-container">
        {posts}
    </div>
);