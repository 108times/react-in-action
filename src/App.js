import React from "react";
import PropTypes from 'prop-types'

class App extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className="app">
                <CommentBox {...this.props.data} />
            </div>
        );
    }
}

class Post extends React.Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    };
    render() {
        return (
            <div className="post">
                <h2 className="post-author" id={this.props.id}>
                    {this.props.name}
                </h2>
                <p className="post-body">{this.props.content}</p>
                {this.props.children}
            </div>
        );
    }
}

class Comment extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div className="comment">
                <h2 className="comment-user">{this.props.user}</h2>
                <p className="comment-content">{this.props.content}</p>
            </div>
        );
    }
}

class CreateComment extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        onCommentSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            user: "",
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        const val = event.target.value;
        this.setState(() => ({
            user: val,
        }));
    }

    handleTextChange(event) {
        const val = event.target.value;
        this.setState(
            () => ({
                content: val,
            }),
            () => console.log(event.target.value)
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onCommentSubmit({
            user: this.state.user.trim(),
            content: this.state.content.trim(),
        });
        this.setState(() => ({
            user: "",
            content: "",
        }));
    }

    render() {
        return (
            <form className="create-comment" onSubmit={this.handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={this.state.user}
                    onChange={this.handleUserChange}
                />
                <input
                    name="text"
                    type="text"
                    placeholder="Thoughts?"
                    value={this.state.content}
                    onChange={this.handleTextChange}
                />
                <input className="btn primary" type="submit" value="Post" />
            </form>
        );
    }
}

// class CommentsSection extends React.Component {
//     static propTypes = {
//         comments: PropTypes.arrayOf(PropTypes.object)
//     }
//     render() {
//         return <div className="comments-section">
//             {this.props.comments.map((comment) => (
//                 <Comment key={comment.id} {...comment} />
//             ))}
//         </div>
//     }
// }

function CommentsSection(comments) {
    return (
        <div className="comments-section">
            {Array.prototype.map.call(comments, (comment) => (
                <Comment key={comment.id} {...comment} />
            ))}
        </div>
    )
}

class CommentBox extends React.Component {
    static propTypes = {
        post: PropTypes.object,
        comments: PropTypes.arrayOf(PropTypes.object),
    };

    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(comment) {
        const comments = this.state.comments;
        comment.id = Date.now();
        const newComments = [...comments, comment];
        this.setState({
            comments: newComments,
        });
    }

    render() {
        return (
            <div className="comment-box">
                <Post {...this.props.post} />
                <CommentsSection comments={this.state.comments} />
                <CreateComment onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

export default App
