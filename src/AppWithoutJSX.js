
import PropTypes from "prop-types"
import React from "react";

class Post extends React.Component {
    render() {
        return React.createElement(
            "div",
            {
                className: "post",
            },
            React.createElement(
                "h2",
                {
                    className: "postAuthor",
                    id: this.props.id,
                },
                this.props.user,
                React.createElement(
                    "span",
                    {
                        className: "postBody",
                    },
                    this.props.content
                ),
                this.props.children
            )
        );
    }
}
Post.propTypes = {
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}
class Comment extends React.Component {
    render() {
        return React.createElement('div',
            {
                className: "postBody"
            },
            React.createElement(
                'h2',
                {
                    className: 'comment'
                },
                this.props.user,
                React.createElement(
                    'span',
                    {
                        className: 'commentContent'
                    },
                    this.props.content
                )
            ))
    }
}
Comment.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            user: ''
        }

        this.handleUserChange = this.handleUserChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUserChange(event) {
        const val = event.target.value;
        this.setState(() => ({
            user: val
        }))
    }

    handleTextChange(event) {
        const val = event.target.value;
        this.setState(() => ({
            content: val
        }), () => console.log(event.target.value))
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onCommentSubmit({
            user: this.state.user.trim(),
            content: this.state.content.trim()
        })
        this.setState(() => ({
            user: '',
            content: ''
        }))
    }

    render() {
        return React.createElement(
            'form',
            {
                className: 'createComment',
                onSubmit: this.handleSubmit
            },
            React.createElement('input', {
                type: 'text',
                placeholder: 'Your name',
                value: this.state.user,
                onChange: this.handleUserChange
            }),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Thoughts?',
                value: this.state.content,
                onChange: this.handleTextChange
            }),
            React.createElement('input', {
                type: 'submit',
                value: 'Post'
            })
        )
    }
}
CreateComment.propTypes = {
    content: PropTypes.string.isRequired,
    onCommentSubmit: PropTypes.func.isRequired
}

class CommentBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.comments
        }
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    }

    handleCommentSubmit(comment) {
        const comments = this.state.comments;
        comment.id = Date.now();
        // const newComments = comments.concat([comment])
        const newComments = comments.concat([comment]);
        this.setState({
            comments: newComments
        })
    }

    render() {
        return React.createElement(
            'div',
            {
                className: 'commentBox'
            },
            React.createElement(Post, {
                id: this.props.post.id,
                content: this.props.post.content,
                user: this.props.post.user
            }),
            React.createElement('div', {
                className: 'commentsSection'
            },
                this.state.comments.map(comment =>
                    React.createElement(Comment, {
                        key: comment.id,
                        id: comment.id,
                        user: comment.user,
                        content: comment.content
                    }))
            ),
            React.createElement(CreateComment, {
                onCommentSubmit: this.handleCommentSubmit
            })
        )
    }
}
CommentBox.propTypes = {
    post: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object)
}

class App extends React.Component {
    render() {
        return React.createElement('section', {
            className: 'app',
            data: this.props.data
        },
            React.createElement(CommentBox, {
                ...this.props.data
            })
        )
    }
}


export default App
